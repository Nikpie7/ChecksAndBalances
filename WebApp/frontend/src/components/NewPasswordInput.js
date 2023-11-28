import { MdOutlineCheck, MdOutlineClose } from 'react-icons/md';
import passwordValidator from 'password-validator';
import { useState } from 'react';
import FormInput from './FormInput';
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits

const NewPasswordInput = ({passwordObj, setPasswordObj}) => {
  const [focused, setFocused] = useState(false);
  return (<>
    <FormInput
      name="password"
      label="Password"
      placeholder="Enter a password"
      handleChange={setPasswordObj}
      credObj={passwordObj}
      password
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
    {focused ? <PasswordComplexity password={passwordObj.password} /> : null}
    <FormInput
      name="passwordConfirm"
      label="Confirm password"
      placeholder="Re-enter password"
      handleChange={setPasswordObj}
      credObj={passwordObj}
      password
    />
  </>)
};

const PasswordComplexity = ({password}) => {
  const complexityItems = [
    {validation: 'min', text: 'Minimum of 8 characters', valid: true},
    {validation: 'uppercase', text: 'Contains an uppercase letter', valid: true},
    {validation: 'lowercase', text: 'Contains a lowercase letter', valid: true},
    {validation: 'digits', text: 'Contains a digit', valid: true},
  ];
  const complexityCheck = schema.validate(password, {list: true});
  complexityCheck.map(check => {
    const index = complexityItems.findIndex(item => item.validation === check);
    if (index !== -1)
      complexityItems[index].valid = false;
  });

  return <div className="flex flex-col gap-1 mb-4">
    {complexityItems.map(item => <ComplexityItem item={item} key={item.text} />)}
  </div>
};
const ComplexityItem = ({item}) => {
  const {text, valid} = item;
  return <span className={`flex justify-between ${valid ? 'text-green-600' : 'text-red-600'}`}>
    <p className={``}>{text}</p>
    {valid
    ? <MdOutlineCheck className="text-xl"/>
    : <MdOutlineClose className="text-xl"/>}
  </span>
}

export default NewPasswordInput;