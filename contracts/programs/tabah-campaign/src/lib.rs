use anchor_lang::prelude::*;

declare_id!("TABAHc111111111111111111111111111111111111");

#[program]
pub mod tabah_campaign {
    use super::*;

    pub fn create_campaign(
        ctx: Context<CreateCampaign>,
        disaster_type: String,
        severity: u8,
        location_province: String,
        location_regency: String,
        target_amount: u64,
        children_affected: u32,
        total_affected: u32,
        confidence_score: f64,
        attestation_hash: String,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let clock = Clock::get()?;

        campaign.authority = ctx.accounts.authority.key();
        campaign.disaster_type = disaster_type;
        campaign.severity = severity;
        campaign.location_province = location_province;
        campaign.location_regency = location_regency;
        campaign.target_amount = target_amount;
        campaign.tier1_allocation = 60;
        campaign.tier2_allocation = 40;
        campaign.children_affected = children_affected;
        campaign.total_affected = total_affected;
        campaign.confidence_score = confidence_score;
        campaign.attestation_hash = attestation_hash;
        campaign.active = true;
        campaign.created_at = clock.unix_timestamp;
        campaign.collected_amount = 0;

        Ok(())
    }

    pub fn close_campaign(ctx: Context<CloseCampaign>) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.active = false;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Campaign {
    pub authority: Pubkey,
    #[max_len(50)]
    pub disaster_type: String,
    pub severity: u8,
    #[max_len(100)]
    pub location_province: String,
    #[max_len(100)]
    pub location_regency: String,
    pub target_amount: u64,
    pub tier1_allocation: u8,
    pub tier2_allocation: u8,
    pub children_affected: u32,
    pub total_affected: u32,
    pub confidence_score: f64,
    #[max_len(100)]
    pub attestation_hash: String,
    pub active: bool,
    pub created_at: i64,
    pub collected_amount: u64,
}

#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Campaign::INIT_SPACE,
        seeds = [b"campaign", clock.slot.to_le_bytes().as_ref()],
        bump
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CloseCampaign<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    pub authority: Signer<'info>,
}
