<template>
    <b-list-group class="list-group-flush" id="openTodos">
        <b-list-group-item v-for="(item, index) in openAssignments"
            :key="index"
            :style="{'background': getDifferenceDate(item.due_at) === 1 && '#ffeeba' || getDifferenceDate(item.due_at) > 1 && '#f5c6cb'}"
        >
            <div :class="{ 'taskIsActive' : !item.completed}">
                <div>
                    <b-checkbox v-model="item.completed" name="check-button" inline
                        :key="index"
                        @change="finishAssignment(item.id, $event)">
                        <strong v-if="!item.completed">{{ item.description }}</strong>
                        <strong :style="{ color: '#aaa' }" v-else>{{ item.description }}</strong>
                    </b-checkbox>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <span class="text-left">{{ item.patientname }} {{ item.patientlastname }}</span>&nbsp;
                        <span class="text-left">{{ patientsDentist(item) ? `(${patientsDentist(item)})` : '' }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="text-right text-width-150">{{ item.due_at | formatDate }}</span>
                        <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" style="margin-left: 5%;" @click="editAssignments(item)">
                            <i class="ri-ball-pen-fill m-0"></i>
                        </b-button>
                    </div>
                </div>
            </div>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>