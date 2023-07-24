import { current, nanoid, createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
// import { initialuserList } from 'constant/blog'
import { IUser } from '../types/user.type'
import http from '../utils/http'
import { CustomError } from '../utils/helper'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface UserState {
  userList: IUser[],
  user: IUser,
  editingUser: IUser | null
  loading: boolean
  currentRequestId: undefined | string
}

export let defaultUser = {
    id: "1",
    jobTitle: "Solution Architechure",
    links: {
        website: "",
        github: "",
        linkedin: "",
        facebook: ""
    },
    info: {
      "name": "Tran Nhat Sang Okila",
      "dateOfBirth": "9/10/2022",
      "phone": "0937988510",
      "email": "nhatsang0101@gmail.com",
      "address": "Di An, Binh Duong",
      "avatar": "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    additionSkills: [
    "php", "figma", "react"
    ],
    techSkills: [
      {
        "id": "1",
        "name": "ReactJS"
      }
    ],
    softSkills: [
     "present", "teamwork"
    ],
    languages: [
      "vietnamese",
      "english"
    ],
    certifications: [
      "TOEIC",
      "IELTS"
    ],
    careerObject: "Software Engineer Over 2 years of experience in programming with good communication and quick learning skills Strengths: Front-end technology and Back-end web application developmentProficiency in HTML, CSS, JavaScript",
    education: [
      {
        "id": "dfdsfd",
        "schoolName": "FPT polytechnic",
        "major": "Web development",
        "level": "Excelence",
        "gpa": 9.5,
        "timeStart": "",
        "timeEnd": ""
      }
    ],
    awards: [
      {
        "name": "Top 1 Hackathon",
        "timeAchieve": "12/2022"
      },
      {
        "name": "Top 1 Hackathon",
        "timeAchieve": "12/2022"
      }
    ],
    projects: [
      {
        "name": "MyCV",
        "dateStart": "",
        "dateEnd": "",
        "desc": "Ứng dụng tạo CV theo chuẩn chuyên nghiệp, luôn luôn cho phép tải về PDF miễn phí",
        "website": "https://trannhatsang.com",
        "repoLink": "https://github.com/sangtrandev00",
        "members": 3,
        "position": "Fullstack",
        "technologies": "ReactJS, Nodejs, Mongodb"
      },
      {
        "name": "MyCV",
        "dateStart": "",
        "dateEnd": "",
        "desc": "Ứng dụng tạo CV theo chuẩn chuyên nghiệp, luôn luôn cho phép tải về PDF miễn phí",
        "website": "https://trannhatsang.com",
        "repoLink": "https://github.com/sangtrandev00",
        "members": 3,
        "position": "Fullstack",
        "technologies": "ReactJS, Nodejs, Mongodb"
      },
      {
        "name": "MyCV",
        "dateStart": "",
        "dateEnd": "",
        "desc": "Ứng dụng tạo CV theo chuẩn chuyên nghiệp, luôn luôn cho phép tải về PDF miễn phí",
        "website": "https://trannhatsang.com",
        "repoLink": "https://github.com/sangtrandev00",
        "members": 3,
        "position": "Fullstack",
        "technologies": "ReactJS, Nodejs, Mongodb"
      }
    ]
  }

const initialState: UserState = {
  userList: [],
  editingUser: null,
  user: defaultUser,
  loading: false,
  currentRequestId: undefined
}

export const getUserList = createAsyncThunk('user/getUserList', async (_, thunkAPI) => {
  const response = await http.get<IUser[]>('users', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
 try {
    const response = await http.get<IUser>('users/1', {
        signal: thunkAPI.signal
      })
      return response.data
 } catch (error) {
    if(error instanceof CustomError) {
        if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
          }
    }
    throw error
 }
})

export const addUser = createAsyncThunk('user/addUser', async (body: Omit<IUser, 'id'>, thunkAPI) => {
  try {
    const response = await http.post<IUser>('users', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error) {
    if(error instanceof CustomError) {
        if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
          }
    }
    throw error
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (body: IUser, thunkAPI) => {
  try {
    const response = await http.put<IUser>(`users/${body.id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error) {
    // Handle error here

    if(error instanceof CustomError) {
        if (error.name === 'AxiosError' && error.response?.status === 422) {
            return thunkAPI.rejectWithValue(error.response?.data)
          }
    }
    
    throw error
  }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId: string, thunkAPI) => {
  const response = await http.delete<IUser>(`users/${userId}`, {
    signal: thunkAPI.signal
  })
  return response.data
})

// Recommend dùng cách này (builder callback dể add case) hơn là dùng map object

const userSlice = createSlice({
  name: 'user', // prefix name of action
  initialState,
  reducers: {
    startEditingUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      state.editingUser = state.userList.find((user) => user.id === userId) || null
    },
    cancelEditingUser: (state) => {
      state.editingUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        defaultUser = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {

        console.log("state: ", state);
        console.log("action: ", action);
        state.user = action.payload;
        // const userExisitingIdx = state.userList.findIndex((user) => user.id === userId)
        // if (userExisitingIdx >= 0) {
        //   state.userList[userExisitingIdx] = action.payload
        // }

        // state.editingUser = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.meta.arg

        console.log(action, state)

        const userExisitingIdx = state.userList.findIndex((user) => user.id === userId)

        console.log('id: ', userExisitingIdx)

        if (userExisitingIdx >= 0) {
          state.userList.splice(userExisitingIdx, 1)
        }
      })
      .addMatcher<PendingAction>(
        (action: PendingAction) => action.type.endsWith('/pending'),
        (state, action) => {
          console.log(current(state))

          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action: RejectedAction | FulfilledAction) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {
        // console.log(`action type: ${action.type}`, current(state))
      })
  }
})

export const { startEditingUser, cancelEditingUser } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
