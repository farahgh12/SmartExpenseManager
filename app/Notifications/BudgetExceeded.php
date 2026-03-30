<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BudgetExceeded extends Notification
{
    use Queueable;

    protected $category;
    protected $spent;
    protected $limit;

    /**
     * Create a new notification instance.
     */
    public function __construct($category, $spent, $limit)
    {
        $this->category = $category;
        $this->spent = $spent;
        $this->limit = $limit;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => "Attention: Vous avez dépassé votre budget pour la catégorie {$this->category->name}.",
            'details' => "Dépensé: \${$this->spent} / Limite: \${$this->limit}",
            'category_id' => $this->category->id,
            'type' => 'warning',
        ];
    }
}
