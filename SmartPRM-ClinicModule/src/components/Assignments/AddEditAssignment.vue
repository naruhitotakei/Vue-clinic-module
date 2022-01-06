<template>
    <b-modal
        v-model="modalAssigmentShow"
        no-close-on-backdrop
        size="md"
        :ok-disabled="isOkDisabled"
        :title="!formData.id ? $t('assignments.addAssignmentsModal.addAssignments') : $t('assignments.addAssignmentsModal.editAssignments')"
        :ok-title="$t('assignments.addAssignmentsModal.save')"
        :cancel-title="$t('assignments.addAssignmentsModal.close')"
        @ok="addAssignments"
        @close="cancelAssignments"
        @cancel="cancelAssignments"
    >
    <form>
        <div class="form-row">
            <div class="col-md-12 mb-3">
                <label for="title">{{ $t('assignments.addAssignmentsModal.enquiry') }} *</label>
                <v-select
                    taggable
                    :clearable="false"
                    label="full_name"
                    :options="enquires"
                    v-model="formData.enquiry"
                >
                <template v-slot:option="option">
                    {{ option.name }} {{option.last_name}}
                </template>
                </v-select>
            </div>
            <div class="col-md-12 mb-3">
                <label for="title">{{ $t('home.openAssignmentsColumn.assignedTo') }} *</label>
                <v-select
                    taggable
                    :clearable="false"
                    label="name"
                    :options="users"
                    v-model="formData.user_id"
                >
                <template v-slot:option="option">
                    {{ option.name }} {{ option.surname }}
                </template>
                <template v-slot:selected-option="data">
                    {{ data.name }} {{ data.surname }}
                </template>
                </v-select>
            </div>
            <div class="col-md-12 mb-3">
                <label for="title">{{ $t('assignments.addAssignmentsModal.description') }} *</label>
                <div style="display: flex;">
                    <textarea type="text" v-model="formData.description" class="form-control" placeholder="Description"/>
                </div>
            </div>
            <div class="col-md-12 mb-3">
                <label for="title">{{ $t('assignments.addAssignmentsModal.due_at') }} </label>
                <b-form-input class="date" id="exampleInputdate" type="date" v-model="formData.due_at" ></b-form-input>
            </div>
        </div>
    </form>
    </b-modal>
</template>

<script>
import { createAssignments, updateAssignments } from '../../services/assignmentsService'
export default {
  name: 'AddEditAssignment',
  props: {
    modalAssigmentShow: {
      type: Boolean,
      default: false,
    },
    todo: {
      type: Object,
      required: true,
      default: null,
    },
    users: Array,
    enquires: Array,
  },

  computed: {
    isOkDisabled() {
      return !this.formData.due_at || !this.formData.description
    },
  },

  created() {
    if (this.todo) {
      this.formData = Object.assign({}, this.todo)
    }
  },

  watch: {
    todo: {
      deep: true,
      handler(val) {
        this.formData = Object.assign({}, val)
      },
    },
  },

  methods: {
    addAssignments() {
      if (this.formData.id) {
        let data = Object.assign({}, this.formData)
        if (typeof this.formData.user_id === 'object') {
          data.user_id = this.formData.user_id.id
        }
        updateAssignments(this.formData.id, data).then(() => {
          this.$emit('updated', true)
        })
      } else {
        let data = Object.assign({}, this.formData)
        if (typeof this.formData.user_id === 'object') {
          data.user_id = this.formData.user_id.id
        }
        createAssignments(data).then(() => {
          this.$emit('created', true)
        })
      }
    },
    cancelAssignments() {
      this.$emit('close', false)
    },
  },

  data() {
    return {
      formData: null,
    }
  },
}
</script>
