<template>
  <div id="my">
    <section class="user-info">
      <img src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="" class="avatar">
      <h3>若愚</h3>
    </section>
    <section>
      <router-link class="item"  v-for="blog in blogs"  :key="blog.id"  :to="`/detail/${blog.id}`" >
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
        <div class="actions">
          <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
        </div>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination 
        @current-change="onPagechange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
