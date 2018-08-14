
import blog from '@/api/blog'


export default {
    data () {
        return {
            blogs:[],
            total:0,
            page:1,
            currentPage:0 
        }
    },
    created(){
        this.page = parseInt( this.$route.query.page ) || 1
        blog.getIndexBlogs( { page: this.page } ).then( res =>{
            console.log(res)
            this.blogs = res.data
            this.total = res.total
            this.page = res.page
            this.currentPage =  parseInt( this.$route.query.page )
        })
    },
    methods: {
        onPagechange( newpage ){
            console.log( newpage )
            blog.getIndexBlogs( { page: newpage } ).then( res =>{
                console.log(res)
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
                this.$router.push({ path: '/', query:{ page: newpage } })
                this.currentPage =  parseInt( this.$route.query.page )
            })
        }
    }
}