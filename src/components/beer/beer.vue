<template>
  <div>
    <el-table
      :data="this.beerList"
      @sort-change="changeSort"
      height="600"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props" >
          <div class="column-expand">
            <div> Description </div>
            <p> {{ props.row.description }} </p>
            <div> Created date </div>
            <p> {{ props.row.createDate }} </p>
            <div> Is organic? </div>
            <p> {{ props.row.isOrganic == 'Y' ? 'Yes' : 'No' }} </p>
            <div> Style Description </div>
            <p> {{ props.row.style.description }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="500"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        width="200"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="style.name"
        label="Style">
      </el-table-column>
      <el-table-column
        prop="abv"
        label="Abv"
        sortable="custom">
      </el-table-column>
    </el-table>
    <div class="pagination-buttons">
      <el-button-group>
        <el-button
          v-if="this.pagination.currentPage > 1"
          @click="previousPage"
          type="primary"
          icon="el-icon-arrow-left">

          Previous Page
        </el-button>
        <el-button
          v-if="this.pagination.currentPage < this.pagination.numberOfPages"
          @click="nextPage"
          type="primary">

          Next Page
          <i class="el-icon-arrow-right el-icon-right"></i>
        </el-button>
      </el-button-group>
      <span class="total-results">Page {{ this.pagination.currentPage }} of {{ this.pagination.numberOfPages }} - {{ this.pagination.totalResults }} Results</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'beer',
  data () {
    return {
      beers: {}
    }
  },
  mounted: function () {
    this.$store.dispatch('getBeerList')
  },
  computed: {
    ...mapGetters([
      'beerList',
      'pagination'
    ])
  },
  methods: {
    ...mapMutations([
      'setOrder'
    ]),
    changeSort: function (header) {
      if (header.prop) {
        this.setOrder({
          field: header.prop,
          sort: header.order === 'ascending' ? 'ASC' : 'DESC'
        })
        this.$store.dispatch('getBeerList')
      }
    },
    nextPage: function () {
      this.$store.dispatch('getBeerList', { p: this.pagination.currentPage + 1 })
    },
    previousPage: function () {
      this.$store.dispatch('getBeerList', { p: this.pagination.currentPage - 1 })
    }
  }
}
</script>

<style>
  .column-expand div {
    font-weight: bold;
  }

  .pagination-buttons {
    margin-top: 1%;
  }
</style>
