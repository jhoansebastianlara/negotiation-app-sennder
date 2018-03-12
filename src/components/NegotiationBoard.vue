<template>
  <div class="negotiation-board-container">
    <div class="tabs-container">
      <div class="tabs">
        <div class="tab"
            :class="{ 'tab-active': employerTabIsActive }"
            @click="toogleTab(ROLES.EMPLOYER.KEY)">
          <span class="title">
            {{ i18n[ROLES.EMPLOYER.KEY].tabName }}
          </span>
        </div>

        <div class="tab"
            :class="{ 'tab-active': employeeTabIsActive }"
            @click="toogleTab(ROLES.EMPLOYEE.KEY)">
          <span class="title">
            {{ i18n[ROLES.EMPLOYEE.KEY].tabName }}
          </span>
        </div>
      </div>

      <div class="tab-content">
        <negotiation-tab v-show="enabledTab === ROLES.EMPLOYER.KEY"
          :role="ROLES.EMPLOYER"
          :salary-value="employerSalaryMax"
          @onTabFormSubmitted="onTabFormSubmitted">
        </negotiation-tab>
        <negotiation-tab v-show="enabledTab === ROLES.EMPLOYEE.KEY"
          :role="ROLES.EMPLOYEE"
          :salary-value="employeeSalaryMin"
          @onTabFormSubmitted="onTabFormSubmitted">
        </negotiation-tab>
      </div>
    </div>

    <negotiation-result-modal v-if="showNegotiationResultModal"
        @close="onNegotiationResulModalClose">
      <h1 slot="header" :class="{success: negotiationResult, failure: !negotiationResult}">
        {{ negotiationResult ? i18n.general.success : i18n.general.failure }}
      </h1>

      <div slot="body" class="salaries-result-container">
        <p>
          {{ i18n.general.maximumOfferWas }}: {{ this.employerSalaryMax }}
        </p>
        <p>
          {{ i18n.general.minimumSalaryExpectedWas }}: {{ this.employeeSalaryMin }}
        </p>
      </div>
    </negotiation-result-modal>
  </div>
</template>

<script>
import NegotiationTab from './NegotiationTab'
import NegotiationResultModal from './NegotiationResultModal'
import { CONSTANTS, i18n } from '../shared/constants'

export default {
  data () {
    return {
      i18n,
      ROLES: CONSTANTS.ROLES,
      enabledTab: CONSTANTS.ROLES.EMPLOYER.KEY, // EMPLOYER tab actived by default
      employerSalaryMax: null,
      employeeSalaryMin: null,
      showNegotiationResultModal: false
    }
  },

  computed: {
    employerTabIsActive () {
      return (this.enabledTab === CONSTANTS.ROLES.EMPLOYER.KEY)
    },

    employeeTabIsActive () {
      return (this.enabledTab === CONSTANTS.ROLES.EMPLOYEE.KEY)
    },

    salariesWereSubmitted () {
      return this.employerSalaryMax && this.employeeSalaryMin
    },

    negotiationResult () {
      return (this.salariesWereSubmitted && this.employeeSalaryMin <= this.employerSalaryMax)
    }
  },

  watch: {
    salariesWereSubmitted () {
      if (this.salariesWereSubmitted) this.showNegotiationResultModal = true
    }
  },

  methods: {
    toogleTab (roleKey) {
      this.enabledTab = roleKey
    },

    onTabFormSubmitted (data) {
      if (data.roleKey === CONSTANTS.ROLES.EMPLOYER.KEY) {
        this.employerSalaryMax = data.salary
      } else if (data.roleKey === CONSTANTS.ROLES.EMPLOYEE.KEY) {
        this.employeeSalaryMin = data.salary
      }
    },

    onNegotiationResulModalClose () {
      this.showNegotiationResultModal = false
    }
  },

  components: {
    NegotiationTab,
    NegotiationResultModal
  }
}
</script>

<style lang="scss">

  .negotiation-board-container {
    border: 1px solid lightgray;

    .tabs-container {

      .tabs {
        display: flex;

        .tab {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 1rem;
          border-bottom: 1px solid lightgray;
          background-color: whitesmoke;

          &:first-child {
            border-right: 1px solid lightgray;
          }

          .title {
            font-size: 1.2rem;
            color: gray;
          }
        }

        .tab-active {
          .title {
            color: black;
            font-weight: bold;
            color: tomato;
          }
        }
      }
    }
  }

  .success {
    color: #21A85E;
  }

  .failure {
    color: #f53d3d;
  }

</style>
