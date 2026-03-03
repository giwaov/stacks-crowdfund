;; Crowdfunding Contract - Simple campaign funding on Stacks Mainnet

(define-data-var campaign-count uint u0)

(define-map campaigns 
  uint 
  {title: (string-utf8 100), creator: principal, goal: uint, raised: uint, deadline: uint}
)

(define-map contributions {campaign-id: uint, contributor: principal} uint)

;; Create a campaign (0.1 STX fee)
(define-public (create-campaign (title (string-utf8 100)) (goal uint) (duration uint))
  (let ((id (+ (var-get campaign-count) u1)))
    (try! (stx-transfer? u100000 tx-sender 'SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY))
    (map-set campaigns id {
      title: title,
      creator: tx-sender,
      goal: goal,
      raised: u0,
      deadline: (+ block-height duration)
    })
    (var-set campaign-count id)
    (ok id)
  )
)

;; Contribute to a campaign
(define-public (contribute (campaign-id uint) (amount uint))
  (let ((campaign (unwrap! (map-get? campaigns campaign-id) (err u1))))
    (asserts! (< block-height (get deadline campaign)) (err u2))
    (try! (stx-transfer? amount tx-sender (get creator campaign)))
    (map-set campaigns campaign-id (merge campaign {raised: (+ (get raised campaign) amount)}))
    (map-set contributions {campaign-id: campaign-id, contributor: tx-sender} 
      (+ (default-to u0 (map-get? contributions {campaign-id: campaign-id, contributor: tx-sender})) amount))
    (ok amount)
  )
)

;; Read-only functions
(define-read-only (get-campaign (id uint))
  (map-get? campaigns id)
)

(define-read-only (get-contribution (campaign-id uint) (contributor principal))
  (default-to u0 (map-get? contributions {campaign-id: campaign-id, contributor: contributor}))
)

(define-read-only (get-campaign-count)
  (var-get campaign-count)
)

;; ===== CAMPAIGN MANAGEMENT =====

;; Check if campaign reached goal
(define-read-only (is-goal-reached (campaign-id uint))
  (match (map-get? campaigns campaign-id)
    campaign (>= (get raised campaign) (get goal campaign))
    false))

;; Check if campaign is still active
(define-read-only (is-campaign-active (campaign-id uint))
  (match (map-get? campaigns campaign-id)
    campaign (< block-height (get deadline campaign))
    false))

;; Get funding progress as percentage (0-100)
(define-read-only (get-funding-progress (campaign-id uint))
  (match (map-get? campaigns campaign-id)
    campaign 
    (let ((raised (get raised campaign))
          (goal (get goal campaign)))
      (if (is-eq goal u0) 
        u0 
        (/ (* raised u100) goal)))
    u0))

;; Get time remaining in blocks
(define-read-only (get-time-remaining (campaign-id uint))
  (match (map-get? campaigns campaign-id)
    campaign 
    (let ((deadline (get deadline campaign)))
      (if (> deadline block-height)
        (- deadline block-height)
        u0))
    u0))
