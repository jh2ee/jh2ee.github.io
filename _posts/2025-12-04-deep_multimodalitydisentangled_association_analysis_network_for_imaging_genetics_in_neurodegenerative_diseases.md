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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKZV6ATG%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCWPdpGwr%2Ff%2BUE9cKdKX8GI3tg%2B5Q2bgGm%2Bc%2FChD5VCNAIhAPXkMfXQRIdC7VkCYsJbvfM8I1tOj9EdjrHHjoPd6X4ZKv8DCCMQABoMNjM3NDIzMTgzODA1IgwzUS%2FWIwn%2BS%2BREpdIq3AOa36xFXfj41coOjPpIgHiANaYsTBDY5MANcFfDbdyJ%2BloFiel6uCTkdrz2KayVvtoiILJoDlGfoymqDZhaFcNg8aULqqG41Kf4AXm%2BSM6y%2FiKIAz8b8rP0x%2BVFkWqpZVXPju2H8Y%2FgJ5SWr75fDJbypK49K95%2BW%2FNtjRcUAWd343XlEyANT09dYjtS1AP56IdzTyiBRevSbBVcRYpCX7SqyXyanpoxelpRfmXNn1UJyiskfOUBN96yyhoU%2B34R%2FbiUiWHE5zcf%2FO%2FMjnKtRsRGiC%2FsTiey3fQeJtVpRRWq5dvIvNxzH8sw7Nl8SpNEfAvzCSm8c3WFhEYztCGtX58ZIVjXXYKGM2zIdWOj%2F4DT6Q6kXBY02JJoFgNJwQYVoDoYrLydQS%2BhIkWrXK7%2BPfdfcFwUN%2Ffu%2FeqEk9OFJLEAFvBHmzaSEfjzBZbE4DbEiQW7hdlSuB5wX8Xlr81huW3Le%2BQtsbyQ9ueHRS080DlxeUh9zhkcMPurruhOT%2FjOW3zVt8WeZ%2Fvz7T%2B%2F9DOephv6DmEWyY9ULyyXlhvjOaruo492G2j%2Fw6ZSHlRbn13odl45OPyM0XJuH86VHl%2FOwfQXVI5Ra4k0tLM6o%2FNOffymF2%2BLeUoIG5M66C2pwTCp7K7KBjqkAWbyY22PfRM8VIrcMtnljh3pp3IA%2BQhBd9DSw7gAO9WWVQEtgHnFnH7A8AgeDphF41vjkTrJPSBOzV5GzSssNQdlF2tgFQRB4gaI244AtidfqM8v%2FOZDoR1icp3qrowm9Cr%2BpJ5Gw318Xv5YSWPhfk0TdLDUldWA1Cu1bUW73wFF2apmvE%2BLKS2ThUmS%2BJEXsZ%2FPuDBXgkorYbJnYjdWYL7YJO7a&X-Amz-Signature=1f9666ac5cdab574c1e32385254a9f65e9a3944a7e0efb8886faa275f41ce0ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKZV6ATG%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCWPdpGwr%2Ff%2BUE9cKdKX8GI3tg%2B5Q2bgGm%2Bc%2FChD5VCNAIhAPXkMfXQRIdC7VkCYsJbvfM8I1tOj9EdjrHHjoPd6X4ZKv8DCCMQABoMNjM3NDIzMTgzODA1IgwzUS%2FWIwn%2BS%2BREpdIq3AOa36xFXfj41coOjPpIgHiANaYsTBDY5MANcFfDbdyJ%2BloFiel6uCTkdrz2KayVvtoiILJoDlGfoymqDZhaFcNg8aULqqG41Kf4AXm%2BSM6y%2FiKIAz8b8rP0x%2BVFkWqpZVXPju2H8Y%2FgJ5SWr75fDJbypK49K95%2BW%2FNtjRcUAWd343XlEyANT09dYjtS1AP56IdzTyiBRevSbBVcRYpCX7SqyXyanpoxelpRfmXNn1UJyiskfOUBN96yyhoU%2B34R%2FbiUiWHE5zcf%2FO%2FMjnKtRsRGiC%2FsTiey3fQeJtVpRRWq5dvIvNxzH8sw7Nl8SpNEfAvzCSm8c3WFhEYztCGtX58ZIVjXXYKGM2zIdWOj%2F4DT6Q6kXBY02JJoFgNJwQYVoDoYrLydQS%2BhIkWrXK7%2BPfdfcFwUN%2Ffu%2FeqEk9OFJLEAFvBHmzaSEfjzBZbE4DbEiQW7hdlSuB5wX8Xlr81huW3Le%2BQtsbyQ9ueHRS080DlxeUh9zhkcMPurruhOT%2FjOW3zVt8WeZ%2Fvz7T%2B%2F9DOephv6DmEWyY9ULyyXlhvjOaruo492G2j%2Fw6ZSHlRbn13odl45OPyM0XJuH86VHl%2FOwfQXVI5Ra4k0tLM6o%2FNOffymF2%2BLeUoIG5M66C2pwTCp7K7KBjqkAWbyY22PfRM8VIrcMtnljh3pp3IA%2BQhBd9DSw7gAO9WWVQEtgHnFnH7A8AgeDphF41vjkTrJPSBOzV5GzSssNQdlF2tgFQRB4gaI244AtidfqM8v%2FOZDoR1icp3qrowm9Cr%2BpJ5Gw318Xv5YSWPhfk0TdLDUldWA1Cu1bUW73wFF2apmvE%2BLKS2ThUmS%2BJEXsZ%2FPuDBXgkorYbJnYjdWYL7YJO7a&X-Amz-Signature=1f9666ac5cdab574c1e32385254a9f65e9a3944a7e0efb8886faa275f41ce0ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB3V2CY4%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIEXbqpv1eJbE8Dc8L0aiM3931wHp5s8BWtk6%2FU7RR613AiEAnHRSxiJEi5PE9hsyFIZCiHJUPGSkkt9WDIy5o7vg4qEq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDPzCEhNV8aaFm3dx6yrcA2NbKz9xcUSgr2UR0TNFtn5rh0TdZiiMcezDcQ%2Fr27G0DU86eRFGiKPpmS%2Bhh1iGlXpYBUperbvF7T7wif7buEBqYQqs3IMi1yVelqWTdkB74At%2F1xfqnt%2FQzG9x0TAnlZtNjdVcY7I0LoTdDuL%2FPdRpf2X9Vfr2uOe%2FhcSeRHbpuxA1nmWmv%2BQBe90OVtzJ%2Fv89liV%2B5zc9eBq%2BuY1GVoeiqVQmcuvHbjfXksBX5Ja9ZrhLRJqJWNVIfO36wvfnelE4DxHo2voZd3ZZ%2FXL0o9SBuXwxxuuVAoeAQa2FiK1%2FYDdgq5fSzfHI3co%2BD3umCjnyOcfrRElSQoHgjQ4sJNCSFKzIIT4gEAGeV1kUEgT3Mms4Lrab%2Betz3EFbMBAME4bQ72P1w5cYLxaKLgx%2FG7Ukpg3gcHoWXUqvElhGhL1zliTFpDOVj7Nm09DzfuOvFT0Wpm%2Bvpw%2FCa0ZYV75d3uv8qMKcfGjgJuCkoMOHmh%2FQNbuQs7UFWjb%2FLUEYNoRbRcb3%2F41CFps%2FKHcORpS%2BDbMREJyQYyKGk%2BV%2FXu3BxgsHJeCKy1pf5cAOmYlh17ngNUj26fziMfj3SWl4qb0Y3Oh1ii42s9ta7%2FzuTg4e1LOPIBTWzP5uh4pwB%2F1tMKnwrsoGOqUBa%2FpLXU6mK1YAVEKl8kc5xJ2udJuE1sG%2FYjvk7ejUyH1qcTRRhrtXZ5w5BQBB7SuDt74OlISr6NSaEak7NLoJgTpqIyTOcUvY2LUzitaZBJt8pKsKC4F6PRSfBr3%2BL0rC0ECjwoAGI6Jwa4Hz7fKJwypCdv%2FXcB%2Fgz0n15eixMY%2BnRRurl3RO18CVraDFIjMRsQRHCBycS0vi0UU4flzNiVe%2BfcE9&X-Amz-Signature=5491293bb9c4a5f13a40058478406fb22e16f348d69207d9c567ec9e8eda186d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TU3ND7MC%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD2wDQGJFHs35lsNS4X1u2VkXwNJI06306IcP9aApiaIwIgUE9zSnxMxBhP5bt0TZv5iu7i81Lsg13fpuU3YJhYF6gq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIOzN%2FYcxA1Rkwjq9ircA4vok9EJPDYchpS2g6SRp7L38gdXHQC%2FqOf6Its2zt2PBrgmdaLMy56OrNr6BgKMeMKU1PsdbhhCVEEWszRGMCmjbAgXawAxCk9B7bpsVJYJqd8bLDwjdKoXTCdVZsHxxubJ112gwc1Dh4cgHb1S58%2BBL3iKfHGox%2Bsv1mwbk7gLLjSOgpvDEKMtfOz3V7PK154zS8qPynEd6b4Jzrd35BHxkeXSV2mD%2BiJMdxmJx2jFgzZsDTZY7EaCAao%2BaQaftC6onBkkJe4w0Xc76PifS7EKgP5olTja8AtAqXeTpKK2ul%2BCeeFyIAOUYOmgF0On2OTrLF2cRU1AId05mDqJuwQu%2BfQz%2FA1r%2BFbEguCn%2FOC3s7ahlkq6Fs24Pw%2BG1VOmeSoqtEwTSt%2BnA8RqNyqYOz%2FCu9OpLDEQldbjNWYyVA0%2FfdFLW%2F8AXPop7yuhmIN2iO3eR9ase%2FvDocjhcj89C9txMDq4lvyBkNPwJtrS6C9rywInrk3Q9ix79evp5mAr8gaXMKkCxVOztcZI8s3LRhl68oKV3W%2FxXOh47W6f8LQ79RcKfbvFWOUNz2UnKGYVLJRcncF5O5leOc17HVvKUFYCvJiPt4I2U0R10fR3kA11B6bSsJs2Mwh9Kt68MPfnrsoGOqUBfNjW5Rr2l2ZZQmPhyrTxHaww0aCUBYr%2B3sLHOMNaq%2Fpscekl9GR8S9OdQLuQqOfWEzSoeLegj7Q3wHwZ8hwkI6WM6W91%2FbtqjBdTUjvSeZvO9wXApR1M5xnspewuRIvK5mrPSldhCITxaCitCqE7wse4ytxPNgucebmZZN2oSMbLo%2BpRAPQwE3Ow4FuRJX8wVokteayIOVuz6bJ0ptWoolEPB%2Fx%2F&X-Amz-Signature=d32af36bab8273a6eaa1a31c2a035fa506070425bb662a67e7c50c1f36ab325d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TU3ND7MC%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD2wDQGJFHs35lsNS4X1u2VkXwNJI06306IcP9aApiaIwIgUE9zSnxMxBhP5bt0TZv5iu7i81Lsg13fpuU3YJhYF6gq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIOzN%2FYcxA1Rkwjq9ircA4vok9EJPDYchpS2g6SRp7L38gdXHQC%2FqOf6Its2zt2PBrgmdaLMy56OrNr6BgKMeMKU1PsdbhhCVEEWszRGMCmjbAgXawAxCk9B7bpsVJYJqd8bLDwjdKoXTCdVZsHxxubJ112gwc1Dh4cgHb1S58%2BBL3iKfHGox%2Bsv1mwbk7gLLjSOgpvDEKMtfOz3V7PK154zS8qPynEd6b4Jzrd35BHxkeXSV2mD%2BiJMdxmJx2jFgzZsDTZY7EaCAao%2BaQaftC6onBkkJe4w0Xc76PifS7EKgP5olTja8AtAqXeTpKK2ul%2BCeeFyIAOUYOmgF0On2OTrLF2cRU1AId05mDqJuwQu%2BfQz%2FA1r%2BFbEguCn%2FOC3s7ahlkq6Fs24Pw%2BG1VOmeSoqtEwTSt%2BnA8RqNyqYOz%2FCu9OpLDEQldbjNWYyVA0%2FfdFLW%2F8AXPop7yuhmIN2iO3eR9ase%2FvDocjhcj89C9txMDq4lvyBkNPwJtrS6C9rywInrk3Q9ix79evp5mAr8gaXMKkCxVOztcZI8s3LRhl68oKV3W%2FxXOh47W6f8LQ79RcKfbvFWOUNz2UnKGYVLJRcncF5O5leOc17HVvKUFYCvJiPt4I2U0R10fR3kA11B6bSsJs2Mwh9Kt68MPfnrsoGOqUBfNjW5Rr2l2ZZQmPhyrTxHaww0aCUBYr%2B3sLHOMNaq%2Fpscekl9GR8S9OdQLuQqOfWEzSoeLegj7Q3wHwZ8hwkI6WM6W91%2FbtqjBdTUjvSeZvO9wXApR1M5xnspewuRIvK5mrPSldhCITxaCitCqE7wse4ytxPNgucebmZZN2oSMbLo%2BpRAPQwE3Ow4FuRJX8wVokteayIOVuz6bJ0ptWoolEPB%2Fx%2F&X-Amz-Signature=27f4bfc5f108dad6e5ebe455493bf1de47992170613b03a4266f874609c541e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBLJKJGB%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDf%2BW2YRZ%2FV5PEdhL%2B64BTH9ajLD6G7JRhmLiw0G1BS9gIhAIes4O4mWrkGAHFkhZ1VWazOkC63m%2FL43UUFc4gLR8AtKv8DCCMQABoMNjM3NDIzMTgzODA1IgxvMnkAfKkle%2BLv9qMq3APWhywdiFyQauMTTOH%2BdhQBetpZSvmdOGZD86I0iVygS8hnbkn6Zw3v3OuACSx787Lr7KBZhvsyONDNVjV93VbHRsSrT6NSN2PfbU0i82Ia%2FsNJBG1Df8TNioQH6SEkyCGvvbwRLek1mYGWcc7vqrSJReO6zOhCVbd1UKi2%2BnwE3aBirHXoxPLCBPynbCKHcRYrDlKiUyn5vYVci0DxXIgKD81qRo18hxoAaijh%2FKXSOPXnkqP9JBxXfUJe%2FDbRvrwyp88hY6BGmKidYhZLHPkfQXssVIQ%2F3r%2ForfArjxi8aZIbZAO2tkInLPQZ8cI3fZMd0I3HTsRYeHnWL7WKSyISXBztxrx81peQs%2FBe07An9Abd7EzzKenGrn00BpsQ8vZiyP%2Biyp5DPwbIOWn3M4qKi97xA9OghkC5mDDmZEr%2F6YDgc97DdMoTunzrrEWY2yqfIQar77Gh9xnzbRjhIZlrEqngAtMrrOE6P9rvLjue9kxm8YgM4HhFvnt5BRulbWlqfWY7hu2DeRBQE1W%2FqDpZSXFbkIHVB6edPvdupxQYdbWnp4uooqfzAoOMZ7Ymy7CbWiIiH9PXbLIpPo4TNh223RCWqKRGnJPPDWe%2F9ALcmG5th%2BDa9QA6c6Z1czCP667KBjqkAT1hoi780VQmfRCVMV%2BC89VrUZDONrlATOfgnSWMfW%2FGBty3rioXiQp0ma2SEtSA7Yhlxp26WUl9pejF0xopnJcFrJQlqZ0iHk21g2V9SvQqvar0SXdMIaF5nPtuOJMpuDMKMDoVPyS39N6ANedtw%2BIO5udUDJX6wLIVGpTsrqjaWlWojtCNDeVE2gMeDyW30iJMsaAm8Cvt3JdHiUwxeNEze4iy&X-Amz-Signature=bd4a1467e3151baaaa2e3e5c94b367f283733855a5fe0c16443565d5473273be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQ5A4LNX%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC%2BYAzFahjgygOLVFW%2FojbsqXR4wtbEtwkcTRqOM3gSXwIhAJUlwuF%2FnvPoLMktbBlAZ4hbXFgtoutgNJmATssMkTMGKv8DCCMQABoMNjM3NDIzMTgzODA1IgwFug5nK2mmX%2F1NZyEq3AOCFRCq2tgmSwFZSA2qGrNSjCOgztYpH4nBL8EKoNtgE9SXbGerpL231SYqbD2iQmokVMD9uDEXF1uEXsrH0k6hIU%2B6R6leO0h0fKZl3feFdUnoPtGOkGU2d3wNJGDgkORoQ%2BYvxfcxFg2JZENri2YNVU47o2yRFp7%2FF4x44RErnatqo2mmZMnY2hdl0nCWUJ6VAHIa2RknEJ%2BgNqVDg3XtbtQ9uBvzGz%2FoqO%2FLPyXX0oEJltClupuh5iwc0ivxcAAqLA8ZVoVbY5qFbFwEttyUyxusbysZsReFkt6E%2BB2Fdo3vJedMZoE7jH9IqEea3Bi5s%2BgJllVjTlo9nLGXV7td7uaiVw6lJ28pW1duJlqXAew0tHOF0STvU63u42T2JFgqSNfafysGe2KLzlprxnLdyZtuTTpRnCukjO8Er%2FcM2LcaZbY2AwgqZAK0%2FlOrOhj7ewILq2Pwqr8f0kCdWosavR3ptGdB3YGRKK0NsafEaljD%2F0nc2Vv%2B9IrUPO8l8698c8btedqzZETD%2BNjwNhFMf2qG4oW6o7NQc3UNPaccrrdVO8hNZe%2F24JR%2BnsTt%2BpGd0kihi7w1LP1xM4z%2FaZJj%2Bec%2FKa648pvvbfP354RUMXCYluOzob4%2BMa4CYTDV8K7KBjqkAa2gr3adeeFHJfx9V%2BIM3yyzXAxECoMpbLGbSNZ6iRWAYYo4%2BX7z5vmc4Qx50Lei4O6g7hcndEyQX5AT9%2BiMlcEU0Os%2BtMSLB0zip59aUPEZrwa%2Fvz%2BrtUb9O9HHp1%2F%2Fvb3kyp%2Fztk9S9yfthT0fqU0VPbloIDKDOgaNJg%2F%2B%2B3Z6EEc9k79gWSxXo%2FZCR4pkOHAgvHI6q3zVtfSV2NT0vkwvZ7Mi&X-Amz-Signature=dad43121154c7c8354a516154239c38e8038b4c5986f0c9e065a5256de7eda5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IXB5EYS%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIGMkFxXTekzHiIy0yhSru8bhpaSgASiW21Jn2Q7c0NAuAiB22qWMbTWHk%2BDrktKSj5ezLJn8TX%2BdAVZzKIM4vcCmiCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM8V9WkM9WJantaE19KtwDRtNSCfQQXO1k2GK8%2BeHSdO2%2BUcmgL7Jx%2FpGC4GyQLx34AmKVreOrB2lf2%2BwcDF4j2uGWgmkUGkM%2FgpMBBHgWFVDF5GZxxtskOHeuAnZsBiASJI0mfUNYLLgjhIKkWwjlogc30VUbteU%2FDa0uI0f7tHB2tJjVBFNFJ3%2FUkNo6QaDAlB4d1yD7q2CaDklRJ0c3OeIwvmWEyiCCCy1K6mj0pm3onhHJcH6R3qW0wlD%2FFvnl%2Bm5nwfMbM%2FpZZd3okjqlYf%2BcAt6NTxciSLDRby7rLdzFr%2BCPW692mjncPAWmM3Oohw0WUVWo0P8Qn6ipb7f%2BEZ9SwaiFEEdnbwBHCUJ9OfN22j2lh6UFcKlG4ee6ps3DrPYFmCAR42AqKj2BL7nI2EdJ1keOEpUnHamOXBAtEc4789coQZZBsPzWjqjRkSpyE%2Bd0AqgLf2TrCKj%2FRLIIIVl99F7czFszZLoYm%2BZl4lrALj4gG8FnpwyQXujn0AMrJ%2Fx83jjBcNi8fEtawx%2BQFo9NrFv1RdXhL5bwnAjbFpIMsxvsZo1Z4g8YDOf6uIgCSMhDjpZqfwlqwXiMmLyke%2Bqcba4DZfC7Mx5HdejhoD1fpnCCv5Mm5ElbmSVijr%2BZBnOdbAM1BsSigeQw%2B%2B2uygY6pgE0gevr%2F9FIxHMaySUG3G3DXf9zvsLhaGjFBWXu7BFr8Bfouho53tGELip1UVjuEBRE2huKwQFFka3dxkRAZfXPgqhOib2ka2ITL1r0Ma1Rc7UPULfcJoAoel%2FXuKdXAEGjUl3RtNTTU909U6A%2FpsVYQO%2Btol8w1IrlwqSjUjKCxeWtJ4vaNjWBN3kqzL%2B7FX5KMNh82UzREcDmZcAJCwiTT1JOFEEF&X-Amz-Signature=fc15fab6135f41a39f5b7516ae1ae375c2ef96c7aad575dfdf02b92fe0cee021&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2FHWO4A%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCZrQxioB2sU6FtOMuiFjupsmNpWLnCbevFamlu%2FSQG6gIgb2aRmuNH5BCsH368ka8wdiKYrbHIpZZetGvZDahWUJEq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDCy19D7hMXCIb%2FC8CCrcA41gTCdgOiwMHfF56WKmCUMA%2F5q%2BCrw8HJ9Tb82yxYN3GkKCkm1kwAkjmKKBcDJ3rLEWZ%2F17jxWGWTHswvgkU1I1vexX9jULReE3jmI9OGpLBWqSqEyYbFtuqXZHPN4%2BJuhPMbUUyQhlfhmVMfE%2FGTCwLRfeK0yviZXkHJMGR1s%2FdxnfEtV7oJfDeMhhpS4WGjpXD73DekPMfBzACWaPmZkqzm4gA%2BqA3R1ovFBYKy%2BLZ1qqu705k5KdWe8%2BYUqmDz4SImEZkujUrDKdZY7ZF%2BBJMZ6HvnZnkwMf8GjOp5Ror15Ano1m5SphZHY%2FN0lsqNHBViLfQ%2FoGxtz2UNLf2oVnEfQBINfDd2TIZpq0pN0koNFR32NYgQ2%2FGob9ZuZdRmiI675ZeoNPVaAqZEl1x5ritodDCX6kEth%2Bhg96WHu7yIzH2tw2R%2FlYBU5ANy%2FnQeJ3dLGAVotsReo6m7oA66ht2lqBY%2BcIAMe82akqkd0LWnr91Zxfs4BGtDcZ%2F3UpkIab0mT3OEQXqPdd9JrOWq%2BAxOUsjG11lV9mVT5UYfQkdnIvWkRA8JzeTRK0EjPYazkrwysZ3Q9t5ih%2FhHZmgFbtnVv%2BTc1HQX9FTffBVxUDhA%2BjmTfSpzzYa9G%2FMNbvrsoGOqUB62PGF0pTA%2F0iWTx3ZeT8GnsLtFa2ap5dQgcRH1R%2BrCqcK3iGaptZDmTq7DuYqqq5PasXXvNT3sERepjBFHZ4TyqhTgn5Q52vadyGyjqNFn8OKXePA1brIHKw5s6TZS7NhKNVB3qnWNgL%2FdCHBEe%2FcoUd1mxfe5Q40zbd5%2FK1pXg1MaNAJP9fMeCYr8yTEzRunqEJhMGxFZBbL6xrYC5tI02sMsnw&X-Amz-Signature=f95e242e4301483fa98101fea2630d76b15e9bb43c6e1c0e2e5fd98ec8c1c2c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2FHWO4A%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCZrQxioB2sU6FtOMuiFjupsmNpWLnCbevFamlu%2FSQG6gIgb2aRmuNH5BCsH368ka8wdiKYrbHIpZZetGvZDahWUJEq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDCy19D7hMXCIb%2FC8CCrcA41gTCdgOiwMHfF56WKmCUMA%2F5q%2BCrw8HJ9Tb82yxYN3GkKCkm1kwAkjmKKBcDJ3rLEWZ%2F17jxWGWTHswvgkU1I1vexX9jULReE3jmI9OGpLBWqSqEyYbFtuqXZHPN4%2BJuhPMbUUyQhlfhmVMfE%2FGTCwLRfeK0yviZXkHJMGR1s%2FdxnfEtV7oJfDeMhhpS4WGjpXD73DekPMfBzACWaPmZkqzm4gA%2BqA3R1ovFBYKy%2BLZ1qqu705k5KdWe8%2BYUqmDz4SImEZkujUrDKdZY7ZF%2BBJMZ6HvnZnkwMf8GjOp5Ror15Ano1m5SphZHY%2FN0lsqNHBViLfQ%2FoGxtz2UNLf2oVnEfQBINfDd2TIZpq0pN0koNFR32NYgQ2%2FGob9ZuZdRmiI675ZeoNPVaAqZEl1x5ritodDCX6kEth%2Bhg96WHu7yIzH2tw2R%2FlYBU5ANy%2FnQeJ3dLGAVotsReo6m7oA66ht2lqBY%2BcIAMe82akqkd0LWnr91Zxfs4BGtDcZ%2F3UpkIab0mT3OEQXqPdd9JrOWq%2BAxOUsjG11lV9mVT5UYfQkdnIvWkRA8JzeTRK0EjPYazkrwysZ3Q9t5ih%2FhHZmgFbtnVv%2BTc1HQX9FTffBVxUDhA%2BjmTfSpzzYa9G%2FMNbvrsoGOqUB62PGF0pTA%2F0iWTx3ZeT8GnsLtFa2ap5dQgcRH1R%2BrCqcK3iGaptZDmTq7DuYqqq5PasXXvNT3sERepjBFHZ4TyqhTgn5Q52vadyGyjqNFn8OKXePA1brIHKw5s6TZS7NhKNVB3qnWNgL%2FdCHBEe%2FcoUd1mxfe5Q40zbd5%2FK1pXg1MaNAJP9fMeCYr8yTEzRunqEJhMGxFZBbL6xrYC5tI02sMsnw&X-Amz-Signature=18dba0eb4cfa6a680529e0c739b016e055bf997dd29f65d368f1e3672d1f0a09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOLH4OB5%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDkcaCJM%2FcXXO1UQErtX8nqUB%2B5zmdHsFsqo%2BAf7CsrcgIgTkrKNzFLFDeq5OJMbJq%2Frv1eUJ8MxAfTWGMbeIOnGVsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDB9CNcE0oB7GcrbreircA%2BXkpLFp1wYpBS1FjLFgUX5oyhn%2BMO6q8UF%2B42Nf8GCBfZk57g5Gtqv%2FseBaDMvWB9DVrB04uHnETS1BPRaIc4P0yUQCdZHeN2fucFpuadQ9jGLk1FunZvPW0y06kyAfuvA3O2StYUVxwDeQ5k4vd48zB%2FOWqXGycPrsge9BzAhjtdPy8AAOAkeE8i%2FjtNInG1alUUc%2FqniVIRSiHnfJBd6MpZQ3LdIOWFIq9aFzkpdFkVH3lAOgjdnDZfZ26Qx4nVB0HkrBzxB%2BoXYuskPQxrWvzI%2BPXrM%2FL%2BCmRZ%2Fh%2BoRdoTsRzJ5YMNFtvH743I6suVYkySUawtuXqfD0MQVMSgSZxe0yuyqWSnXKKQa7VmmwtyAVqeT01yeOEWhJQ14e%2BMC3u%2F%2FkQCzVWjK03nDHZiEPXyBW6LiZ5fjoiJmqjq8g7BRK9g2dYb11VkRXySRm%2BU2hJZYo%2FsFNedKeYs42UAiuZ6Gf2CCJSQC89ddqMgwQwxq9ZVthfkxS1A4B%2B6SKXRzLQJVf6L3aTBbOBW57hnZWAkPXTHKX3QHXiIpg%2BTrYV63rm9Tf7rN22N9ttnbXUpdPzYYSSlwvkswfPfBWOUCf%2BHMZKTAlrIn5dgYJnr0smLb8AMeRmSdwflE%2BMJrtrsoGOqUBBxMM5vih2MmWlG1lLlnLuqwFbuBPNQOtuUxxwpsXDlldd8J%2F8pac5fOygvi3FGm7TCfEAv7YmoDDMl%2FSefZJozt7RedJzFqLQfRIUKZU1kigccAthDYKcgPyQ7sHpEG9G%2BLnv3Gkmx9%2FsI9OU0m4anphNdH7DBt4FifasJkHZCmM6M8nWbS%2BHm5cn8GV4YIawnhyUhwVxNRM8fCcClgMnvvgv%2Fnt&X-Amz-Signature=d88b476a19c5600edadc00cab6bab67ab3a04ad22e465311a12f04b6f751f254&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV4WK3V3%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIEdDF%2B8KcadOj5WrlJ7h0v4%2FORgjjVzAqxh8s%2F%2BFM%2FQjAiEAlnmwYSj8SGheFouUpvgf8i72SHNkwCiNfEdVc%2B4%2FKKsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDE%2B%2FLNOj5KdknUXYmircA385Ojo1KMT44LF3MFGPyrYi3eSluHZsEbzuyjSCkougyvW3fSyEF0iJmDkzjw%2Blzzv1ObdsJevKQGWDXUfnhHaWIIJlofdfsenBCmGInZ77tHmlBt4X0%2BGBhNxTv9l06LI83eElggx61y%2BYfbdKhI0fAYBxs491kmfiIz08kwJXimMCHI%2BLRehzqXsh9PWR0FJh6HtINgoV7WexTXO4OIuSxMD1GXGrEnvFjY8ERf5xFKgRyXxAHqTU2NEqBRXcEL%2BinBmKY4KZ3r%2FdC9tTvrMHSzWRMDlMd8YM6c8l4e5YP5Y6FAWeE1P2eBpfPC%2FybzImem8OXvXhRmAoEncQDXJkuUmEOzEyNDk25DEsfF3zoOisfp5xLpH5BkRk0blQFUJ9us9nKwVNojdgZFqanD4Vy9C3Wmxi%2Fhhfaav7jFfQ6PfC4VNdiuZ6N65BV%2BH6O7bqYoeK1HmY1q8jIyVZwP6nBp%2BuodvIYoCOv132DlMgB8uVreWcbswBtGfy31a7YVrdswi3xAznMA%2BCGvwpArP2AGx0%2FGwWWyvBNXmJPXDcr0%2Fa3vewqj%2FOtdaDmDxt2tQp67jLrGSPHPQtJvB4PnfWhDb6mxv%2BlcRr7rAiBCxfFV65sn1HUkbdMl%2FEMOfvrsoGOqUB3mWHOmh%2FX7j9Qi7oifHnqVN83jfzQ5XMg85CI0yxizgvg0rbnhqAX%2BZONzJnidb9AsjQAhzyWPDkQd2sCBPkuCxCb3nmgiKo6GND1ZZb4RbCmJIJMl1z%2FFXpOaisuSbf19w38RWme4zyaBwM5Pt%2BwGI9kfShpzArYkjWIxD3rmLg9%2Bj8rXofcP0Y8AO%2BYhcTUZpT%2BMq0x900RARAp6iKePxh1Y%2FB&X-Amz-Signature=0e40c73ca736424c5d19449658e079979b9674234a9b39420946b6d9e1192d28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV4WK3V3%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIEdDF%2B8KcadOj5WrlJ7h0v4%2FORgjjVzAqxh8s%2F%2BFM%2FQjAiEAlnmwYSj8SGheFouUpvgf8i72SHNkwCiNfEdVc%2B4%2FKKsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDE%2B%2FLNOj5KdknUXYmircA385Ojo1KMT44LF3MFGPyrYi3eSluHZsEbzuyjSCkougyvW3fSyEF0iJmDkzjw%2Blzzv1ObdsJevKQGWDXUfnhHaWIIJlofdfsenBCmGInZ77tHmlBt4X0%2BGBhNxTv9l06LI83eElggx61y%2BYfbdKhI0fAYBxs491kmfiIz08kwJXimMCHI%2BLRehzqXsh9PWR0FJh6HtINgoV7WexTXO4OIuSxMD1GXGrEnvFjY8ERf5xFKgRyXxAHqTU2NEqBRXcEL%2BinBmKY4KZ3r%2FdC9tTvrMHSzWRMDlMd8YM6c8l4e5YP5Y6FAWeE1P2eBpfPC%2FybzImem8OXvXhRmAoEncQDXJkuUmEOzEyNDk25DEsfF3zoOisfp5xLpH5BkRk0blQFUJ9us9nKwVNojdgZFqanD4Vy9C3Wmxi%2Fhhfaav7jFfQ6PfC4VNdiuZ6N65BV%2BH6O7bqYoeK1HmY1q8jIyVZwP6nBp%2BuodvIYoCOv132DlMgB8uVreWcbswBtGfy31a7YVrdswi3xAznMA%2BCGvwpArP2AGx0%2FGwWWyvBNXmJPXDcr0%2Fa3vewqj%2FOtdaDmDxt2tQp67jLrGSPHPQtJvB4PnfWhDb6mxv%2BlcRr7rAiBCxfFV65sn1HUkbdMl%2FEMOfvrsoGOqUB3mWHOmh%2FX7j9Qi7oifHnqVN83jfzQ5XMg85CI0yxizgvg0rbnhqAX%2BZONzJnidb9AsjQAhzyWPDkQd2sCBPkuCxCb3nmgiKo6GND1ZZb4RbCmJIJMl1z%2FFXpOaisuSbf19w38RWme4zyaBwM5Pt%2BwGI9kfShpzArYkjWIxD3rmLg9%2Bj8rXofcP0Y8AO%2BYhcTUZpT%2BMq0x900RARAp6iKePxh1Y%2FB&X-Amz-Signature=0e40c73ca736424c5d19449658e079979b9674234a9b39420946b6d9e1192d28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VBEWDL3%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T110123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIFuCGPzCJyQUb7JBVoZ7IPOQUBfjofXVbgUVl5JLpWebAiEArT4XODYgGloULAcwxJ7yLNX5ZYYsBhIU3ItQnYXqHqEq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDNakMZV%2Fb2Ex2uetoircAweOHpMQEeq4LkoORYmQb2UEWcUKufJ3brgyVx2g3m%2FCehGZ92jqC0m0eWIcO5sVdVwUieZSTRI51%2BDz99Sos7zJJGBGVsHP8cCoVV2UXG2mcR%2Bgp0zG7196nlqYn%2FuGHBDEMnnBPUGsrEtmyRKTHnzQnW31hA9fqecpcvcQkdi6c8jIe9FIg4yA%2Bg2iyVxgSi%2Fgt%2FqPlMg2pohs7lPK0ylCuywTBCz1ztsM5%2BeTMxpMKlnexRA5SDgCwaPXMZkk28ptWC0UyUIV4HP5RGCCeUlFByvZ5E39CGaviQO92rom52OHjRmDgPLk9qB9koSjbCHxv6fkNxhZHBw8cj9xT6sYkBtihZ%2FnBY5XBTVoFdQFDzOSWfGcjgJES04O4zn3Z0gmwSW4hRus1Wpr0cf%2FpaG4mck11wrvUs5wCw9U9wt%2BxV9S23wRVL3gD%2Bpl2RHbPPSAD6LyucaxYK5eVp%2FQWHu3LjjgwVbOEcZpohudBYC2ALlWAy8qYE3xby3tJNzEiKPWJjIEL26hnOfkD0I5dUdyMJxMCWaAGKpOBDd4pO5VFO%2FTQ%2F9cFmj8TzvF2hRmRwOT6qDUe9aZd%2FKro4KMDnlBb%2FWXzw%2Bcw3vtXlFy75CqJYCXbRz4qIUIyOCiMNnprsoGOqUBoARc9XYvrzBktw%2B7ufeaQtGfHySfIEXHcOpmgq%2BW9%2F%2BXNclPTbarpUYP1v7tCZBA65HgHRBsTc%2FkOWUTnWeBXPrXR7bQTyaaTySdpd%2B83UGb31rnEXGkaA9XSGOmecvTNZ2SU4bUZvOJFalwF1RDKT7ZATb9iWjRjAu3cbOTdFu5J22mb7zV6GScmhS97M0RgrnXHYaLmFVg6o9Yx7zjf9bqWczA&X-Amz-Signature=626bc8d19c5145ab3c61ea9097cfacc8c0e2a477cdea5c14fe426c5673733dad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

