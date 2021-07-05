import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Icon = ({ ...props }: any) => (
  <FontAwesomeIcon fixedWidth={true} {...props} />
)

export {
  faCircle as circleIcon,
  faCheckCircle as checkedCircleIcon,
  faTrashAlt as trashIcon,
} from '@fortawesome/free-regular-svg-icons'

export {
  faHome as homeIcon,
  faColumns as projectsIcon,
  faTasks as tasksIcon,
} from '@fortawesome/free-solid-svg-icons'
