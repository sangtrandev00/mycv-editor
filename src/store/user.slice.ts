import { current, nanoid, createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
// import { initialuserList } from 'constant/blog'
import { IEducation, IInfo, ILink, IProject, IUser } from '../types/user.type'
import http from '../utils/http'
import { CustomError } from '../utils/helper'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export enum FormEntryState {
  CONTACT_INFO,
  CAREER_OBJECTIVE,
  EDUCATION,
  AWARDS,
  TECH_SKILLS,
  ADDITION_SKILLS,
  SOFT_SKILLS,
  PROJECTS,
  CERTIFICATIONS,
  LANGUAGES,
  SOCIAL_LINKS
}

const initalProjectData : IProject = {
  id: "",
  name: '',
  dateStart: '',
  dateEnd: '',
  desc: '',
  website: '',
  repoLink: '',
  members: 0,
  position: '',
  technologies: ""
}

interface UserState {
  userId:string;
  formEntryState: FormEntryState,
  userList: IUser[],
  user: IUser,
  editingUser: IUser | null
  loading: boolean
  currentRequestId: undefined | string
  isOpenDrawer: boolean
  currProjectId: string
  currentEditingProject: IProject
  currEducationId: string
  currEducation: IEducation | null
}

export let defaultUser = {
    id: "1",
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
      "avatar": "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "jobTitle": "Software Engineer"
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
        "id": "1",
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
        "id": "2",
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
        "id": "3",
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
  userId: "1",
  formEntryState: FormEntryState.CONTACT_INFO,
  currProjectId: "",
  userList: [],
  editingUser: null,
  user: defaultUser,
  loading: false,
  currentRequestId: undefined,
  isOpenDrawer: false,
  currentEditingProject: initalProjectData,
  currEducationId: "",
  currEducation: null
}

export const getUserList = createAsyncThunk('user/getUserList', async (_, thunkAPI) => {
  const response = await http.get<IUser[]>('users', {
    signal: thunkAPI.signal
  })
  return response.data
})

// changed userid
export const getUser = createAsyncThunk('user/getUser', async (userId: string, thunkAPI) => {
 try {
    const response = await http.get<IUser>(`users/${userId}`, {
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

// Changed userid
export const updateUserContactInfo = createAsyncThunk('user/updateUserContactInfo', async (body: {id: string, info: IInfo}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      info: body.info
    }, {
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
});

// Changed userid
export const updateSocialLinks = createAsyncThunk('user/updateSocialLinks', async (body: {id: string, links: ILink}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      links: body.links
    }, {
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
});

// Haven't changed userid yet
export const updateUserEducation = createAsyncThunk('user/updateUserEducation', async (body: {id: string, education: IEducation[]}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      education: body.education
    }, {
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

// changed userid
export const updateCareerObjective = createAsyncThunk('user/updateCareerObjective', async (body: {id: string, careerObjective: string}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      careerObject: body.careerObjective
    }, {
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

// export const updateEducation = createAsyncThunk('user/updateEducation', async (body: {id: string, education: IEducation[]}, thunkAPI) => {
//   try {
//     const response = await http.patch<IUser>(`users/${body.id}`, {
//       education: body.education
//     }, {
//       signal: thunkAPI.signal
//     })
//     return response.data
//   } catch (error) {
//     // Handle error here

//     if(error instanceof CustomError) {
//         if (error.name === 'AxiosError' && error.response?.status === 422) {
//             return thunkAPI.rejectWithValue(error.response?.data)
//           }
//     }
    
//     throw error
//   }
// })

export const updateAwards = createAsyncThunk('user/updateAwards', async (body: {id: string, careerObjective: string}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      careerObjective: body.careerObjective
    }, {
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

// changed userid
export const updateProjects = createAsyncThunk('user/updateProjects', async (body: {id: string, projects: IProject[]}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      // careerObjective: body.careerObjective
      projects: body.projects
    }, {
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

// have changed userid
export const updateTechnicalSkills = createAsyncThunk('user/updateTechnicalSkills', async (body: {id: string, techSkills: {id: string, name: string}[]} , thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
        techSkills: body.techSkills
    }, {
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

export const updateAdditionSkills = createAsyncThunk('user/updateAdditionSkills', async (body: {id: string, careerObjective: string}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      careerObjective: body.careerObjective
    }, {
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

export const updateSoftSkills = createAsyncThunk('user/updateSoftSkills', async (body: {id: string, careerObjective: string}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      careerObjective: body.careerObjective
    }, {
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

export const updateLanguages = createAsyncThunk('user/updateLanguages', async (body: {id: string, careerObjective: string}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      careerObjective: body.careerObjective
    }, {
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

export const updateCertifications = createAsyncThunk('user/updateCertifications', async (body: {id: string, careerObjective: string}, thunkAPI) => {
  try {
    const response = await http.patch<IUser>(`users/${body.id}`, {
      careerObjective: body.careerObjective
    }, {
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
    startingEditingProject: (state, action: PayloadAction<string>) => {
      state.currProjectId = action.payload;
      const exisitingProject = state.user.projects.find((project) => project.id === action.payload);
      if(exisitingProject) {
        state.currentEditingProject = exisitingProject;
      }
    },
    startEditingEducation: (state, action: PayloadAction<string>) => {
      state.currEducationId = action.payload;
      
      const exisitingEducation = state.user.education.find((educateItem) => educateItem.id === action.payload);

      console.log("existing education: ", exisitingEducation);

      if(exisitingEducation) {
        state.currEducation = exisitingEducation;
      }
    },
    cancelEditingUser: (state) => {
      state.editingUser = null
    },
    localUpdateUserInfo: (state, action: PayloadAction<IInfo>) => {

      state.user.info = action.payload;
    },
    localUpdateCareerObjective: (state, action: PayloadAction<string>) => {
      state.user.careerObject = action.payload;
    },
    localUpdateTechSkills: (state, action: PayloadAction<{id: string, name: string}>) => {

      const skillExistingIdx = state.user.techSkills.findIndex((skill) => skill.id === action.payload.id)
      if(skillExistingIdx >= 0) {
        state.user.techSkills[skillExistingIdx] = action.payload;
      }

    },
    localUpdateEducation: (state, action: PayloadAction<IEducation>) => {

      const educationExistingIdx = state.user.education.findIndex((educateItem) => educateItem.id === action.payload.id)

      if(educationExistingIdx >= 0) {
        state.user.education[educationExistingIdx] = action.payload;
      }
 
    },
    localUpdateCurrentProject: (state, action: PayloadAction<IProject>) => {

      const currProjectExisitingIdx = state.user.projects.findIndex((project) => project.id === action.payload.id)

      if(currProjectExisitingIdx >= 0) {
        state.user.projects[currProjectExisitingIdx] = action.payload;
      }
 
    },
    localUpdateSocialLinks: (state, action: PayloadAction<ILink>) => {

      state.user.links = action.payload
 
    },
    startEditingFormState: (state, action: PayloadAction<FormEntryState>) => {
      state.formEntryState = action.payload
    },
    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    showEntryDrawer: (state) => {
      state.isOpenDrawer = true
    },
    closeEntryDrawer: (state) => {
      state.isOpenDrawer = false
    },
    toggleEntryDrawer: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer
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

export const { startEditingUser, startingEditingProject, startEditingEducation, localUpdateTechSkills, cancelEditingUser, localUpdateUserInfo, startEditingFormState, showEntryDrawer, closeEntryDrawer, toggleEntryDrawer, localUpdateCareerObjective, localUpdateEducation, localUpdateCurrentProject, localUpdateSocialLinks, setCurrentUserId } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
