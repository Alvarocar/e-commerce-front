import './styles.scss'
const DefaultLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <div className="container">
      <div className="lds-ellipsis">
        <div></div> <div></div> <div></div> <div></div>
      </div>
    </div>
  </div>
)

export default DefaultLoader