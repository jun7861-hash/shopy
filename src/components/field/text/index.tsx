import styles from './styles.module.scss';

type Props = {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type?: 'text' | 'number';
  name: string;
  isRequired?: boolean;
};

const TextField = (props: Props) => {
  const {
    label,
    onChange,
    value,
    type = 'text',
    name,
    isRequired = false,
  } = props;

  return (
    <div className={styles.field}>
      <label htmlFor={label} className={styles.field__label}>
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={name}
        className={styles.field__input}
        onChange={onChange}
        value={value}
        required={isRequired}
      />
    </div>
  );
};

export default TextField;
