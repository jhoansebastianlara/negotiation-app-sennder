<template>
  <div class="negotiation-tab-container">
    <!-- the submit event will no longer reload the page -->
    <form v-on:submit.prevent="onSubmit">
      <div class="item-form">
        <label>
          {{ i18n[role.KEY].salaryLabel }}
        </label>
        <input type="tel" class="cool-input"
          v-if="!formSubmitted"
          v-model.trim="salaryValue"
          @keypress="checkIfNumber"
          :placeholder="i18n[role.KEY].salaryInputPlaceholder"
          maxlength="20">
        <span v-else class="salary-submitted">
          $ {{ salaryValue }}
        </span>
      </div>
      <div class="item-form">
        <button type="submit" name="button" class="btn-small"
            :disabled="disableSubmitButton">
          {{ i18n.general.submit }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { CONSTANTS, i18n } from '../shared/constants'
import { FormValidatorMixin } from '../mixins/FormValidatorMixin'

export default {
  props: {
    /**
     * Tab Role.
     */
    role: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      i18n,
      salaryValue: null,
      formSubmitted: false
    }
  },

  computed: {
    disableSubmitButton () {
      return (!this.salaryValue || this.salaryValue == 0 || this.formSubmitted)
    }
  },

  methods: {
    onSubmit () {
      this.formSubmitted = true
      this.$emit('onTabFormSubmitted', {
        roleKey: this.role.KEY,
        salary: this.salaryValue
      })
    }
  },

  mixins: [FormValidatorMixin]
}
</script>

<style lang="scss">

  .negotiation-tab-container {
    padding: 1rem;

    form {
      width: 100%;

      .item-form {
        padding-bottom: 1rem;
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &:last-child {
          padding-bottom: 0;
        }

        .salary-submitted {
          color: tomato;
          font-size: 1.4rem;
        }
      }
    }

  }

  .cool-input {
    border: 1px solid lightgray;
    border-radius: .25em;
    max-width: 100%;
    min-width: 15rem;
    padding: .25em .4em;
    font-size: 1rem;
    line-height: 1.4;
  }

  .cool-input:disabled {
    background: color(gray-light);
  }

  .btn-default {
    border: none;
    border-radius: .25em;
    margin: 0 .4em;
    font-weight: 600;
    max-width: 100%;
  }

  .btn-small {
    @extend .btn-default;
    padding: .4em;
    margin: 0;
    min-width: 10rem;
    font-size: 1rem;
    font-weight: normal;
    background-color: tomato;
    color: white;
  }

  .btn-small:disabled {
    background-color: lightgray;
  }

</style>
