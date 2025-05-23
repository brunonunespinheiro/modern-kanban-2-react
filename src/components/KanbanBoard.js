import React, { useState } from 'react';
import { Plus, MoreHorizontal, Calendar, MessageSquare, Eye, List, Grid, X, Edit2, Check } from 'lucide-react';

const KanbanBoard = () => {
  const [viewMode, setViewMode] = useState('kanban');
  const [showModal, setShowModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [editingColumn, setEditingColumn] = useState(null);
  const [editColumnTitle, setEditColumnTitle] = useState('');
  // Estados para drag & drop - VERSÃO SUPER SIMPLIFICADA
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // Drag & Drop SUPER SIMPLES
  const onTaskDragStart = (task, fromColumnId) => {
    console.log('🚀 DRAG STARTED:', task.title, 'from column:', fromColumnId);
    setDraggedTask(task);
    setDraggedFromColumn(fromColumnId);
  };

  const onTaskDragEnd = () => {
    console.log('🏁 DRAG ENDED - cleaning up states');
    setDraggedTask(null);
    setDraggedFromColumn(null);
    setDragOverColumn(null);
  };

  const onColumnDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onColumnDragEnter = (columnId) => {
    if (draggedTask) {
      console.log('📍 ENTERING column:', columnId);
      setDragOverColumn(columnId);
    }
  };

  const onColumnDragLeave = () => {
    console.log('📤 LEAVING column');
    setDragOverColumn(null);
  };

  const onColumnDrop = (e, targetColumnId) => {
    e.preventDefault();
    console.log('🎯 DROPPED on column:', targetColumnId);
    
    if (!draggedTask || !draggedFromColumn) {
      console.log('❌ No task being dragged - ignoring drop');
      return;
    }
    
    if (draggedFromColumn === targetColumnId) {
      console.log('⚠️ Same column - ignoring drop');
      onTaskDragEnd();
      return;
    }

    console.log('✅ MOVING task:', draggedTask.title, 'from', draggedFromColumn, 'to', targetColumnId);

    // Mover o task
    setColumns(prev => prev.map(col => {
      if (col.id === draggedFromColumn) {
        console.log('Removing from source column:', col.title);
        return { ...col, tasks: col.tasks.filter(t => t.id !== draggedTask.id) };
      }
      if (col.id === targetColumnId) {
        console.log('Adding to target column:', col.title);
        return { ...col, tasks: [...col.tasks, draggedTask] };
      }
      return col;
    }));

    console.log('🎉 TASK MOVED SUCCESSFULLY!');
    onTaskDragEnd();
  };
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'URGENT'
  });
  
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'TO DO',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      tasks: [
        {
          id: '1',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-25',
          comments: 2,
          views: 15
        },
        {
          id: '2',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-26',
          comments: 1,
          views: 8
        },
        {
          id: '3',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-27',
          comments: 3,
          views: 12
        },
        {
          id: '4',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-28',
          comments: 0,
          views: 5
        }
      ]
    },
    {
      id: 'doing',
      title: 'FAZENDO',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      tasks: [
        {
          id: '5',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-24',
          comments: 4,
          views: 22
        },
        {
          id: '6',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-25',
          comments: 2,
          views: 18
        },
        {
          id: '7',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-26',
          comments: 1,
          views: 9
        },
        {
          id: '8',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-27',
          comments: 3,
          views: 14
        }
      ]
    },
    {
      id: 'done',
      title: 'FEITO',
      color: '#10B981',
      bgColor: '#ECFDF5',
      tasks: [
        {
          id: '9',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-23',
          comments: 5,
          views: 30
        },
        {
          id: '10',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-22',
          comments: 2,
          views: 25
        },
        {
          id: '11',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-21',
          comments: 1,
          views: 20
        },
        {
          id: '12',
          title: 'Título da página',
          description: 'Nome da tabela',
          priority: 'URGENT',
          assignee: '👤',
          dueDate: '2025-05-20',
          comments: 0,
          views: 15
        }
      ]
    }
  ]);

  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignee: '👤',
      dueDate: new Date().toISOString().split('T')[0],
      comments: 0,
      views: 0
    };

    setColumns(prev => prev.map(col => 
      col.id === selectedColumn 
        ? { ...col, tasks: [...col.tasks, task] }
        : col
    ));

    setNewTask({ title: '', description: '', priority: 'URGENT' });
    setShowModal(false);
  };

  const openAddTaskModal = (columnId) => {
    setSelectedColumn(columnId);
    setShowModal(true);
  };

  // Funções de Edição de Coluna
  const startEditingColumn = (columnId, currentTitle) => {
    setEditingColumn(columnId);
    setEditColumnTitle(currentTitle);
  };

  const saveColumnTitle = (columnId) => {
    if (editColumnTitle.trim() === '') return;
    
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, title: editColumnTitle.trim() }
        : col
    ));
    
    setEditingColumn(null);
    setEditColumnTitle('');
  };

  const cancelEditingColumn = () => {
    setEditingColumn(null);
    setEditColumnTitle('');
  };

  const TaskCard = ({ task, columnId, columnColor }) => (
    <div 
      draggable={true}
      onDragStart={(e) => {
        console.log('DRAG START:', task.title);
        onTaskDragStart(task, columnId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id);
      }}
      onDragEnd={(e) => {
        console.log('DRAG END:', task.title);
        onTaskDragEnd();
      }}
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: draggedTask?.id === task.id ? '0 8px 25px rgba(59, 130, 246, 0.4)' : '0 1px 3px rgba(0,0,0,0.1)',
        border: draggedTask?.id === task.id ? '2px solid #3B82F6' : '1px solid #E5E7EB',
        cursor: 'grab',
        userSelect: 'none',
        opacity: draggedTask?.id === task.id ? 0.7 : 1,
        transform: draggedTask?.id === task.id ? 'scale(1.02) rotate(1deg)' : 'none',
        transition: 'all 0.2s ease'
      }}
      onMouseDown={() => {
        console.log('MOUSE DOWN on:', task.title);
      }}
      onMouseEnter={(e) => {
        if (!draggedTask) {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.cursor = 'grab';
        }
      }}
      onMouseLeave={(e) => {
        if (!draggedTask) {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{
          backgroundColor: columnColor,
          color: 'white',
          fontSize: '11px',
          fontWeight: '600',
          padding: '4px 8px',
          borderRadius: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {task.priority}
        </span>
        <button style={{ color: '#9CA3AF', border: 'none', background: 'none', cursor: 'pointer' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <h3 style={{ 
        fontWeight: '600', 
        color: '#1F2937', 
        marginBottom: '6px', 
        fontSize: '15px',
        lineHeight: '1.4'
      }}>
        {task.title}
      </h3>
      <p style={{ 
        color: '#6B7280', 
        fontSize: '13px', 
        marginBottom: '16px',
        lineHeight: '1.4'
      }}>
        {task.description}
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#6B7280' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} />
            <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageSquare size={12} />
            <span>{task.comments}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={12} />
            <span>{task.views}</span>
          </div>
        </div>
        <div style={{ fontSize: '20px' }}>
          {task.assignee}
        </div>
      </div>
    </div>
  );

  const KanbanView = () => (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      overflowX: 'auto', 
      paddingBottom: '20px',
      minHeight: '600px'
    }}>
      {columns.map((column) => (
        <div 
          key={column.id} 
          onDragOver={onColumnDragOver}
          onDragEnter={() => onColumnDragEnter(column.id)}
          onDragLeave={onColumnDragLeave}
          onDrop={(e) => onColumnDrop(e, column.id)}
          style={{ 
            minWidth: '320px', 
            maxWidth: '320px',
            backgroundColor: dragOverColumn === column.id ? '#EBF8FF' : '#F8FAFC',
            borderRadius: '12px',
            border: dragOverColumn === column.id ? '3px solid #3B82F6' : '1px solid #E2E8F0',
            padding: '16px',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: column.color
              }}></div>
              
              {editingColumn === column.id ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <input
                    type="text"
                    value={editColumnTitle}
                    onChange={(e) => setEditColumnTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveColumnTitle(column.id)}
                    onBlur={() => saveColumnTitle(column.id)}
                    style={{
                      fontWeight: '600',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      border: '1px solid #3B82F6',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      outline: 'none',
                      backgroundColor: 'white',
                      flex: 1
                    }}
                    autoFocus
                  />
                  <button 
                    onClick={() => saveColumnTitle(column.id)}
                    style={{ color: '#10B981', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <Check size={14} />
                  </button>
                  <button 
                    onClick={cancelEditingColumn}
                    style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <h2 style={{ 
                    fontWeight: '600', 
                    color: '#374151',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: 0,
                    flex: 1
                  }}>
                    {column.title}
                  </h2>
                  <button 
                    onClick={() => startEditingColumn(column.id, column.title)}
                    style={{ 
                      color: '#9CA3AF', 
                      border: 'none', 
                      background: 'none', 
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    <Edit2 size={12} />
                  </button>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#6B7280', fontSize: '12px' }}>
                {column.tasks.length} tasks
              </span>
              <button style={{ color: '#9CA3AF', border: 'none', background: 'none', cursor: 'pointer' }}>
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
          
          <div style={{ marginBottom: '16px', minHeight: '200px' }}>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} columnId={column.id} columnColor={column.color} />
            ))}
            
            {dragOverColumn === column.id && draggedTask && (
              <div style={{
                height: '60px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                border: '2px dashed #3B82F6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6',
                fontSize: '14px',
                fontWeight: '600',
                marginTop: '12px'
              }}>
                ⬇️ Solte aqui para mover "{draggedTask.title}"
              </div>
            )}
          </div>
          
          <button 
            onClick={() => openAddTaskModal(column.id)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px dashed #D1D5DB',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#6B7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#9CA3AF';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.color = '#6B7280';
            }}
          >
            <Plus size={16} />
            <span>Adicionar tarefa</span>
          </button>
        </div>
      ))}
    </div>
  );

  const ListView = () => {
    const allTasks = columns.flatMap(column => 
      column.tasks.map(task => ({ ...task, status: column.title, statusColor: column.color }))
    );

    return (
      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#F9FAFB' }}>
              <tr>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Tarefa
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Status
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Prioridade
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Data
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Responsável
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Atividade
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((task, index) => (
                <tr key={task.id} style={{ 
                  borderTop: index > 0 ? '1px solid #F3F4F6' : 'none',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = 'white'}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{task.title}</div>
                      <div style={{ fontSize: '14px', color: '#6B7280' }}>{task.description}</div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      backgroundColor: task.statusColor,
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '500',
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      fontSize: '11px',
                      fontWeight: '500',
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#111827' }}>
                    {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ fontSize: '18px' }}>{task.assignee}</span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6B7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={14} />
                        <span>{task.comments}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={14} />
                        <span>{task.views}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <button style={{ color: '#9CA3AF', border: 'none', background: 'none', cursor: 'pointer' }}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F5F9', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', margin: 0 }}>
            Projeto Kanban
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              display: 'flex', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '4px',
              border: '1px solid #E2E8F0'
            }}>
              <button
                onClick={() => setViewMode('kanban')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'kanban' ? '#3B82F6' : 'transparent',
                  color: viewMode === 'kanban' ? 'white' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? '#3B82F6' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <List size={18} />
              </button>
            </div>
            
            <button 
              onClick={() => openAddTaskModal('todo')}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3B82F6'}
            >
              <Plus size={16} />
              <span>Nova Tarefa</span>
            </button>
          </div>
        </div>

        {viewMode === 'kanban' ? <KanbanView /> : <ListView />}

        {/* Modal para adicionar tarefa */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                  Nova Tarefa
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Título
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Digite o título da tarefa"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Descrição
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Digite a descrição da tarefa"
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Coluna
                </label>
                <select
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {columns.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTask}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;