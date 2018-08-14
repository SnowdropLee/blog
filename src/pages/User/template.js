import blog from '@/api/blog'

export default {
    data () {
        return {
            blogs: [],
            page:1,
            total:0,
            user:{},
            currentPage:0 
        }
    },
    created (){
        this.userId = this.$route.params.userId
        this.page = this.$route.query.page ||  1
        blog.getBlogsByUserId( this.userId, {page: this.page} ).then(res =>{
            console.log(res)
            this.page = res.page
            this.total = res.total
            this.blogs = res.data
            this.currentPage =  parseInt( this.$route.query.page )
            if( res.data.length > 0 ){
                this.user = res.data[0].user
            }

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
            blog.getBlogsByUserId( this.userId, { page: newpage } ).then( res =>{
                console.log(res)
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
                this.$router.push({ path: `/user/${this.userId}`, query:{ page: newpage } })
                this.currentPage =  parseInt( this.$route.query.page )
            })
        }
    }
}