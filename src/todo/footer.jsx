import '../assets/css/footer.styl'

export default {
    data() {
        return {
            author: 'Wer'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>dev by {this.author}</span>
            </div>
        )
    }
}