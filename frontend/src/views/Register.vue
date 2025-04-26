<script setup>
	import { ref, reactive, watch, computed } from 'vue';

	import VInput from '../components/VInput.vue';
	import { formSections, typeOfPersons } from './formSections.js';

	const API_URL = import.meta.env.VITE_API_URL;
	const numberOfSteps = 4;
	const penultimateStep = numberOfSteps - 1;
	const form = ref(null);
	const isFormLoading = ref(false);

	const state = reactive({
		questionPosition: 0,
		feedback: {
		  success: false,
		  message: '',
		  error: null
		}
	});

	const formData = reactive({
		'type-person': 'cpf',
	});

	const nextButtonDirection = computed(() =>
	  state.questionPosition < penultimateStep ? 'next' : 'register'
	);
	const textButtonDirection = computed(() =>
	  state.questionPosition < penultimateStep ? 'Continuar' : 'Cadastrar'
	);

	const handleClickNav = (direction) => {
		if (direction === 'prev') {
	    state.questionPosition--;
	    return;
	  }

		const isFormValid = form.value[0]?.checkValidity();
	  if (!isFormValid) {
	    form.value[0]?.reportValidity();
	    return;
	  }

		switch (direction) {
	    case 'next':
	      state.questionPosition++;
	      break;
	    case 'register':
	      submitForm();
	      break;
	  }
	  return;
	};

	const submitForm = async () => {
		const formElements = form.value[0].elements;
	  const dataToSend = {};
	  isFormLoading.value = true;
		state.feedback = { success: false, message: '', error: null };

	  Array.from(formElements).forEach((element) => {
	    if (element.name) {
	      dataToSend[element.name] = element.value;
	    }
	  });

	  try {
	  	const response = await fetch(`${API_URL}/registration`, {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			  body: JSON.stringify(dataToSend),
			});

			const result = await response.json();

			if (!response.ok) {
	      if (response.status === 400 && result.errors) {
	      	const errorMessage = result.errors.join(', ');
	      	const validationError = new Error(errorMessage);

	      	validationError.response = response;
	        validationError.result = result;
	        throw validationError;
	      } else {
	      	throw new Error(result.message || 'Erro no servidor');
	      }
	    }

	    state.feedback = {
	      success: true,
	      message: result.message || 'Cadastro realizado com sucesso!',
	      error: null
	    };

	  } catch (error) {
	    state.feedback = {
	      success: false,
	      message: error.message,
	      errors: error.result?.errors
	    };

	  } finally {
	    isFormLoading.value = false;
	  }
	};

	watch(() => formData['type-person'], (newPersonType) => {
		const targetPerson = typeOfPersons.find(person => 
		  person.fields.some(field => field.id === newPersonType)
		);

		// Improve this later
		formSections[1] = targetPerson;
		formSections[3].fields[1] = targetPerson.fields[0];
		formSections[3].fields[2] = targetPerson.fields[1];
		formSections[3].fields[3] = targetPerson.fields[2];
	});

</script>	

<template>
	<div class="container">

		<template v-for="(section, index) in formSections" :key="index">
			<section v-if="index === state.questionPosition" class="register-section">
		      <header>
		        <span>Etapa <span class="text-primary">{{ state.questionPosition + 1 }}</span> de {{ numberOfSteps }}</span>
		        <h1>{{ section.title }}</h1>
		      </header>
		      <form ref="form" @submit.prevent>
		      	<div class="form-section">

		      	<template v-for="field in section.fields" :key="field.id">
			      	<div v-if="field.type === 'radio-group'" class="input-box input-box-inline">
		            <div v-for="option in field.options" :key="option.id" class="input-radio">
		              <input
		                type="radio"
		                :name="field.name"
		                :id="option.id"
		                :value="option.value"
		                v-model="formData[field.name]"
		              >
		              <label :for="option.id">{{ option.label }}</label>
		            </div>
		          </div>
			        <VInput
		            v-else
		            :type="field.type"
		            :name="field.name"
		            :id="field.id"
		            :label="field.label"
		            :required="field.required"
		            :pattern="field.pattern"
		            :placeholder="field.placeholder"
		            :min="field.min"
		            :max="field.max"
		            v-model="formData[field.name]"
		          />
			      </template>
		      </div>

			    <div class="form-actions">
	          <button type="button" class="button button-primary-outline" @click="handleClickNav('prev')" v-show="state.questionPosition >= 1">Voltar</button>
	          <button type="button" class="button button-primary" @click="handleClickNav(nextButtonDirection)" :disabled="isFormLoading">{{ textButtonDirection }}</button>
	        </div>

	        <div>
	        	<p v-show="isFormLoading">Carregando...</p>

	        	<div v-if="state.feedback.success">
				      {{ state.feedback.message }}
				    </div>

				    <!-- Feedback de erro -->
				    <div v-if="!state.feedback.success && state.feedback.errors">
						  <ul class="feedback-errors">
						    <li v-for="error in state.feedback.errors" :key="error">{{ error }}</li>
						  </ul>
						</div>
	        </div>
		      </form>
		  </section>
		</template>
	</div>
</template>

<style scoped>
	.register-section {
		margin: 0 auto;
		max-width: 25rem;
		padding: 2.5rem 0;
		width: 100%;
	}
	.register-section header {
		margin-bottom: 0.75rem;
	}
	.register-section header h1 {
		padding: 0.5rem 0;
	}
	.register-section header > span {
		font-size: 0.9375rem;
	}
	.feedback-errors {
		list-style-position: inside;
    font-size: 0.9375rem;
    color: red;
	}
	.feedback-errors li {
		padding: 0.25rem;
	}
</style>


