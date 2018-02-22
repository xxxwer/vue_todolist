<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来做什么？"
            @keyup.enter="addTodo"
        >
        <Item
            v-for="todo in todosFiltered"
            :key="todo.id"
            :todo="todo"
            @delItem="delItem"
        >
        </Item>
        <Tabs
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilterTodoItems"
            @clickAllCompleted="clickAllCompleted"
        >
        </Tabs>
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todoItems')) || [],
            filter: 'all',
        }
    },
    watch: {
        todos: {
            handler: function (val, oldVal) {
                localStorage.setItem('todoItems', JSON.stringify(this.todos))
            },
            deep: true
        },
    },
    components: {
        Item,
        Tabs,
    },
    computed: {
        todosFiltered() {
            if (this.filter === 'all') {
                return this.todos
            }
            let completed = this.filter === 'completed'
            return this.todos.filter(todo => todo.completed === completed)
        },
    },
    methods: {
        addTodo(e) {
            let content = e.target.value.trim()
            if (content === '') {
                return
            }
            let todo = {
                id: (new Date()).getTime(),
                content: content,
                completed: false
            }
            this.todos.unshift(todo)
            e.target.value = ''
        },
        delItem(itemId) {
            let result = confirm('确定删除吗？')
            if(result) {
                this.todos.splice(this.todos.findIndex(todo => todo.id == itemId), 1)
            }
        },
        toggleFilterTodoItems(state) {
            this.filter = state
        },
        clickAllCompleted(){
            let result = confirm('确定清空已完成吗？')
            if(result) {
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        },
    }
}
</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
}
.add-input{
    positon:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit
    font-weight:inherit
    line-height 1.4rem
    border 0;
    outline none
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none
}
</style>