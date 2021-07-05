import './Spinner.css'

export default function Spinner({ className = '', ...props } = {}) {
  return (
    <div className={'Spinner ' + className} {...props}>
      <div className="Loader" />
      <span className="ScreenReaderOnly">Loading</span>
    </div>
  )
}
