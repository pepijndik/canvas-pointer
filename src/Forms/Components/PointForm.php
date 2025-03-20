<?php

namespace RuelLuna\CanvasPointer\Forms\Components;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Livewire\Component;

class PointForm extends Component
{
    protected string $view = 'canvas-pointer::forms.components.point-form';
    public function render(): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
     {
        return view($this->view,[
            'isOpen'=>$this->isOpen
        ]);
    }
    public $isOpen = false;

       protected function setUp(): void
    {
        parent::setUp();
    }
    protected $listeners = [
        'showPointForm' => 'showForm'
    ];

    public function showForm()
    {
        $this->isOpen = true;
    }

    public function hideForm()
    {
        $this->isOpen = false;
    }

    public function updatePoint($details)
    {
        // Code for updating a point
        // For example: $this->emit('updatePoint', $details);

        $this->hideForm();
    }
}
