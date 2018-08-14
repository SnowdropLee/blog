import blog from '@/api/blog'
import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            blogs: [],
            page:1,
            total:0,
            currentPage:0 
        }
    },
    computed:{
        ...mapGetters(['user'])
    },
    created (){
        this.page = this.$route.query.page ||  1
        blog.getBlogsByUserId( this.user.id, {page: this.page} ).then(res =>{
            //console.log(res)
            this.page = res.page
            this.total = res.total
            this.blogs = res.data
            this.currentPage =  parseInt( this.$route.query.page )
        })
    },
    methods: {
        splitDate( dataStr ){
            let dataObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
            return {
                date: dataObj.getDate(),
                month:dataObj.getMonth()+1,
                year:dataObj.getFullYear()
            }
        },
        onPagechange( newpage ){
            console.log( newpage )
            blog.getBlogsByUserId( this.user.id, { page: newpage } ).then( res =>{
                console.log(res)
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
                this.$router.push({ path: "/my", query:{ page: newpage } })
                this.currentPage =  parseInt( this.$route.query.page )
            })
        },
        onDelete(blogId){
            console.log(blogId)
            this.$confirm(
                '此操作将永久删除该博客, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then( () => {
                    return  blog.deleteBlog( { blogId } )
              }).then( ()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
              }) .then( () =>{
                   this.blogs = this.blogs.filter( blog => blog.id != blogId)
              })
        }
    }
}