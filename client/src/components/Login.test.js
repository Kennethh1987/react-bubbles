import React from "react";
import { render, waitFor } from "@testing-library/react";
import Login from './Login';
import { shallow } from 'enzyme';

describe('Test case for testing login',() =>{
    let wrapper;
    test('username check',()=>
    {
    wrapper = shallow(<Login/>);
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'lambda'}});
    expect(wrapper.state('username')).toEqual('lambda');
    })
    it('password check',()=>{
    wrapper = shallow(<Login/>);
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'school'}});
    expect(wrapper.state('password')).toEqual('school');
    })
    it('login check with right data',()=>{
    wrapper = shallow(<Login/>);
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'lambda'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'school'}});
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isLogined')).toBe(true);
    })
    it('login check with wrong data',()=>{
    wrapper = shallow(<Login/>);
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'lambda'}});
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'school'}});
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isLogined')).toBe(false);
    })
    })