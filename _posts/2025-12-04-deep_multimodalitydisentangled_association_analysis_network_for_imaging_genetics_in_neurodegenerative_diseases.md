---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQHZJ4HK%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCH3QJD2E6HPfSV7ofKXddJ%2F0KwiutmhNkjMtTehHBRzECIQDPayU%2BHQswZplAFKAgOAK5M%2Fium%2F54lrQVtDfr7WRVASqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMF8DenRp%2FyNnWg2H0KtwDGc8kFCG15vwBIn%2FVYlni6IdL6IFVkXe0EvwjaNuPcXfeAp9HGLxUPl05JJodo2xsMvgxWB2dqOLkebkoX9x0UCHfNVcoVGs2oxtDX9E1ZCeksGj6nLIhrwP9B5hUopn3hc5trRJdm91Rku09ugTo4qhDUeWdkw2IB7WWTJyB9DNrPcVSCj7Prl7%2B2AMhFGRMxuKsKTQnlb3wuLqRTzm6lku18mps4xteaxroJMgDWZLcdTFvVX0LCWTfp0pN7%2BrbvdP8WTr70Qckxj%2BULYhHjSPO1NufUqrfq9kwJag2FZA0Ls1ltfTf%2BJxjAEPUJbQIiq9bOnU8CbPF6ADzc1aPWgS0cEkMe1OajGvQFWT6p0o90ugmzV2lTlqHO2pKeX5fcighY8UCEcqPapqFPCplYHoNWCW3aYTQjQxiCg4tRuLp4T1Eq1MAktkyWAnM6TtkhrNY4NaHqyXlYGgnnH3JZRSnpoBvnPWmM3GDgaxA89%2FUGS%2FAP8wzkViPvo0SLHAV0G45PJtrBkTE65eiNa7wKO10MRWfOEcp62tp9VaRIszyNe38S0G2Cg0qKB%2BDPkXdF2T4SogXjbtx7QOMQOZg%2Bvqt3IJ%2FTTsPxu4CRUEV70FuYB1U67EEc%2FyyUTgwitq2zwY6pgGsdD5%2BGFMF8IYU9Tmd1HbWMsvL0eY1RK%2BTAaKyjZpiHpAhNezGXOfwBXmioJL9obTqbE0QFCL9Du9ajv1nI2F1zdDmGxmGmGkwBnxq4Kb0twGuyE0RFia0DuQq4924hqGBpWQuyW8drRttOpXHefxlUXxockMEIo1YqAJQcB28EgSr5w5hiWj1peG01n7yGvo9lbZxACCCvl5K1GajEwkFND6Voytr&X-Amz-Signature=9791798bca5d7c503a91842c32f5dbbc380386a0ce944ca5c9645b93c3f1e4b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQHZJ4HK%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCH3QJD2E6HPfSV7ofKXddJ%2F0KwiutmhNkjMtTehHBRzECIQDPayU%2BHQswZplAFKAgOAK5M%2Fium%2F54lrQVtDfr7WRVASqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMF8DenRp%2FyNnWg2H0KtwDGc8kFCG15vwBIn%2FVYlni6IdL6IFVkXe0EvwjaNuPcXfeAp9HGLxUPl05JJodo2xsMvgxWB2dqOLkebkoX9x0UCHfNVcoVGs2oxtDX9E1ZCeksGj6nLIhrwP9B5hUopn3hc5trRJdm91Rku09ugTo4qhDUeWdkw2IB7WWTJyB9DNrPcVSCj7Prl7%2B2AMhFGRMxuKsKTQnlb3wuLqRTzm6lku18mps4xteaxroJMgDWZLcdTFvVX0LCWTfp0pN7%2BrbvdP8WTr70Qckxj%2BULYhHjSPO1NufUqrfq9kwJag2FZA0Ls1ltfTf%2BJxjAEPUJbQIiq9bOnU8CbPF6ADzc1aPWgS0cEkMe1OajGvQFWT6p0o90ugmzV2lTlqHO2pKeX5fcighY8UCEcqPapqFPCplYHoNWCW3aYTQjQxiCg4tRuLp4T1Eq1MAktkyWAnM6TtkhrNY4NaHqyXlYGgnnH3JZRSnpoBvnPWmM3GDgaxA89%2FUGS%2FAP8wzkViPvo0SLHAV0G45PJtrBkTE65eiNa7wKO10MRWfOEcp62tp9VaRIszyNe38S0G2Cg0qKB%2BDPkXdF2T4SogXjbtx7QOMQOZg%2Bvqt3IJ%2FTTsPxu4CRUEV70FuYB1U67EEc%2FyyUTgwitq2zwY6pgGsdD5%2BGFMF8IYU9Tmd1HbWMsvL0eY1RK%2BTAaKyjZpiHpAhNezGXOfwBXmioJL9obTqbE0QFCL9Du9ajv1nI2F1zdDmGxmGmGkwBnxq4Kb0twGuyE0RFia0DuQq4924hqGBpWQuyW8drRttOpXHefxlUXxockMEIo1YqAJQcB28EgSr5w5hiWj1peG01n7yGvo9lbZxACCCvl5K1GajEwkFND6Voytr&X-Amz-Signature=9791798bca5d7c503a91842c32f5dbbc380386a0ce944ca5c9645b93c3f1e4b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNKRJMR2%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDCYItqfc6DgFBWwDfALYt0ttibvRJ472TPIJbVIHtClgIhANF%2BtpCrWK0NBWg6UB6pDfc6eGpNltRBZrdopyof6TDuKogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwC%2FdRaW5GYOUYiqVEq3APVy0go0x5O8vbDEkeHwnWcKYNSwZY3NJ1Bx9XLmPD6LJWiyvMH%2Bjg0ksHMUSZ4rgtoAklbT%2FV42EOOwkA8OitNFWie8nqAg0Y%2BYVpDouia5WZqINZq4OeB4YHPK%2FVJMRSsK%2Bi1IHQZ9coflPHmjvJAFoE9B8l46T08bznxXuKiVfVpFgazw1qPdzddVawo%2FZI0YJUhXO%2F7grepU1grXTxzAxlJj%2FfvxtVXBVx5XQJraZEfsOkI760AAHiO%2B1nupsAKyV2LJSQBuPj01hs43e6a1oaHABeToFmm8WYXe7V%2FvllTzb9guO0w5yUPto3x3DUUnMDkbdWisiYbH0vwS0Ot9TYjzsF4PqgRM6d0JCGTosKvNfeH7ngJaks3CSbpP%2Br4PW5abH%2F%2BZtsZu8q4xT7%2FE%2FXAMLeZGH%2BOECEESetVeBxYmoDrxnd6xo9hAymDVYSw3oDjU3lLdwIr%2FQ4rzlzEUkFucMMa4ebdiRQ%2BuHhNiBiNGefeRhRA%2FapzFjVBxLgY13uivFRPrdjdKgdRNZ%2FQnlEBcER14OazeiS7coHPC1udixiTqpPB9A%2FaLT37uDo%2Foz%2FmEP6%2F0KL9MyZlt1qKN19npB9SlSRGTB6xVlLGK48R%2FBc%2BHVEcRyvPmDDV67bPBjqkAenawLTvKJ4S4hKJc9wzDnOWowYU7uobHKwB7D%2BqWfSMgXhQ67DRdS9ff4lkK%2FSh7bJWtUDozo4lTM6EBf06ZvqCwbB%2FTC88s1KQ2V0T9yX56prcIAV4buPXjmrb%2FcCGA2b9TsozBG%2BBTAd%2BMI9JNdTRErG3M9M7TiTgE2BVJeNMB1%2BHgxfbDKNpZtI%2B396utlji43x4AN2lAjLAXBewxUbKzcKt&X-Amz-Signature=95216ac2cdf4ce2721d5195476fc1f231b6226c4771e01b3d80efeac90c79e30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTNJTB6S%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXL9NzlxuPxP03%2BRgIb81a%2BI9s1E8OGo%2FWxruYFRxq5wIgFGSIDkSSyOz4pL7G8Qcl9%2B1hN671FtjiCs5OSgWWoCcqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDICyzieuBK6dgR2BryrcAzY9oXK%2F%2FZtlKVB2HfmlLukMMBQdE9G1%2FjfmEuvxkiOnIPFpTtKmQXOvk8KC2DO5xZwoLq991pf4X8qbNP4B0A0%2BnNzJv%2F6fzu8cHbO%2FJYbo88tfhrzPREvMBAsmZGx2%2Fp6om3qpZLBqIsVqKxwmlLaNkoXC397ZZ3jiyeoHLvGxHCob3%2BWcCn7L%2FkktwMxvucYa5sw6EE6fpNHRdnmeiaNcJuQPT3bYzA8fz7C5mtw%2B67O75kV5wjvw1WpJMpAfrCOtQkwuVEWWoaum8moGshxHxVWSO99L4KeUJdZgxpMI383666WMltOs1mpTJHGxp6pWpbNnVJGA1puvqHXVmjAVwa7Kk48n2mFol0o7irgDjwYEEjraPYpLy9uoq1KabH9sHH0Elpw6C5MbDTPeDkjLSvDU6UgoLEQKyBLMRpiIBM8YjbnKKvVfZlQ%2FKPFT0XMYE5uIXAeXxwiYy83lyVffg%2BDkUvGqzLylT50B%2BWDZ6LJcoHhVpPxcplAASINNEELmFLj6FZIASMKYv8kAGxjF9QzV5ris8UuEvVnhnkaPt6ryr8WkNbZBDOZvbCdK9f3XogPP%2F5b46tl50A5ISVoSBrHd%2FWr%2Fd7SFFsMfUx1FyWwdqeuoUTdkSCjrMJTbts8GOqUBlChOXuJ1oSUqbKyZi3shN4FwjE0QvQnxz13c5ct%2B6zRY3gh5g2RdeEKHc4df%2Fwo1CDuqIuGKvYgCqH9sKGXk54dSWSIWtm75YO7Vb44TeG1ZH1ySpjo69QdUt561rMwGDTn9i6DwNVVuuysCx0NBUtEc%2BWXH9p2F0TrdVzP4yXJ4Kt8%2FCIt77Na%2FGFeBcsnRA97Y553Y1t5hHK0UO870CX2silVn&X-Amz-Signature=83cb2526a72f738f130a88fc836a4ea764ec34ba671278f849b18f5793b35d84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTNJTB6S%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXL9NzlxuPxP03%2BRgIb81a%2BI9s1E8OGo%2FWxruYFRxq5wIgFGSIDkSSyOz4pL7G8Qcl9%2B1hN671FtjiCs5OSgWWoCcqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDICyzieuBK6dgR2BryrcAzY9oXK%2F%2FZtlKVB2HfmlLukMMBQdE9G1%2FjfmEuvxkiOnIPFpTtKmQXOvk8KC2DO5xZwoLq991pf4X8qbNP4B0A0%2BnNzJv%2F6fzu8cHbO%2FJYbo88tfhrzPREvMBAsmZGx2%2Fp6om3qpZLBqIsVqKxwmlLaNkoXC397ZZ3jiyeoHLvGxHCob3%2BWcCn7L%2FkktwMxvucYa5sw6EE6fpNHRdnmeiaNcJuQPT3bYzA8fz7C5mtw%2B67O75kV5wjvw1WpJMpAfrCOtQkwuVEWWoaum8moGshxHxVWSO99L4KeUJdZgxpMI383666WMltOs1mpTJHGxp6pWpbNnVJGA1puvqHXVmjAVwa7Kk48n2mFol0o7irgDjwYEEjraPYpLy9uoq1KabH9sHH0Elpw6C5MbDTPeDkjLSvDU6UgoLEQKyBLMRpiIBM8YjbnKKvVfZlQ%2FKPFT0XMYE5uIXAeXxwiYy83lyVffg%2BDkUvGqzLylT50B%2BWDZ6LJcoHhVpPxcplAASINNEELmFLj6FZIASMKYv8kAGxjF9QzV5ris8UuEvVnhnkaPt6ryr8WkNbZBDOZvbCdK9f3XogPP%2F5b46tl50A5ISVoSBrHd%2FWr%2Fd7SFFsMfUx1FyWwdqeuoUTdkSCjrMJTbts8GOqUBlChOXuJ1oSUqbKyZi3shN4FwjE0QvQnxz13c5ct%2B6zRY3gh5g2RdeEKHc4df%2Fwo1CDuqIuGKvYgCqH9sKGXk54dSWSIWtm75YO7Vb44TeG1ZH1ySpjo69QdUt561rMwGDTn9i6DwNVVuuysCx0NBUtEc%2BWXH9p2F0TrdVzP4yXJ4Kt8%2FCIt77Na%2FGFeBcsnRA97Y553Y1t5hHK0UO870CX2silVn&X-Amz-Signature=f36ebba090afe607fdb8932ada3e3baeb0d55dbfaa1d9eb3c5c762e88893e75e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOHWBVK4%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAQYLgY%2BMtGnjH1p4%2FOSlN9PJpxkgy1e3Gk7Df5EFlOSAiB9ZIq9uIa565Js5tVM98kHiGTeGktedzl7VPy3MKB6ySqIBAip%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTu1MgAMH4X6uJLhwKtwDYw377tagoYvLF0Cl7eX1U0trOzTf1L2O8%2FHkewsnMNz53RNd5PrgxxB9ZIn0COpr1Z8Nfvv7wbpDR%2BxL%2FpbtFJEP8GhDKQFbXWAtsg%2B4UTnP8ijzKmjAs31rIoD3UftBJF0QX4YPLh0E89Sywy9Ug9MUltrknRpVa%2FS4tqT5qY3vS0i6%2FS3En184w5d5rNwJfmhqaYJyPJirPZMiYU9Fww6OVwIPP26NVLQceUhlsl5gAafR0y816ouQ%2Fui20j%2FntBs15jQQcUz0%2FITkPfXOqwrorOBEOoSHzI%2F6FBavYTHtpucQ%2BlIjVETRPij3M3GOfJkQQAZl05pg%2F%2F7Y%2FUp4rtvNxJ76evr1NUlH8YnIXjNfqS0Ey5I8B2B9m7EhuNfTLlr11SoEV7dQEsqwNYxNeqyZDhQR3JwKuKxQPMkAjPU4md7jiv1gu3WzJXTHq0WdxlgCXD3oN8zXehJzHJMTjkbUKziYFKvAToVgcDF0eWviTU48F6BrOOtuibD%2FAXyiPu6TlCMhHuYFnS50F1Q1%2BROH%2Bnf8KB7G7cR5y84iAUw5k6zvOeVZc68YHGW0LsgDR5IUzOFncYL57qwJsMWeYAgYsrKaeEH3OwItkPUiverFD3bOvk3SiW427KMw0pK3zwY6pgF1b6MkOFvJAvOS%2BQWQaANuSK%2FYi5UY2JcbIsSe6p987mEhjMM7CtaqJOs%2F9JuqmmlAOPUrvZS%2B%2FxHNFDjlsAveZXjWZ5hcWMAuKPE7fcDAEIC0fOTiZOA2C6NBrrXLeblPDF%2FzzW0IjdfZyfhbYNA2rPGZOXkmdF%2FrTThbbUtetXk3aLU1D1mLP1u6nfDs8U63Ju8%2FzurTjNzv5WYkr%2BL1WO2WLZzl&X-Amz-Signature=1f20e2866b9e7753b64a8d5c3b917af5b3f56aa7a47bb2d916f4a9be1c9b5f68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HJYH4HG%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEybRCnTgrRCTrfMEwHfngujGQZ7vnd7nY7C1tHq1I2YAiEA1ycyTNLB58aBqKWpjIhZrRqLOWqkx6J2MU37ayLw4%2FYqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIN3Eh%2FM489r%2BW6oxCrcA6qJadfAzq8WtocZk4XJ59UvY%2Bm462hdLapLgvXSSq650ng8L4UHDnqAyushb315QlF2Pvzu86TraEEVhEAhucWey8WT%2BK%2FdOrLwxZtFPibto5gyF3XtimSkhnmil4RXlwD0GEnV2F%2BjD2jdPzx6h2l6GhfpIEDUhlCBRRKF%2FiDhVBta4gZB7%2BQSfG0hsqw7vhm9aJzfLpgNTNaidqahwx8o6q4ldBNDAWTgZ27QpcvNaQWlSteruqh2PEZIqjpuammiw27O0Ezjdv1zVRjvtpace6WRgMRxjZx3UlJIzew42FWvn33Y4B%2FSgbN6HhqzGSkJa4iKRQCm%2Fj%2B49f74kBBs8YnnrnNOL8F0pb53dd3JTAq9Su6lNXQHiH72t4m%2FXGvb5HU1t391b1046S4nB7u1kTKa8MEjBAv1tAUig5pQQiKSanmT%2BXIHjgHJjK6uZ8oJfOFv41awGaNTN9L%2BNWHYz%2BTdInJ%2BcJ4N9aXuP3CGDZSSyS19Fv2JuDlq312VW94DLxhcpZfCVhITQcc4Yfe4UIDmIS6rc9%2FeT4SLkQQqJJMb6gh0Z2G9Z%2FSMn97sozy3DSfpc%2Bogtzy0S9wHVb43c4GXp9PvOkGKz0qmCxRqyPwFyknwZQ%2FreEkaMNLcts8GOqUBehlHFNZziRZbZ%2F1KwlF0ylC0BBAOCZQwKDCX39n4ki5OnMo%2Bzn5kxKOeouDdV4b%2BSIlwysgdh%2FfKaSbN63Abi92qFY3VGe6E6ePf6W1ujlSVNpvfjW1F6gvfQHj22cw54Xzi%2BkVuxmEQGGd1dWuk9egv82A0WPTjKrr9lPdytLN2H5ogjArEBxkLSG1D7rTLbuJNUF8jq3ALSIeOD1nw%2Fha9J%2BtI&X-Amz-Signature=5bc14639c6e9d53d9092342cbbb18a34a0e4886d661aab81e24e7bf43ff6dead&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5LZE5QC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD48T9iDZiRJXXD8yKN1UAX6c9R2QfiZHyUdLGfWzxSCAIhAJAJWtvEDFMZEh%2FWyIJb46M86pHAfidBXW62mvtvH%2FxKKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxE7kyAZSo0nWQ6Ef4q3ANpPBnS5raRcorVMMhKpHhFWAi7hz9BG6k8%2FWhDDiuyu1UpBg3m%2FZg9y2eWj1aF1185tR7sEzn6cE6d3qqAWacLpcM3JirrFNUKBYxbUmx6TrTIKP4T15Nle%2FZSX6Rqexpo4wy%2BU%2Fo1kuzF0Xo8W8SXCoIeIHVo4QjTcNhMSUL0iH%2BwGPOLKfGeSYqohEK5znz%2F0XB%2BMQFuFEqm0cUgw5vycnKiXgKHNEPX5EoHvzRUiHJ7LeLbrDl497D51FMY06zLtJArM4U56bahdKPVO203IUYXaLiwuUZWf5VvypnwNPUaMyaPaNllHIruNnmDI7z2mhBCx6VWDvLKeO%2F2SHHS%2BggHQ%2FxZg07MxnV1F0sXxySK6XJREKkqSy1YrHz0zxYEipmIYTjuZ%2F9U%2BISh3abmk0AACkZh5CFC4U4cJ8cxeVY99ED7gvP%2FeZJhA8xgEAxgdFofGbRO08yWGpKqyWDtTgyMxY6vbAISBK5ZWfp0ZPY%2BBPVngxiMY%2BzR9dg6nFLzvSjZoKMrxZrg7e8sIcLiEsZzOy19oSEisCdiVcBwtIYP1eyHm5ZWBk1Wk2rjcUW28g9fgAOAkVo97uLtqpYQxcpeoIEcrRbopN1IYgKqBCkAzOKzV8HkrusTLTCc27bPBjqkASINs7j0YDq%2Br3%2B0aY9%2BiQ9XdRlBfqhMX85ISs75KM4OjfoqyR5AYjAnUgvqIkD7NAhCbifsXXTRZ7E2pNcoO%2B2e23rC%2B%2FSDJg%2BeT3WKJhN%2FPwrQvW2MQP2XIpcw8Rtolgw168xCtMlorbxEBMhwgXRvUiM75L4CDpV%2Bl5gEXRmtml7yD9L8O0UissjH4QUGeF4Va9R5bCIt3HkfGiq%2BsJLONuvA&X-Amz-Signature=97c7000e7e9daefb4531e5a0995b4b42e57ffa12a8413e5e1055f042a801f615&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GYZJLHW%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID5NoVAG7H9H6XzPJHDNUNGejTaJTA6XBwcgnHMtYqBaAiAc6FHs1wwKhswPA5%2F2YNAUSDQ4jLY0Q9kn8tslg1JUwSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMc2dnoWRaj0D8Vet6KtwDWP2vYPCstaXDZj9GTdwRj%2BbSGfYcnBoII8P7pbgQ70lvpdUOntq1nff8zK4fvb9kFFBekCxH0IgnWNExrwdpX68u9klxf0FG6X5vDE96x7ja15A1svkvbzcQ6y5PWeUxRO2%2F1pPEUkdXtaw1%2FTlGvdBmfLnq7griXsQE1iJ%2FToW5yO4nHREFCKTOfQoTQbOjl2w9BY453BHd4TPYWYfm1iu2OIPF%2BzvwtzvdAnwzccJ88HFrAuvEj5OnbJoRDLwF8drXge93Pq6ipusKguq96lBriTsl2wmourHPZchl4hRG05J8DcmlnrLWpIkEO%2FVraSw2PSLTR%2BYBhSNuQzXOotl5ib8BSSTxZ%2FnJDnuKpzLSNY2ETdXqUgAwNxRrY8fAcpWYpDmp8CZ7xWnddhUP1zK6e%2F55JidtGTactJTD7DXiOlHExz%2Bwgs7zv5s%2BAzlYRAqIQVq1TWKi%2BXAVeU9PDejWX1kvHvygRY21yLqoGNFkBiM44isxDL9g%2BSjCD9sNkK3G9O%2FIbp3am2AMdF%2FwDHVRYz%2FOA7fzdGXARYV9ciZTIeEdsYZV%2B10snnI1i4X4mEFggAW6s%2BaSz4Jv9%2FrS5ymoETRGqUzeBxuyPnVRtbUsPPhlI%2BGrNWxJ3SYwh9u2zwY6pgHek7J3MWPyF0gCOBTmOmURTCmGw6o%2FYJweqmAkGU6grc%2FnMnej2Uqd24rgypy8VQOV2qbDS1QO0KKIDP%2BQt%2FewnmVkXTLGGAnZmbY7Ri87%2Fa1CqF76oPY5g6UHwsU5FdjO%2FmbfbelIZ2qaJWqt9gttSkauXo5aswRPvRmeFk0fc4Zb9fG0u5lndJ8dccDeLlyztV1FuXy4OaM1Lu3jrHJax2uGM49E&X-Amz-Signature=00544305c33898f0752de4a9f404f13a3ad0faa98cfa1959b1e4c7e6a1019038&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GYZJLHW%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID5NoVAG7H9H6XzPJHDNUNGejTaJTA6XBwcgnHMtYqBaAiAc6FHs1wwKhswPA5%2F2YNAUSDQ4jLY0Q9kn8tslg1JUwSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMc2dnoWRaj0D8Vet6KtwDWP2vYPCstaXDZj9GTdwRj%2BbSGfYcnBoII8P7pbgQ70lvpdUOntq1nff8zK4fvb9kFFBekCxH0IgnWNExrwdpX68u9klxf0FG6X5vDE96x7ja15A1svkvbzcQ6y5PWeUxRO2%2F1pPEUkdXtaw1%2FTlGvdBmfLnq7griXsQE1iJ%2FToW5yO4nHREFCKTOfQoTQbOjl2w9BY453BHd4TPYWYfm1iu2OIPF%2BzvwtzvdAnwzccJ88HFrAuvEj5OnbJoRDLwF8drXge93Pq6ipusKguq96lBriTsl2wmourHPZchl4hRG05J8DcmlnrLWpIkEO%2FVraSw2PSLTR%2BYBhSNuQzXOotl5ib8BSSTxZ%2FnJDnuKpzLSNY2ETdXqUgAwNxRrY8fAcpWYpDmp8CZ7xWnddhUP1zK6e%2F55JidtGTactJTD7DXiOlHExz%2Bwgs7zv5s%2BAzlYRAqIQVq1TWKi%2BXAVeU9PDejWX1kvHvygRY21yLqoGNFkBiM44isxDL9g%2BSjCD9sNkK3G9O%2FIbp3am2AMdF%2FwDHVRYz%2FOA7fzdGXARYV9ciZTIeEdsYZV%2B10snnI1i4X4mEFggAW6s%2BaSz4Jv9%2FrS5ymoETRGqUzeBxuyPnVRtbUsPPhlI%2BGrNWxJ3SYwh9u2zwY6pgHek7J3MWPyF0gCOBTmOmURTCmGw6o%2FYJweqmAkGU6grc%2FnMnej2Uqd24rgypy8VQOV2qbDS1QO0KKIDP%2BQt%2FewnmVkXTLGGAnZmbY7Ri87%2Fa1CqF76oPY5g6UHwsU5FdjO%2FmbfbelIZ2qaJWqt9gttSkauXo5aswRPvRmeFk0fc4Zb9fG0u5lndJ8dccDeLlyztV1FuXy4OaM1Lu3jrHJax2uGM49E&X-Amz-Signature=4a934dea3ef1433e5c04a3ffc4e62df664d74b0409a517cee8c1b13e74f1c1b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWNPE5UP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQdyQs1qST4rxtPIbZtuzaka4uZZcYat%2F4QrLtCHE94wIgJLOMlQ%2B2YkmWwGThIjRobYL1xfV0QqCRNAY5FvkOxRwqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAbWvqL3CPzziS%2B9ByrcAxLt3cQhyyTJVsb%2FSZfEO%2FUqleT%2FGQQ%2FIfbQtvie4lYAglhEutDrgWv13OU7Oca3YujEEAwgr1sZgGszAoy%2FB%2BMTiKWJKEX9GL03t9gY4GZZmsCzvRChJTadnpm6JXxFMWEPhMK06daP6EyGFP0QDVakDKlZrxBQcKALAtEvH6xLjV7bVxvNoABcvOlWGLElz8E7RlU1E0xMR4e2WNyraUdGA9BcY7JXqOEKHTrqKIfvyBtDZqOaAx7uECcG%2F84wi%2FwLpyccUFUNmip90L2uDM0iYEiluwQxej8UCx2wMQZtCA1FX4EjU1y2Vg4RVNFuRJ11uGdoya5DITml%2F9301dp1vxd%2FwGCJf6%2Fqe9jK662xyDWmItudqmaRq%2Fp9OHDvEI%2FdxoznYpH0l%2FPpwoy59FKwfec7Hc3kQss1QSkQusfk3f0AF8%2F1T0z8e3RymNunx1Ml0qtMBVF%2FfEHDrPKxaF7xwclCAcyT5loPLL7dBD7mk3nnfRuRd1zEcXY3JwFa6yT2SdHjsv8oKwOuRDMfzTfJKtenXcqmHgYsYw665LRJAIHdS06P0omvZ3g44r3swcPmek6rZGiftI2gvkEx2bIWp20n0zuvPNjT4jCRTivm5lgknavktU560ZP7MNXbts8GOqUBpHaciPmFhqAld%2BGEsf%2FtMbZ9HO2fxPjZgi6p8cH2xdikQjyINt1x%2FiWSB3RKPTZghfPv14uQZ0KmnntNFvL4gGKR%2BPO0XApcLiXDcB8%2BP5huPM5ai06XnQxCgCaFqJuEoMNTNbzF9NGrUXJOJTlqHte7fiBE3ojjAwEcKRuk7trUC7KksDoFc4MSnevGL7%2BW9QGiCfWP0kEi%2FiFhX5FBVoZ14SS6&X-Amz-Signature=e7360aa8f74543ad129dac3b6bb4414b920e5157a2b233092a9572542e0fedc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNT52AYV%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDjxbvUnW%2F2NlVLkCO2RT%2FKBU%2FepJCJScyeEihV8%2BC2%2FAiBcAdZLhUEXxZPFQSbtmmodtvLzg9cBQ3WjoFakWibyESqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbWiDYsIwLGiicmD%2FKtwDNqjuJbiRZh3b1UVM8q4bJIFaHC2sa97XV9r8oUfLmXKigWHi%2FpHc%2FaCHeLM20LDvvhLORd%2B6Zh7ZAy9bhTdyC32VtVySBYkUf0arS%2FTbgYXhmadx%2BhaT7RjU9ImmdpcLKBOB8KBTrzKy7sgL%2Ba4iRUG54inpFS6uBuqeBYdosN5bNf1KVVNWcWhCLtqv4WCg41ppfjNCeE29Um2%2Bh3v2jj%2Fjjn00xIjFMwv3R0VGysIObrILXEtWpj7Tul2RoyNLjKTm9PyLRRBCk2ALpk9TR2878EluukLCz9dKyIgv4OX22tG0mG5veXMvZaPyDWxDKIW3i1UddJkCf5g6DFS2W5HF3UHs9JpJwR7ks9yvbUi0Ao5HHqv4Qu39nyV%2F64F3SLwlgPm1aRipT7AnMfW404C8N8sjXIwlUy8SCvRkmINvRca3Ak1yLRqMNcQjnr%2BOCXMaLp%2FdoRZxsCfPWCJQBkYSm59GyC4qCWRLd2DKVaJlEz9VX7VdVzRp90qbwGhOn9m%2BEc7v8Y71csf9OEK7NS%2BaNtGRz2%2Bjzk7pRStJsva%2FaFNv8tM1UJDikTz5hB6Z9GPDsW7hNefWQaEZEW4lsb%2BYs9xZ4g5fuwk46GQ3RLHSlpAcGB0LXu4XLcsw6du2zwY6pgFnOdhEkf1dZwA5%2FJQexObVWWn776golZlO78fld8a8vTR5zapXZVC5D6fqN1l8yUe38KufsK9djxN2RDytHJ1wkglWWZpUw3jGtummd0nlvbG3qpOqv5ff%2B73ofB55czdp2o3Rm3wpx4VEnKt2gIrbURICiv0%2FN7Ik9DoGUVBTyWRDbjk4TB1I6HPrbO8JoSQ09sE4%2BJb5g39ROUrxeKL5Fu6bxNSH&X-Amz-Signature=22ff13846d3bdf75743f08738380cd0060069fac0ed96e2f41f5b3ad4c04b74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNT52AYV%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDjxbvUnW%2F2NlVLkCO2RT%2FKBU%2FepJCJScyeEihV8%2BC2%2FAiBcAdZLhUEXxZPFQSbtmmodtvLzg9cBQ3WjoFakWibyESqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbWiDYsIwLGiicmD%2FKtwDNqjuJbiRZh3b1UVM8q4bJIFaHC2sa97XV9r8oUfLmXKigWHi%2FpHc%2FaCHeLM20LDvvhLORd%2B6Zh7ZAy9bhTdyC32VtVySBYkUf0arS%2FTbgYXhmadx%2BhaT7RjU9ImmdpcLKBOB8KBTrzKy7sgL%2Ba4iRUG54inpFS6uBuqeBYdosN5bNf1KVVNWcWhCLtqv4WCg41ppfjNCeE29Um2%2Bh3v2jj%2Fjjn00xIjFMwv3R0VGysIObrILXEtWpj7Tul2RoyNLjKTm9PyLRRBCk2ALpk9TR2878EluukLCz9dKyIgv4OX22tG0mG5veXMvZaPyDWxDKIW3i1UddJkCf5g6DFS2W5HF3UHs9JpJwR7ks9yvbUi0Ao5HHqv4Qu39nyV%2F64F3SLwlgPm1aRipT7AnMfW404C8N8sjXIwlUy8SCvRkmINvRca3Ak1yLRqMNcQjnr%2BOCXMaLp%2FdoRZxsCfPWCJQBkYSm59GyC4qCWRLd2DKVaJlEz9VX7VdVzRp90qbwGhOn9m%2BEc7v8Y71csf9OEK7NS%2BaNtGRz2%2Bjzk7pRStJsva%2FaFNv8tM1UJDikTz5hB6Z9GPDsW7hNefWQaEZEW4lsb%2BYs9xZ4g5fuwk46GQ3RLHSlpAcGB0LXu4XLcsw6du2zwY6pgFnOdhEkf1dZwA5%2FJQexObVWWn776golZlO78fld8a8vTR5zapXZVC5D6fqN1l8yUe38KufsK9djxN2RDytHJ1wkglWWZpUw3jGtummd0nlvbG3qpOqv5ff%2B73ofB55czdp2o3Rm3wpx4VEnKt2gIrbURICiv0%2FN7Ik9DoGUVBTyWRDbjk4TB1I6HPrbO8JoSQ09sE4%2BJb5g39ROUrxeKL5Fu6bxNSH&X-Amz-Signature=22ff13846d3bdf75743f08738380cd0060069fac0ed96e2f41f5b3ad4c04b74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZ7I6V6U%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T103314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCtZqLO4YSplVgMmGGXR7Z4CwIDXXdxv%2BU1sp7wva8xLQIgIctuQ1CZC1JyzW9koNKIjJkWvdgwiKuj4eSFfYEb6pgqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHBW1ZrFrV%2BffDYTCrcA%2FBAzNlXOXgcbxll3TIwHBFCmDcqN41jpQIp4dtMx4kza%2Ffay%2FMELMKoKiHan9IpR7iEm8E38j4BhleLx82xr5176%2BM2HuzjFjs%2FQbmRpmvezSMP4OO5hwgY1lfcWs%2B1wbV7OZ0ITncnF6d4gO7qcQmg3erk9KjlYLveE8ya24e5d5rOr8Z%2Bbj29kJC0W4buqVREJp8aHDln0vJ0lMK2%2B8IhiwhZZgcYCWxw4GKoUWGUULlKCXoF8BeaRZVc4eVgPPdFgrowlwGcct66beKG4Ertc%2BHLve8SNtVB%2FmdF8nCwKGQFgZyH8PHrmKtGXI9ArGtdvzPjEdDkE0piNilagRGLo9ZN5VtxfQN2XZwPUu1LqO2ZEcoRMpXayh2RMbDXTWp9N2hMocwiMm9LQcoHyqTIW16ODx4v9%2F7DKXbTiCNDB9e2ARTaFp7YJyqWEYXc0J3Yo4dXe3uy8vowAt2kb7GvksgBzvOOp33B70AS8EFMGE%2BVhYR1wE6c7fwV8TZJOmqM4x4mVwFZK6pZkGW13tOFpgYDCfP1l8OMs4bL1jlCi6RMcFdMj%2FQIdJ9TEgdLiwxK1h17ZHt1aeo%2B5MhSo%2B56OYl%2BaEZkvhRzRRgkpQadedmOXpaFKDaFlGW1MODats8GOqUBWFbTr9L%2BIVrvqWt4vb%2Fh1YXFcgQdjwQLTDdNr6uBxA%2BtUUZsVTReq1QGwvmKqEOBo%2BlZPYWloZNadp1TEVtb3rd7IJOSlqHrUKsHUNfJ9bEMheAshTs7dNQ8sG15ZZ%2ByQo0K16dqUot7tJlFHU0MPoZvKoQM6dt3W38AM%2F2ryErxPV8gRR31zh37Wu2TznzqGLu6MkhDa7upIANLLtcP7Vi1ik9x&X-Amz-Signature=9768bd904e5505de9e6bf648cfc7e9b3f25a2f1e107bb68008a9f91cda41a439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

