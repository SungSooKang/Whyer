class WhyersController < ApplicationController
  def index
    @whyers = Whyer.all
    render component: 'Whyers', props: { whyers: @whyers }
  end

  def create
    @whyer = Whyer.new(whyer_params)
    respond_to do |format|
      format.json do
        if @whyer.save
          render :json => @whyer
        else
          render :json => { :errors => @whyer.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @whyer = Whyer.find(params[:id])
    respond_to do |format|
      format.json do
        if @whyer.update(whyer_params)
          render :json => @whyer
        else
          render :json => { :errors => @whyer.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    Whyer.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private

  def whyer
    params.require(:whyer).permit(:name, :email, :manager)
  end
end
