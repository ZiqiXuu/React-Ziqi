import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {fetchAllActivities, updateAllCalls} from "../store/actions/activitiesAction";
import SingleCallSummary from "./SingleCallSummary";
import List from '@mui/material/List';
import {ListItem} from "@mui/material";
import UpdateAllBtn from "./UpdateAllBtn";
import Divider from "@mui/material/Divider";
import LinearProgress from '@mui/material/LinearProgress';
import {clearLoading, setLoading} from "../store/actions/loadingAction";
import './callsList.css'

const CallsList = (props) => {
    const isInbox = props.pageName === 'inbox'
    const dispatch = useDispatch()
    const allActivities = useSelector(state => state.activitiesReducer?.activities)
    const isLoading = useSelector(state => state.loadingReducer?.isLoading)

    let filteredAndSortedActivities = allActivities.filter(item => {
        const filter = isInbox ? item.is_archived : !item.is_archived
        return item.direction && item.from && item.to && filter
    }).sort((a, b) => {
        const keyA = a.created_at.split('T')[0] + a.direction
        const keyB = b.created_at.split('T')[0] + b.direction
        return keyA > keyB ? -1 : (keyA < keyB ? 1 : 0)
    });

    const updateAll = (newIsArchived) => {
        dispatch(setLoading())
        dispatch(updateAllCalls(filteredAndSortedActivities, newIsArchived))
        setTimeout(async () => {
            dispatch(clearLoading())
        }, 1200)
    }

    useEffect(() => {
        dispatch(fetchAllActivities())
    }, [])

    const groupedByDate = filteredAndSortedActivities.reduce((acc, item) => {
        const date = item.created_at.split('T')[0];
        if (acc[date]) {
            acc[date].push(item);
        } else {
            acc[date] = [item];
        }
        return acc;
    }, {});

    const sortCallsByGroup = (calls) => {
        let groupedData = []
        let lastItem = null
        for (let item of calls) {
            const directionKey = item.direction === 'outbound' ? 'to' : 'from'
            if (lastItem && lastItem.direction === item.direction && lastItem[directionKey] === item[directionKey]) {
                lastItem.items.push(item)
            } else {
                lastItem = {
                    direction: item.direction,
                    [directionKey]: item[directionKey],
                    items: [item],
                };
                groupedData.push(lastItem)
            }
        }
        return groupedData
    }

    return (
        <div>
            <div>
                <List sx={{overflow: "auto", height: '490px'}}>
                    <UpdateAllBtn btnName={isInbox ? 'Archive all calls' : 'Unarchive all calls'}
                                  onClick={isInbox ? () => updateAll(false) : () => updateAll(true)}/>

                    {!isLoading? Object.keys(groupedByDate).map(key => {
                        const callsGroup = sortCallsByGroup(groupedByDate[key])
                        return (
                            <div>
                                <div className='dateContainer'> <Divider>{key}</Divider></div>
                                {callsGroup.map((call, index) => {
                                    return (
                                        // <Animations>
                                        <ListItem key={index} sx={{padding: "0 12px"}}>
                                            <SingleCallSummary activity={call.items[0]} amount={call.items.length} items={call.items}/>
                                        </ListItem>
                                        //*</Animations>*/
                                    )
                                })}
                            </div>
                        )
                    }):<LinearProgress />}
                </List>
            </div>
        </div>
    );
};

export default CallsList;