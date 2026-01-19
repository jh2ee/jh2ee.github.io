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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2252NFT%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCFAyn%2FESCIey%2FQanPwNHZ7xEXe36JssyB7dJs3V1PdXgIgPh1WzgC0%2B9IF3yJcHWvQSjzRpnauOEIafYD1yMvz1foqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB2k3saE%2F7%2B%2F00VnMCrcAyIqDn7E3dborx5CVUY8d0cKhxSDmuJXtnNYxGHyN6R8zEl5COV0B%2FZrWR%2Bau57gfX1Wp8GGwnxPoWoc3ci6UoxSkh9X2DW1i7gpPEwhjCCkrDkVQJDcYrXkJ8vtfM3secS%2B8JtZn36ySxTqFalKgr%2BQCSTuNo9iNGOZ5Hfm7xDPCbfoHklw71SWvwUFw3oq7LhuwMqmCA3hl51eNa0BjyHk0hA4Z3GtQJSpdz0hn8f6SKVvxCbAzSma8i2cDFQwUMyubZwKtn%2BiRxXQOR8CYWYXHS40xTGpGIoBuRFru7ifpqtkkZAbp%2BsFM99OMVuU9g6rBTUJZqeh6gpURpQe4tH4Jr7UbvbXgwc%2BSUsWGOvOpD1mR04r8RVeypJUzuic1Z7pfONEJ4cyrmSRJRALMaRt%2BowBPfoEc1TDK0p6nCEX9w%2FTS21NZrxkRKaDI8eCZoUY1qN%2F8mepvG6ZfmaPly6cBTtYQDOOXXB3DgORnO1DrRj5Xk5KW2JGSl1E8QBr8oxuAipvHUv6wygVBTd8owPPLVyvPyrbyqzJfqNv9Votq2HzGS0VEIKmvFf%2BBm8JLbQzuMVXEn0SwR7Ndii9VNj0F8gYqK4K%2FK0mRthJypRmTZklfvx%2BvyNWGGYjMJjGtcsGOqUBxgZDfEX9OBlbyMzGl2sOmZ1Bjvzbfg7Rh8jAktD05gM39kb%2BPQ6zYzPTkXf213CXgxg4YMb0XwvXfCF%2Bn%2BdIYpsQ1oxRQ%2FtuMII13pUKUGyJ0KGPFDDt%2F2Gh9NQZlEhyoOfgpv7JkXfneyBcpfl%2BPsDo%2Bm2cVf%2Fuxw5jEDdNYnNEeRkWpI6qJncxZG3mcL0Q2GMw%2Bbh4w4PeT0kYm693Eck0ooVq&X-Amz-Signature=81153c8f2bf62c7c49714d873f4618e37740100a86144638d6c5291bf941d412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2252NFT%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCFAyn%2FESCIey%2FQanPwNHZ7xEXe36JssyB7dJs3V1PdXgIgPh1WzgC0%2B9IF3yJcHWvQSjzRpnauOEIafYD1yMvz1foqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB2k3saE%2F7%2B%2F00VnMCrcAyIqDn7E3dborx5CVUY8d0cKhxSDmuJXtnNYxGHyN6R8zEl5COV0B%2FZrWR%2Bau57gfX1Wp8GGwnxPoWoc3ci6UoxSkh9X2DW1i7gpPEwhjCCkrDkVQJDcYrXkJ8vtfM3secS%2B8JtZn36ySxTqFalKgr%2BQCSTuNo9iNGOZ5Hfm7xDPCbfoHklw71SWvwUFw3oq7LhuwMqmCA3hl51eNa0BjyHk0hA4Z3GtQJSpdz0hn8f6SKVvxCbAzSma8i2cDFQwUMyubZwKtn%2BiRxXQOR8CYWYXHS40xTGpGIoBuRFru7ifpqtkkZAbp%2BsFM99OMVuU9g6rBTUJZqeh6gpURpQe4tH4Jr7UbvbXgwc%2BSUsWGOvOpD1mR04r8RVeypJUzuic1Z7pfONEJ4cyrmSRJRALMaRt%2BowBPfoEc1TDK0p6nCEX9w%2FTS21NZrxkRKaDI8eCZoUY1qN%2F8mepvG6ZfmaPly6cBTtYQDOOXXB3DgORnO1DrRj5Xk5KW2JGSl1E8QBr8oxuAipvHUv6wygVBTd8owPPLVyvPyrbyqzJfqNv9Votq2HzGS0VEIKmvFf%2BBm8JLbQzuMVXEn0SwR7Ndii9VNj0F8gYqK4K%2FK0mRthJypRmTZklfvx%2BvyNWGGYjMJjGtcsGOqUBxgZDfEX9OBlbyMzGl2sOmZ1Bjvzbfg7Rh8jAktD05gM39kb%2BPQ6zYzPTkXf213CXgxg4YMb0XwvXfCF%2Bn%2BdIYpsQ1oxRQ%2FtuMII13pUKUGyJ0KGPFDDt%2F2Gh9NQZlEhyoOfgpv7JkXfneyBcpfl%2BPsDo%2Bm2cVf%2Fuxw5jEDdNYnNEeRkWpI6qJncxZG3mcL0Q2GMw%2Bbh4w4PeT0kYm693Eck0ooVq&X-Amz-Signature=81153c8f2bf62c7c49714d873f4618e37740100a86144638d6c5291bf941d412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RT5JX6AP%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2B6KjlW5A01zNOpBOTFDTPkqrFDcESTUnBDYSVulM7OgIhAJhFc1ZvFC9FoBq31Dy6X9wL6Vp3zmtzhmP8vO9Ws9iwKogECIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxKbEE8x4PbVKoT94gq3AO43ETo2DAcP8VJK4%2FT53h16gq2vk%2FSmrwVP56GwjUxiMnlRTG9ITjy7R2O9qBriAQNWIJ2gDIGmswdavBMivCq0TS%2FKF7DuFlsqJYdFzRsLrWCbf9w8oLYuFgP%2Fj5xNofVfLzAG04I17WDdmbqw3pTQAwY%2FBiTMNe6alqzLJaf5S0XWGy4iEzJgzPX6nG6mpyc7a4ytJEn%2FmkTjheYlRnEQgX0hPb04eDoSMofNxwt3iIviiqsr4qC2eLY4CVlpbd%2BCsm9KdiFbIUm2KJeVFig7HKTOeoR09uPmB2uaQt2zZX0E1xrGL5jzsFyLgBG3UMj%2FpVLFrnUUF%2FFRHUcjQNu6oF1pmy2J4%2B6KR4hvvrk2%2FEDGRrfvkzeNVdnKKc6LAv8rolNdkZ0QQ%2FkVTKHMycPadCg%2FiG9csAAPXPC5FMK5icNNqYcA9EofvfbjmY6bsO09gAZlFWcrGZLErCVnJUqfpO2gidkBTETkEpSYtTdj%2FM%2Balehj%2Blbk4RoeTvcNGQ7E1GKJH31KERobhJr5wgm8Mny5b71Ktjr0kqMGMdSX68H8RV02e7945TUDv3qwi9A5sJKI6Ti7fVjHgzMR3X7DT9cfOgc%2BO61AqwfpXoDqtoXk1QD%2BqPv2fQa4TDjxLXLBjqkAewaKSLR8a0jx%2BLrx1DYtYErUkUxGesxs07gIjlTftHGMg9Bzv3DIiz8vfk%2F2bjFEnbvm2wLkWw5%2BxQYN9iaXOysQJMeJYZAlB%2FwcdcJuy8SGHWWYX5heoogqb0g7AEojHAg6bqfdfP%2FiXSLYo4IMcRxJP6Vmb8xqw5Ej4jc%2Bb7rrmvB4LVcLAHI5JQFf899Wrs7Dr9BWCyYKwK8boGuErCsYkN%2F&X-Amz-Signature=ced7c4ac990c9e8b8fc3f10aac8b0474726b87bf0f0d8a2d443843c47513bdb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCSOSDUB%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIECwlXlZ0KS5ew1MktqaOxX6CnqL9Oz35BawZ98LPdumAiBI5KBEb5S3ChPpl4FPkMfiCuRTofzaIqL3jLJ9Xe7%2BfyqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlJx9NAjggrZzD96OKtwDhU0cFc3l4YX7kfEnvXPgnQuHY58onb%2FznBGEG%2FnS4WkyyhFMXV3T88VoMvwgDKIUL%2FMXeNuhsD4u3vzRUr13ANC2sEySLIlAdCj6IN4KwBZD1zIrCau7mtvNgC%2Bz%2FndtlTJxxq9aZIe8dt2bTdODBYFgdjiSk5hfVfRzf3bEU5K1t5NOsTw5DwAyUrx67bv7VTUtS94HQpdgwIWLwMvKLcP40Atn9lmRFkfjLpXsJ0l8D8VkvjwU7WhGgQA%2FvtSbh%2FNIwLCyW%2BaX%2BWEU%2BPOp5ysdzblnCiYkRn2EPPM%2Bttwxj4BVs%2BSovBIXHKX8q6MxC5CewhAAbsc6gzKr3iKtKpitc8ZLe8hjh6RP2tBPn8%2FP9DttboKCpBmw4T%2B9hHYJ0rXcWQgv1AI%2BRtYizZsB3ZjyLat0HJh7rsnYvGa6uXuvBpHtAZqYUaVUunx7aXbUfw6FgDbR39WsPXALzLRikc7i%2B7NRq%2BJwM8wjtPuIkh6fqaENjeteG3nlyYI3X9ivp5tXYSVsbO03hr7xN45phxyhS5ypbZ%2Bz1oyg7A8kowO2Pl7dANem78AlQURvX8EpQ91%2FhEigbnnuiQFWKEYieRGIrv%2BQ0rLEcpj4Ecfc1kZDavmVR1Hvcl4Vi4Uw2sS1ywY6pgE8JehGcpTi8xUAyrjwr%2BDTaIrLoNnhiO9qFhOu4ovDFVZrNY150GVxixP%2F%2Fhj7L%2BnraY05Q23OBHSel%2FteuOVguosVivbXHdT%2B8wrsRGh94PV3ZUS%2Bcf6%2BLMOOOQj8H%2FtpMvRvuMAgJSB8C%2FmLEdAzqrAtVz7pYtRW5I85ZPGNzw3pTCGd3SGzeB0uKYvM2VwTlfO7u5Q1I3MfR%2FD7%2FnjKEcvZebfx&X-Amz-Signature=3883df320689daa3685e2bbb86350e3c22c0f6f874a5a74f03e6bb4154c11a07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCSOSDUB%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIECwlXlZ0KS5ew1MktqaOxX6CnqL9Oz35BawZ98LPdumAiBI5KBEb5S3ChPpl4FPkMfiCuRTofzaIqL3jLJ9Xe7%2BfyqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlJx9NAjggrZzD96OKtwDhU0cFc3l4YX7kfEnvXPgnQuHY58onb%2FznBGEG%2FnS4WkyyhFMXV3T88VoMvwgDKIUL%2FMXeNuhsD4u3vzRUr13ANC2sEySLIlAdCj6IN4KwBZD1zIrCau7mtvNgC%2Bz%2FndtlTJxxq9aZIe8dt2bTdODBYFgdjiSk5hfVfRzf3bEU5K1t5NOsTw5DwAyUrx67bv7VTUtS94HQpdgwIWLwMvKLcP40Atn9lmRFkfjLpXsJ0l8D8VkvjwU7WhGgQA%2FvtSbh%2FNIwLCyW%2BaX%2BWEU%2BPOp5ysdzblnCiYkRn2EPPM%2Bttwxj4BVs%2BSovBIXHKX8q6MxC5CewhAAbsc6gzKr3iKtKpitc8ZLe8hjh6RP2tBPn8%2FP9DttboKCpBmw4T%2B9hHYJ0rXcWQgv1AI%2BRtYizZsB3ZjyLat0HJh7rsnYvGa6uXuvBpHtAZqYUaVUunx7aXbUfw6FgDbR39WsPXALzLRikc7i%2B7NRq%2BJwM8wjtPuIkh6fqaENjeteG3nlyYI3X9ivp5tXYSVsbO03hr7xN45phxyhS5ypbZ%2Bz1oyg7A8kowO2Pl7dANem78AlQURvX8EpQ91%2FhEigbnnuiQFWKEYieRGIrv%2BQ0rLEcpj4Ecfc1kZDavmVR1Hvcl4Vi4Uw2sS1ywY6pgE8JehGcpTi8xUAyrjwr%2BDTaIrLoNnhiO9qFhOu4ovDFVZrNY150GVxixP%2F%2Fhj7L%2BnraY05Q23OBHSel%2FteuOVguosVivbXHdT%2B8wrsRGh94PV3ZUS%2Bcf6%2BLMOOOQj8H%2FtpMvRvuMAgJSB8C%2FmLEdAzqrAtVz7pYtRW5I85ZPGNzw3pTCGd3SGzeB0uKYvM2VwTlfO7u5Q1I3MfR%2FD7%2FnjKEcvZebfx&X-Amz-Signature=04d28dc62ba97e818f3bdf01f0052091385de76064eafb202263305fb125e767&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT2APGHY%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIeeCVtvG7ECcdy%2FmYFNMU4xaRYRdNovJ%2BeKbJklCIHAIhANAe5rs%2FvVwAFTmD1BdJD%2BeGv8zhWELYblcD1%2Fum7kPSKogECIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPHCTnxHIb9jDc25cq3ANWIEdCqtuXcoPYEahNaQsmXJcO74Lw6YMoUidM0oSK%2Fv301TVVBcc1ZmJs5idOghwL%2FHqSkSeQlV9pG%2Fcy%2F0sc4YJnIXuAUVJeQFIcQRCrWmIEW592a1shcXMJVOIQ6hXkyYtatc8Ax2lLLvfGjpoA2kWhrBqUPhBfdoNPeUoJnJkV%2BErcpCKqKNFJFsoy9EbjoMAYcrrqb1yOQHMp3g9nt8TWQjpNPN9fIP9YZsNv7qpppPKo6sYq9UzzaRoOCuG%2B9%2BLyjef7owBHDayTCj%2FMTlcg9Q53qdg0aZ7S0i17EFAOQFPQzffi1%2FKknOeWSMm02oyuymZ3e7WvdKWKrEWQqlhjv6eZAjwqRfUV2UifkXOMp6Gfq7Ut6IPv1CkL1P43hgHPBGMLi%2Fvii8R3BBsBIm9I2r5taE3r9fiBb1x1DFiIzXrB9kgYzDl%2FhmXQEXdkPnZei2hi%2B1l8rc5xQmYgMn2948eUrB71gsbpbe1MqwuR2NYj%2BowBZusxDDGt%2Fi3GS8aNr2vbwGLqh0mVuhyD5mM%2FCdJ5CsxmctW6%2BcVc7z%2FchVxfY6OwYeEgOI7BcbBCHrBbkLP18RRxX3oLbSvW%2F%2BrezFhaoKuSFoIWySE6MejnGLYSSfLiwSUCqTDyxLXLBjqkAXjnSPkDRs1SB%2FYZjnKEmd58FJh2oOsNobIXZ6qhA1HvXpkzhd75h1xiogcbfrtx4t3Zdvb8uxd8akg8WCpyK5vzMy9SRKB6p80JKPqjEEfQa%2B2qjr%2B03sMCYktyTdGajVcfDMODBpQalKjywo1rM%2BWiB9%2BNKCbPEj5%2Fp4tyxvyOUD%2FA%2ByaMPihtXjesPB%2BtHGl432nHg8i57U8lk4Garuty6qPC&X-Amz-Signature=08a6d2919d3e66a43a556242e6e934b6b50d46e99451c384d2b3b63b1e7b8c43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGNTTDLR%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1FPW9bbFxgxZhxCTfoOJGV6lXRLiSVw3zXnX6ULDkSAIgavaMSdL3X3o%2BbozVBdT9OJ56pBOed%2BGjBeLLbmdS8qgqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJPJ%2BxCL1pL6FaIZ1yrcA6EhvjHDEgRYKtJeskpDkJVE2p8mDtkGaTrUTkbdoor7Iz5BfEzB8DHOvUutJI%2FDbZEWPTYdkutTkLND%2F97b%2BaH3ObRJj4Q3pSZaLHEWmGysFq1zKHG5lLDoPgW9%2FuYZBa4gLeXodBSXzy0hQS1UyFLXfvBIRU6xQ5ly2lu4goN3p7i1Vox68HuRkMM2%2FjdPJuBunWrJmMZ7OdTota0wX8iR0JhvU9lgSa1zMI32ZFp4O2aaQVVIwAS4IvupLqTlQb5yj%2F915zWyLwADoqsJRLfZtLVjcpPO7p7EfrAmDWHHgm5EJ19TjfFjz%2BUW%2B8QoAxHgdy99TEh9RhZNL5zB3dw%2Bc9GUilA09JmkNyOyg34tBV7wUrcO6D7nqS8kUfAJVjR%2Fjqy9INU%2F%2BNYznYfak6ig%2FcYkVEwQxIn3BXQFAUpWoyrj69LE15e5fF%2B%2Bn2hd2dYZCKcHe5ZWBhOV84jNvlMdjfdlv6MxGenRG3sh%2BS%2FBSTVzueYA0vJQS%2BHMD8AIHimhOd0fG0jqrVJwa5wNYjlPMzieEuOum5qhzth0Al61fy7Qv9olDHP0OWbT5vprhROYcmMYgppzn%2BSwAGso1lscPjy6ALE%2BKrcxfWafPzJBU8i3rDy9ITgk5ARtMPbEtcsGOqUBJYBTqtOCZ2FZOUyOWuJ7ita1geXweeomy%2FcGoevtRWWtN7IbrVD%2Bzw5X9a5uBHBJBT99qt1Syvhv0d2O78wRWzz5ANVyXEDyyjxqZfOBwXx0Ohq2w6NOEeckEOEzA0zDDbqsqRpejInPV7OLipw2sdr%2BkUfC8OM8SSOxLneptJrSK25xRp2WFaZ83X8lVxtuGkF9v3acNNBj3l53Hr5eZZTLwf3i&X-Amz-Signature=2c2fbd9b35c09bcdea42339aac00449c889333acabe3f549d2cd952d3d7fa680&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466757EY7EB%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF9h7GN0PSU1CvOOi1L3AYp%2BaC4yNvWBp18MCYzyhSy9AiEAq4UYMF6or23WdILJH243S4MWe2el50ZRHws3zdse3foqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLho8sxeLPfEF2XzACrcA%2FmtdQhfz6C17wM8flPakDM7Qp%2FrWV5vO85ZVp9DcEaEpGskvLdtPsX2DVRNlfCaM%2BgwDH%2FW%2F7JX9L5Afx6FTvVuXHcWh4dWTomefLy2HegZFGIqiWRnDgN0G7vsU36kbW2nI%2FOndVANdRdbU0VCGFG3yIOdHBovXtQz2v0hlWq9jIt1XqDbGucJxH5Y%2FkX3EPc%2B5GQmhl5%2BeOZpV7nEGDwwRZwVxO2BloPsUL2bGz4aIsmOcyataKgumUeZ27QAuikRNJZUtikKgZJ4YnEwYXgYuUU8qGjzm8QGTpKbyZzd%2FOBIipBD3FUFUfzSRz0NWra7snkiZojWP%2FELApb2ll8BeXGouI%2BKVEqr6%2BhZdM6atZSc7GsfvriGEMt5xauKHUNFAF9FC4B9mPfiX%2FWVNSFWGIGuyn2UztAXl01UO6joh58WpK4lyzlG1Kx4VlXM7ta0fea3U5ID0rQuKpmF3Ey75KNaCCu%2FlkzcaFtA7miJY%2Bh%2Bdtw2q6FUpZ%2B5MlIegi2v%2FIBDtfPyrMjWUdltEEThqbBa20kc4vPjRjY1hvTZxfi1FU7AiSIt%2FvzJyG8VpQM4PQa5e3vUxXfykqkVdJS6ETKNdVePqfVbhDMcvrlV7VfqdFFA3%2B9gEOqzMMLEtcsGOqUBhBGSaErZ0j2DfDN1e4TVx9%2BZZlauHHqTuYfJ%2BjM2UMN2XG0ufgJL4gOtcVmiUg2Lz7uuvVfRF0Rj3OzKjSErss%2BZc%2FUuhxufjK%2FlsJis0iHZjGq%2BioWhpiou4HdU3LAwsPK%2F0SDMU851tovF8lI6YiBu4aa1p4YKy6eCD5z52W8EbegPJdykZexUcKQGIP9q4dFv0Z8pK0EFejP%2BZHszr4zSj4YM&X-Amz-Signature=2182718db81c04da8e432b0366fc72ef5fe22e71a6b176332a1c16420337a6fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665I7JU46J%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2Fucp%2BrwXsF7gGWfQi%2FXH%2B8ea3g%2FAqCDGvCqOdreHH6wIgIJA92GkGlkq2YCeLvt9xhQ4AqWvAQG6DojC4cWLABUcqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDIHZZQX3zQzgYdbzyrcA3Bm3S2ePKBe5cW70cDm9wrq2EVtLXGDRt1adW6BH2bM1uQ8b4iXdlbRdUqCyfH%2Fj6smF32ctpKaIe8RbrtjNTMsWwWlyOVvztGov8oCSf3HbBd0PQyrrCkSDNeCeLx0W1BzMJlpED8%2FCW7NZ5%2BvsTRjZgpdEL%2Bb3YTDHHN4y%2BTz%2F30E2AOCv9pvgsuq62n7MJqy9faJdDylxnoTws4bEFKsnpxnyZ5H1g5BJV2UGo8qZBpl4PGSUAiraWR4VJZb3eUm0iZPPrz0firhf0v7x5Go91N0RkBqQum%2Bl95y%2FdUzqitDUafbKTN3qj%2F3i629t%2Ffy8M3Ae5XWzaVQJM2kx43GY5o%2FJRVzi0LM8trTG6eJJNDUm2bnSC5%2F1Z53KI78SpnsHSwWGROOQdGSBjMoPy%2BNUQrRP8ZcxiKWcrZaImqSvGk2DYrc9EeOwdAEJhgaKo%2Fy%2FZ%2B8JE1eWWSTfkXghUcMJyXHjB2viwho8S9UZfsZZ4Bd8zrtggYKzhGf9gq4e9%2FA2qiWRt2o2%2Fv1mKqiOq1P7ot78KSvUcOSQ4%2BwndW05OxhCGU5%2B%2FXXFVWRbH6%2FBk5TdHVR0sw%2FV3X%2BAPQP0nA65id36qaxaGhel0CDOujgNVPfE4BGI6xjSb7tMMLEtcsGOqUBYLvnEfJ2AMW72QZrbt9KhjUL5fzcLul0wptUWosjnQfyFdphZZmy%2F8Wk8iZBq%2BQexjwv0xtBynwcwRrMND7ck0CGYl%2FRDI1g4myOuxR0v3eabtM9JL5NwAMg4w1foW%2Bj2GWEMIouIpDqWefxLrS3k9M8LEX3iqZxI66RVLIjd769Rjbemjsc5QdIjLslgWjtXin2FRe4bo1jxud0NwbjRMPYryqb&X-Amz-Signature=a0fe1488f51259be8f232ab49920778d3f19930d05529423cc60a38c6d26ffd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665I7JU46J%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2Fucp%2BrwXsF7gGWfQi%2FXH%2B8ea3g%2FAqCDGvCqOdreHH6wIgIJA92GkGlkq2YCeLvt9xhQ4AqWvAQG6DojC4cWLABUcqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDIHZZQX3zQzgYdbzyrcA3Bm3S2ePKBe5cW70cDm9wrq2EVtLXGDRt1adW6BH2bM1uQ8b4iXdlbRdUqCyfH%2Fj6smF32ctpKaIe8RbrtjNTMsWwWlyOVvztGov8oCSf3HbBd0PQyrrCkSDNeCeLx0W1BzMJlpED8%2FCW7NZ5%2BvsTRjZgpdEL%2Bb3YTDHHN4y%2BTz%2F30E2AOCv9pvgsuq62n7MJqy9faJdDylxnoTws4bEFKsnpxnyZ5H1g5BJV2UGo8qZBpl4PGSUAiraWR4VJZb3eUm0iZPPrz0firhf0v7x5Go91N0RkBqQum%2Bl95y%2FdUzqitDUafbKTN3qj%2F3i629t%2Ffy8M3Ae5XWzaVQJM2kx43GY5o%2FJRVzi0LM8trTG6eJJNDUm2bnSC5%2F1Z53KI78SpnsHSwWGROOQdGSBjMoPy%2BNUQrRP8ZcxiKWcrZaImqSvGk2DYrc9EeOwdAEJhgaKo%2Fy%2FZ%2B8JE1eWWSTfkXghUcMJyXHjB2viwho8S9UZfsZZ4Bd8zrtggYKzhGf9gq4e9%2FA2qiWRt2o2%2Fv1mKqiOq1P7ot78KSvUcOSQ4%2BwndW05OxhCGU5%2B%2FXXFVWRbH6%2FBk5TdHVR0sw%2FV3X%2BAPQP0nA65id36qaxaGhel0CDOujgNVPfE4BGI6xjSb7tMMLEtcsGOqUBYLvnEfJ2AMW72QZrbt9KhjUL5fzcLul0wptUWosjnQfyFdphZZmy%2F8Wk8iZBq%2BQexjwv0xtBynwcwRrMND7ck0CGYl%2FRDI1g4myOuxR0v3eabtM9JL5NwAMg4w1foW%2Bj2GWEMIouIpDqWefxLrS3k9M8LEX3iqZxI66RVLIjd769Rjbemjsc5QdIjLslgWjtXin2FRe4bo1jxud0NwbjRMPYryqb&X-Amz-Signature=c753445cd6dab6a5f1fdb624bd1a90761de0301bb1759ca9dc8fd256b48cf0a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OFE7SMS%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGhri6U2O%2Boq9t3wbcfOSRatnEy3cvgmco3Hll239USpAiA1T%2B0nEFAlOoZjtVyp4B6wNHlgTJ1N9TuXEyGkiYjcdiqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPIlaqOzHAUxjZGO3KtwDMoEo246G2ZeAdlZNkjvCLUGSAlZwk0ioMQ0OBaZdvpQxAFyszyPg0ddbsOF5hx3WYKYtW8pE4VRTmhUR%2Febj22G6DLfS7xpqvvmvFwsmQbKSR2YDe8WQjLxQVMECRhJKBs16%2Fo6YYQrAA95kOWe9QsOSSqUEjdXEJhpURau%2BkcH43Y634ye19j2zde%2FZgzhUMvuV0M63UDCxVgj60atDLQFuvo49zmsuad166fX%2BIWEQJOB4bv42FmT4IOp6t7RRgj%2FFtgoZIRwEba8%2F%2FK9IHMgREG1KSHLYVCIF6%2BYSgUOpSHfXWHXLBzBcFA95msEscPmRbIc8CzeQQ7AS7%2FOtd0WP9HLJWMtUVygD0tV%2BMuuTQLpn0bOV3sIQgxLeCfXMLdYVEAuel6KZSyaXujQ8hwT1xKXBHoSD1G7ZgPDSslyMiIXTT6yHuH0TXvwKYYqx%2Bexm8ciwUS7jUhs%2FQDJhbFQ%2BoK4XBxbkhHh3NRR7OSrrVjA5kKEB5MumueCnpPrQuOF6ZGMVmzDlgUWOZCGFlKeP1gE62e1MwLnYyl8KDLGpPAdjiJ%2FmkuEnlrWBcXAThtMA2bceNhGhF3bnWr%2B2QgrXK9adJqyFZlJOHOMndYwkqZcuSCe3ir9K2JIwx8W1ywY6pgFrFoyYfd8bxcUJaqOSoB5bgEBeYIUh7d4nVTQTozYpIv1hJOVBUFPezbu3656QHx%2FOU%2FW0wFLfTkK3cG0pv%2BTaVb9kH6ETUIIN34cyZK7QWvRsJfW0MszOjXRwDpPOopEzxVMjpoYDvzSGXjVqr3Lr3YhOAQdrhXKErp%2Fkod3YWHxUCtA4nJ1ATEwlyNK%2Be8bs9cnVRZL48QNL7ehqwR%2B6m1w2IyQh&X-Amz-Signature=1fc9030cf4c8ab6812a7e449cdc7cdfb62d90acb302b12d0f9e6649dfde3a998&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC2MHN63%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICL0sR4TUtJQycu%2B1PB3VeQligCa14KVNf72CwspWtVWAiAceE43tbV11L5W0CzlINehCnDwNoO93nW%2Fe0ZH2ZFH1yqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIdY9WyTFa%2FUiD2WEKtwDkPcoNK9tK6SMfishqLG9rGQm7U447OwMh7Bl5ArJjZ%2FMwK2I5XJTEZDcfoZE8eefeRigP2NVCkk82DpvgaoR1OHAitWMh3ZBx9CHGXfMrKy0%2BCw0mfZfX8gH7mfGYk1ctTVHKKTH6Zp%2BKBsb4EyIdkXnfXa14BpNyl5tgvzethMEFLUO0Jek%2BiHLzZYHSXeJr%2FEpRwDVqfw%2B1NbKXsUWWChOq%2Fih92Lrssz0EJ9NpeLu8h3jPHilh31X2m52YwDc0dQMi7AgGwHbQAzFKUb70pHdcGQ2Blbo3YQiLh3Mf5WcQudG9CWEcNCGGgboZB8pt9reNc1Vjc8eMyVAcklC3ZTkkbIQGO4cHvR2P5xOk6quGX51zNgGHJhiFddPq7dNDRt0ItklxO74TnRNyzSj%2FTRTdokd8OBq7z%2F77xgtrYv2JG2vAqCLfx7nQjTGFy9gEnOGmHFfWmBwTj0OdXbx4HhZN4vKOAQ4o9NWHAP7PWiiPsZ1Ef%2BQhYyuqncGxY6l17VD0%2BrVXp1gIqYbL08UghQlK3JC19zUsfEJQrm5d8F6n1BvfIRUZYr92Z7aPgXYawndfDVM5FAc6WaG7vDR2zW0CT29g5Qrq30yoJFdR2qEsoDUzbEK4GP%2FBmMwlsa1ywY6pgGYejcX5b2Sq9LDC9NdZAz4VmGds6lLs25IA520reT%2B%2BQeFvcEQy8blf7OVVeEK63RLY6criVUt5SHGkfIEtLUUPtE8%2F0xQurZul9y5nULxVjH10FORSTKciA7ZIVK%2F333eco0URfaLbFGn1Tm6nIFPCK6ST6AWQMw2SlLqPDCyL6zTMgx7PTyGDcIujG3oQB3wtPGdShwfLDu5ZqAcKx4Vh85%2FxNcG&X-Amz-Signature=7149d06d41a4661a3509a39410737c3818f39b79e62589b9df4ec5d19b2ec448&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC2MHN63%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICL0sR4TUtJQycu%2B1PB3VeQligCa14KVNf72CwspWtVWAiAceE43tbV11L5W0CzlINehCnDwNoO93nW%2Fe0ZH2ZFH1yqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIdY9WyTFa%2FUiD2WEKtwDkPcoNK9tK6SMfishqLG9rGQm7U447OwMh7Bl5ArJjZ%2FMwK2I5XJTEZDcfoZE8eefeRigP2NVCkk82DpvgaoR1OHAitWMh3ZBx9CHGXfMrKy0%2BCw0mfZfX8gH7mfGYk1ctTVHKKTH6Zp%2BKBsb4EyIdkXnfXa14BpNyl5tgvzethMEFLUO0Jek%2BiHLzZYHSXeJr%2FEpRwDVqfw%2B1NbKXsUWWChOq%2Fih92Lrssz0EJ9NpeLu8h3jPHilh31X2m52YwDc0dQMi7AgGwHbQAzFKUb70pHdcGQ2Blbo3YQiLh3Mf5WcQudG9CWEcNCGGgboZB8pt9reNc1Vjc8eMyVAcklC3ZTkkbIQGO4cHvR2P5xOk6quGX51zNgGHJhiFddPq7dNDRt0ItklxO74TnRNyzSj%2FTRTdokd8OBq7z%2F77xgtrYv2JG2vAqCLfx7nQjTGFy9gEnOGmHFfWmBwTj0OdXbx4HhZN4vKOAQ4o9NWHAP7PWiiPsZ1Ef%2BQhYyuqncGxY6l17VD0%2BrVXp1gIqYbL08UghQlK3JC19zUsfEJQrm5d8F6n1BvfIRUZYr92Z7aPgXYawndfDVM5FAc6WaG7vDR2zW0CT29g5Qrq30yoJFdR2qEsoDUzbEK4GP%2FBmMwlsa1ywY6pgGYejcX5b2Sq9LDC9NdZAz4VmGds6lLs25IA520reT%2B%2BQeFvcEQy8blf7OVVeEK63RLY6criVUt5SHGkfIEtLUUPtE8%2F0xQurZul9y5nULxVjH10FORSTKciA7ZIVK%2F333eco0URfaLbFGn1Tm6nIFPCK6ST6AWQMw2SlLqPDCyL6zTMgx7PTyGDcIujG3oQB3wtPGdShwfLDu5ZqAcKx4Vh85%2FxNcG&X-Amz-Signature=7149d06d41a4661a3509a39410737c3818f39b79e62589b9df4ec5d19b2ec448&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTH6CHQL%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T004917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHrwdAJdWDzKGYp30RlT0AiqZX9F0yLuUF0l0JxK2UUnAiBOWFNVNtSDSD5hu2TxAJVY7FV7V8%2BS%2Byo2uhkwtFqNdSqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMktvD7ennsqfXF%2BAvKtwD2a%2B7uc4dObD%2Flccn5PQRk%2Bc%2BioRMuX4UQBhPPGfp4uN%2FDtqeia5VTK155Rlxzqq2l%2B4uiBIlqMerIDrBPXdbq40fDxVV7PzOxygFcBz8vNhkM3YAff7%2B5Y3kyaZVERtzbGuDPo1ZSquuF3uxTZP9h3ouEqKVdUtRNEg95z8k97QhneMiHD64ShrbWwk0aiNQqMxDLPTeFGi3%2BFSy0g4yDlIOSYkuSD3jTaPeDyG4EqPLK7%2BaFNrpz1ySa5mD9zyEbCxmKB%2BpfCyWPmMeqW4VgGoyELaX2DK09ZNJcFX9Dbfu8IEmHYTNxv2Rja4qS%2FQF5CNNPAlIRqQKw2QtkQjoa9%2Bu2EoC%2BRFDUeHlMuSPax91My9IorVcHpIJlo%2FkhTOgE9lg0UcX2pTJetuN4s%2F322zTuMqCQO9d4oMjVkfWGqYDdmSSqDlQuAA%2BBvLsfacWe96RQcbjRKc%2BjLtTRzzMcpwydiAAAprJdCX9HXmKxZRgBCZJ4rYKp7hGLNswbwaQws9X6juqvbj2EtBVKt1TpomqD68HFuys0pB9oiStCAV%2B6eEKRTZaH3YgrihjRZ%2BGMKcALq%2Frp1UgKTEdULoQvTMy8c%2Fi5OMIbRoptrGvtBqOREFsCm25aal2FFEw9MW1ywY6pgGRx3nbiRWHD0XXYY6Cow4jLJovlqZhtDBiTt2%2F1exhVuGUG7TjAo1Kbmj7iJttyd%2Fyq0ZIgg5%2BHVWaXPR0GFQ%2Fp7REBnQ2DqxZ%2BMScaLvYXWRwPWOR%2FXBbn0KQP1CPlW%2B3ZvIWpKZSQVUEJBQVBpLDOsszQIHWEIpyOfjXPF3BSepxgOlN3KGn%2BTwsh8zyDw7amS%2Bkn6as5novCbdSrpx0gANz2Y%2FW&X-Amz-Signature=ab818f808b80c32d630080e678df49c149a192641000318fd29341a9f2cbfca7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

