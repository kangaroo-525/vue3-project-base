import { defineComponent } from 'vue'

const Home = defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()
    const go = (path: string) => {
      router.push(path)
    }
    return {
      go
    }
  },
  render() {
    const { go } = this
    return (
      <div>
        this is Home
        <div onClick={() => go('/system/user')}>user</div>
        <div onClick={() => go('/base/customer')}>customer</div>
      </div>
    )
  }
})

export default Home
