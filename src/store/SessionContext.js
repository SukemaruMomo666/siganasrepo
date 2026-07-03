import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [session, setSession] = useState({
    isActive: false,
    collectorName: '',
    targetAmount: 0,
    startTime: null,
    sessionDate: null,
    scanCount: 0,
    boxes: [], // Array of { id, grade, capacity, items: [] }
    scannedItems: [], // Array of all scanned pineapples
  });

  const login = (username) => {
    setCurrentUser({ username });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const startSession = (collectorName, targetAmount) => {
    const now = new Date();
    setSession({
      isActive: true,
      collectorName: collectorName || (currentUser ? currentUser.username : "Petani"),
      targetAmount: parseInt(targetAmount) || 0,
      startTime: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      sessionDate: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      scanCount: 0,
      boxes: [
        { id: `BOX-A-001`, grade: 'A', items: [], isClosed: false },
        { id: `BOX-B-001`, grade: 'B', items: [], isClosed: false },
        { id: `BOX-C-001`, grade: 'C', items: [], isClosed: false },
        { id: `BOX-D-001`, grade: 'D', items: [], isClosed: false },
      ],
      scannedItems: [],
    });
  };

  const endSession = () => {
    setSession(prev => ({ ...prev, isActive: false }));
    // In a real app, you would save the session data to a database here
  };

  const incrementScanCount = () => {
    setSession(prev => ({
      ...prev,
      scanCount: prev.scanCount + 1,
    }));
  };

  const addScannedItem = (item) => {
    setSession(prev => ({
      ...prev,
      scannedItems: [...prev.scannedItems, item],
    }));
  };

  const assignToBox = (item, boxId) => {
    setSession(prev => ({
      ...prev,
      boxes: prev.boxes.map(box => {
        if (box.id === boxId) {
          return { ...box, items: [...box.items, item] };
        }
        return box;
      })
    }));
  };

  const addNewBox = (grade) => {
    setSession(prev => {
      const gradeBoxes = prev.boxes.filter(b => b.grade === grade);
      
      // Mark all previous boxes of this grade as closed (full)
      const updatedBoxes = prev.boxes.map(box => {
        if (box.grade === grade) {
          return { ...box, isClosed: true };
        }
        return box;
      });

      const newBoxNumber = gradeBoxes.length + 1;
      const newBoxId = `BOX-${grade}-${String(newBoxNumber).padStart(3, '0')}`;
      
      const newBox = {
        id: newBoxId,
        grade,
        items: [],
        isClosed: false
      };

      return {
        ...prev,
        boxes: [...updatedBoxes, newBox]
      };
    });
  };

  return (
    <SessionContext.Provider value={{
      currentUser,
      login,
      logout,
      session,
      startSession,
      endSession,
      incrementScanCount,
      addScannedItem,
      assignToBox,
      addNewBox
    }}>
      {children}
    </SessionContext.Provider>
  );
};
