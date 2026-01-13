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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZHCD4OK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQDdrh%2BoBYYOfRY8ulcgx4lIwOV97KKqsDIAKEgknbvgWQIgJCU1mzHsGOC%2BdUR7cODCjv4rbAy9qvk77N%2F6BqDRs84qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGMtFdPee96lJb2ztircA7E61TSuU5cZp0wyNn7YNTxtxObIp187NhJmynvpl%2FCXbyUh6L7HWN6%2FupAkEpAuDO8HveYoQVCQVelEzBt9XHdDHwxeqk8ViNPe3a4LRKsaT%2BIGUWOhVU6GzBe3NIiXYivSkpg3VO%2F8Sr6zAJ1PnuCRR%2BQNPasduJg2UvGG%2B4xB8nlsvfSvIg9IEAc3VzUuDR48jKtHwX1WP%2BvRh%2FshkHskk0CwMCrXLPpIRpR2m62WE1RfYAcJjzdAU5A6L445yOSSvaOeOKAYiw8ADq7kp0thk1I%2BsaSpgS07LGVByKBmtqLZ1v%2BWZ5Rq0IIGQ%2BAvQEt6Y71c5cRm5b1Chiokshuao11Hi0%2Bkm4wtPYSzQG90lAoyod0d1gnnVXv7xQ3L0G4b9Z5bVEy0mhCyYllT%2B2sJ%2Bir1gRM229XhMlmb87S41H0leEh%2F4rcoWLrxJbbyFzbBITle8opvlbQ2IZ3mier%2BHB7O7%2FGufMxwJjRAU%2F1rKWmlCMvYpbfWvfrNFQMwNuNEzfnw331u2zQl3AqWVYNP%2B4zqts2lrvqIVVmgVy3cLOrQPZNCaeUjAamSwR9UTVR9ZulLH8d8BlidHoBqPGN9oLtzJAbakowLeqHSqTd4LQtZHQw1TCHMN6O6MPnylssGOqUBHcx6LIQ4Aa4Zi6dTpXIZF63GwGNiitssUxtHOkwiG4aIphpJ32pW9ctEEm6luNV9RyOTnpiTE73yYeR0ZphIkH3KDC2Sqe1PHA5pvCojwwq9tICYlQMSBXJsLZ4Q%2BO1DtyRe4ERem9dTsIRJj6mXISJoX0IBVMYB2x8SqFyD8dINrM295yWcxSkXrX5HZj0JDBpVQCxo7SolCmTaW%2FFrne1bR%2Fnt&X-Amz-Signature=1e6406691356a8d7e6e3ae8a33816ebcaffbe0751da071baa32c7406787875a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZHCD4OK%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQDdrh%2BoBYYOfRY8ulcgx4lIwOV97KKqsDIAKEgknbvgWQIgJCU1mzHsGOC%2BdUR7cODCjv4rbAy9qvk77N%2F6BqDRs84qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGMtFdPee96lJb2ztircA7E61TSuU5cZp0wyNn7YNTxtxObIp187NhJmynvpl%2FCXbyUh6L7HWN6%2FupAkEpAuDO8HveYoQVCQVelEzBt9XHdDHwxeqk8ViNPe3a4LRKsaT%2BIGUWOhVU6GzBe3NIiXYivSkpg3VO%2F8Sr6zAJ1PnuCRR%2BQNPasduJg2UvGG%2B4xB8nlsvfSvIg9IEAc3VzUuDR48jKtHwX1WP%2BvRh%2FshkHskk0CwMCrXLPpIRpR2m62WE1RfYAcJjzdAU5A6L445yOSSvaOeOKAYiw8ADq7kp0thk1I%2BsaSpgS07LGVByKBmtqLZ1v%2BWZ5Rq0IIGQ%2BAvQEt6Y71c5cRm5b1Chiokshuao11Hi0%2Bkm4wtPYSzQG90lAoyod0d1gnnVXv7xQ3L0G4b9Z5bVEy0mhCyYllT%2B2sJ%2Bir1gRM229XhMlmb87S41H0leEh%2F4rcoWLrxJbbyFzbBITle8opvlbQ2IZ3mier%2BHB7O7%2FGufMxwJjRAU%2F1rKWmlCMvYpbfWvfrNFQMwNuNEzfnw331u2zQl3AqWVYNP%2B4zqts2lrvqIVVmgVy3cLOrQPZNCaeUjAamSwR9UTVR9ZulLH8d8BlidHoBqPGN9oLtzJAbakowLeqHSqTd4LQtZHQw1TCHMN6O6MPnylssGOqUBHcx6LIQ4Aa4Zi6dTpXIZF63GwGNiitssUxtHOkwiG4aIphpJ32pW9ctEEm6luNV9RyOTnpiTE73yYeR0ZphIkH3KDC2Sqe1PHA5pvCojwwq9tICYlQMSBXJsLZ4Q%2BO1DtyRe4ERem9dTsIRJj6mXISJoX0IBVMYB2x8SqFyD8dINrM295yWcxSkXrX5HZj0JDBpVQCxo7SolCmTaW%2FFrne1bR%2Fnt&X-Amz-Signature=1e6406691356a8d7e6e3ae8a33816ebcaffbe0751da071baa32c7406787875a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LD263B3%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIHLim7Ziy2YNgXDaEbilw2EPFvPbh2hJq2r4MaN%2FTeYDAiBMS6rfTk0%2FVQ%2F2bnLkl5sySZ0x4u26yUqgj%2F7rvI2Y7SqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmb9YRLsAGQ%2Fn4qZcKtwDsZJKp%2Bg%2FlC4mFBeKcK7QCJUbmrfkRXHQEpw%2FhzqFmIJtmgunYHE2CceZyOZSRpVdsDIIAYXyFHE9%2Fs9l7McJtn%2B7jeBFGDfQF6FwQ6iPyHj1Se9iW7AASP5YYQf71S9MM83JQYBMdB3zM6CIEnRcxTzvb3l9f3QlcKo2LiLVTEmfMGtINgrbxWbZC5%2F3e1t6uqPHVT8F2MIRKwl9ZxYUGlcbO85uY877Kf%2F9Rt0ULnIlIID4wHeK%2F09h1bWi7MNF5xu2peQB1BDEvAzXlhX0iZyXNzMz%2FNlpjXf43y5r8DGJDpmq%2FzqCsC05NAWdRUKqVWvPG6KgIaN0Xi0zAhWLTgweNYej6LgQCih1Q2JVCX4QVnrwpOddD8oJIiUm5pXrprGdG9cGDtRO1U1ncdESsw5n8M0fvXM7Ch0zbY4jrkeac50IExvhLO256kNGT%2F%2Fovd9Qe%2Frbcw9VXtqovb0VX6%2BnnqAoySuLBUK1gn6zzDeCJvjmkxIyTmr6xfu67LWR%2FBsF9hl5inRhjYMW7JP2iLbxHTn8JqpCuV7F%2BJRhyUjmaMkLatNhGhEEAapoFSSJIPB9HgAiDuCaHxKlRUO1xFJqxE4oeYfZYTR1ICyXQ%2B63tbkbo7cwCM5v8IEw9POWywY6pgHE9XhXsas%2BpjIxAw1Hi2vX8pyUpML5Tb1kZN7R3Zvni6SbQMkSo6uH1alCj0gmen55bdrcjwGlsBsm3E%2BMJY3CvHU54jvBvPQHr40YVZ0NqaCmEqsCX0usLqG09fml6d45TDeqnN%2BnOLW1XM%2BMfs9%2BRI9rIJ1060%2B3BnCh9WIqLUyFZ9c%2BVXErskHicjPIEcymbTxgwsSsubzZK%2BJLjkNyOCaxjMY2&X-Amz-Signature=1fedffe444e295e875e7f35b23a2ca811885fb4ff5f8c54a913b4dd36d00bd87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Q6MXAJN%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCxfscpyKCnvyTzlftc0Dca9yOYuvXiiySaLjdXI8i7lgIhANPy2%2FMOZK9CqmdaD%2BI8sfDV%2BiftQVHzV1vEiKT98XiBKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwmitrSVSQqU4KmKLUq3AOavvvIj97RV6u%2FxZUgjP71rVl2ykaxBrx7yLPEXyMX6IgDlzzc6ML928PrtqM8TTZtLzVrXueaDSgWTlYm1T%2FQGVuMTfJr5GFBGorXy95%2F7y8D%2FzrWweAPnpGaxb%2FBJIZYyPzhA2qCJ%2BP7FQhWeQks1xCO5T%2F9M5chQU975G8cZpGoFU2LEQ9rxoOEozxJu8dwQVdi3Jh%2F2aP4HQK5PqxhS%2FQjb%2FaEAwvVTk6C0cgYf93nNlVvvAQBSi6tSjR0%2BgIB2M7VbZ1QXevoH5NoMrRfa3Rl2LNnW4yJy%2ByCZSdsbTv3NG%2FGAXjTslgr4Xbp7meuzdsESXPqMxTOWF2PxP4hfTqana%2BMdPCtIcmwu%2BbCZNDuHcj4LqOkoFCE1tAYLU6UBSFDkExMZ%2BhmhXZyjXhqwLZc7s8lDTrlCP5XaB443F45vsNBn%2BAOD5LaM07WK%2F6hxL%2FChBu7ZFbayODQUy4MmMidcjTIwDg%2FQh9KboCC4g%2BaVbI2TKHgrDfjW100XJbGZtmPtCcN21cHbOXEyijCFlygEnrsSFqy467EL20bTYMf%2FkAUP73zsKf8qfymoL5YRA3FEh%2Floru2bTRzOmsMYmsOJwhigHSm2yo83EGHTaRgPq3VyaIyySwEpjDy8pbLBjqkAZ4BPx%2Bh5n9t70KcTJ5zE5JXdSAfzIeMYNaFezPZwox%2BD8klCpMNJ31ZlFvA47pinIiMx4PF5wkgaYtuXZhZ1BUjb14h8E33i3%2FRHjP5Tye6xx1UaL%2FI1K9LYM%2FSF4OnsZC7YlP%2BzvjjevpKWN6v4VdLzPJ9qoH0%2F9PbXg9%2ByyRFp18p4drDYJSothKpRNxgnjXyE78D7dcTuJ5TMPIQ5XT8%2BxG0&X-Amz-Signature=811dea78c3e1159d1baa306c097a9d46daa048a5eeaa74297b16c49c5f6ba5aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Q6MXAJN%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCxfscpyKCnvyTzlftc0Dca9yOYuvXiiySaLjdXI8i7lgIhANPy2%2FMOZK9CqmdaD%2BI8sfDV%2BiftQVHzV1vEiKT98XiBKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwmitrSVSQqU4KmKLUq3AOavvvIj97RV6u%2FxZUgjP71rVl2ykaxBrx7yLPEXyMX6IgDlzzc6ML928PrtqM8TTZtLzVrXueaDSgWTlYm1T%2FQGVuMTfJr5GFBGorXy95%2F7y8D%2FzrWweAPnpGaxb%2FBJIZYyPzhA2qCJ%2BP7FQhWeQks1xCO5T%2F9M5chQU975G8cZpGoFU2LEQ9rxoOEozxJu8dwQVdi3Jh%2F2aP4HQK5PqxhS%2FQjb%2FaEAwvVTk6C0cgYf93nNlVvvAQBSi6tSjR0%2BgIB2M7VbZ1QXevoH5NoMrRfa3Rl2LNnW4yJy%2ByCZSdsbTv3NG%2FGAXjTslgr4Xbp7meuzdsESXPqMxTOWF2PxP4hfTqana%2BMdPCtIcmwu%2BbCZNDuHcj4LqOkoFCE1tAYLU6UBSFDkExMZ%2BhmhXZyjXhqwLZc7s8lDTrlCP5XaB443F45vsNBn%2BAOD5LaM07WK%2F6hxL%2FChBu7ZFbayODQUy4MmMidcjTIwDg%2FQh9KboCC4g%2BaVbI2TKHgrDfjW100XJbGZtmPtCcN21cHbOXEyijCFlygEnrsSFqy467EL20bTYMf%2FkAUP73zsKf8qfymoL5YRA3FEh%2Floru2bTRzOmsMYmsOJwhigHSm2yo83EGHTaRgPq3VyaIyySwEpjDy8pbLBjqkAZ4BPx%2Bh5n9t70KcTJ5zE5JXdSAfzIeMYNaFezPZwox%2BD8klCpMNJ31ZlFvA47pinIiMx4PF5wkgaYtuXZhZ1BUjb14h8E33i3%2FRHjP5Tye6xx1UaL%2FI1K9LYM%2FSF4OnsZC7YlP%2BzvjjevpKWN6v4VdLzPJ9qoH0%2F9PbXg9%2ByyRFp18p4drDYJSothKpRNxgnjXyE78D7dcTuJ5TMPIQ5XT8%2BxG0&X-Amz-Signature=4264f347422501f0f49353175aaf2f24063a7d8702a23ad38a8c413925da9760&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QPVPLVR%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCZ1k3h1jbJhQ1SOOB8%2F2WlCIQZDN4ZE9SpV0NuEubBpwIhANxQ%2BnNyBvwxyO7a4y9jMAYvLWI7Gf20yUOL3FZvdSjSKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgylMz884aOIBIKAEcYq3ANYTrOqkWw7C3wVGm0pAilGUowbutdsnarv2IYhp7xxpcmXJ2r5TeqGIUu3FokwCP9cz2v5r5%2FgBkq33j5tq8ob5MoYedxHhwu45gWqZm3fUvE8dceneGvM%2Bs2Le8EEBkjmk68p3my%2F85%2Fn75n9oHyD35%2F37isSBnFwzPfE1KmWBAJJZDlr2CuD8UuGH9DQtUA2J%2BvA3a8b0REQtaN1a5EgHqUFVb8PCn4WGBQHEdbA4iXZCVZ%2B4KeG4sdXac4kyVEx4nt1asXQQoVWVdPEKeWdkoA7M6mZyi9P4Ijxfxd%2FkJR1zZnlHiw%2BV4SMwVCvYlq0pt9YXLkTh6X0NyGk77MLT0Weo8cucmYiJodN8MCgyMExX0NAaeO3J4FPqPKj%2Fc2ca0y285aZ3QUDOBpuVxtGn4z8Sw4m2IRrbokB%2BNIIT4iJzVb19pZ8HoIIujYe5eteQ00y33d3G0K%2Blff5H2Sd5J4pl13piyDDerA9X%2BmV4h4C3nNafJXSBvrBkXxhaPlefPT7WrqNZhYW4YSs5t5dxMSI07ySiRCTQWNz4L9xQKRTm8NalyMQas5GLE%2FVb%2FvccfQWQ6aQk%2BO84rwMHe7F4xAL%2BiIx6fSiOOR1CiVazsO9CD5SzM1KT3ghETDg85bLBjqkASfRufYVoKvWa2camuixO7cEJhmxXttivyOt9GkbFOa0SwSfSkPgsK31PDZMOi89jzAO670IOAfHl8UMGSCUXZRjJaUH3owtlB7sJ0WdxCR4MIy02Sf0rchdywSo%2FU5HQWdiCGQhGGYL0d%2FvlJlriZDcJ4Y%2Bo8iJ9Bb2GvOno6FxbIORuXlujB11Sw%2Bfxgw0Q0fFGE7nzjHf8InFxq3Ig%2BFsDLua&X-Amz-Signature=677a8ec6bb23184f4a6b5d03aae652ca522758081ebca25f130e02175a581c08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVLMAVNN%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDhTnTiAf2PazmYoxNOV%2Bbiho9XenKf1w3B50TqR1Zn4AiEA848bE8OYMCZP9vTOTDOhgyuWdgRENVwSgDQIkyQ6qIYqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAV%2FJdlme%2FSJ%2BEiuMyrcA0yn0Am2r%2F7UR%2F1hiURNpeFEetGmYxXoPx2BbYdWXqSMaI2vYku4R%2FQV5jYztclPmVO28zKvBpBJ%2FPgOOh8axIW1IktgS4EZ%2BAX0aIDP%2F4mCKgcBuf0tadpP9HcBfgweumwcJyEEI2smTnU9VunfkEDYLJUlbPUwYCJ6AFEoMGP6ZrIipz3hrFz3gz%2BD1RQ2NpxKgNoPwWpgT0oWRvxd4YUwAmdg3TzPsoS94t6sRhS4YgnVJWz39MBk82Wu1bTayRIh7vf0HJX6eaNeNJa%2Btdhj06q1Vpmnu8u%2FSF9Ka%2Bju%2FajGKJN2%2FAmxOf0YB00eTx0rm1kTgaFTyndBhh8KEV5TTeQfe21fOV%2FhnVGEUffK9oQ6y4JGnaW4XEXhoh2If3TvqibP%2FFh5qT%2BPEPmJxfXgTmFtxYnbQF45rLHYTTVFIgQ%2F2ox5MpSEbDJz2oiZ5k8USCrI6fK08Ql6EaQkKan3KFYfzuFAQOhD67IzLs2GFHHU8yyguIAVfVAwDrR3sW%2FMnZJVCIGnpRDRThXpfHcx54d7t6HgoVap6wNyUHFCreeACjFbm7M1OpIFx6rnElq6u6iEPpfNB6Qowjbo%2FltDTLd9Im8UuucGoKdLYuOqxokib%2F4xsm4TgeTKMMfylssGOqUBtHi6DzYtf5QgvbO0AcHEufdPj6eQkvT6PT1NvpVOBwUuNUXKBOMOGg9wv7W9tz0VQrNrAlazDL3aWOr%2F4s6Ln4QGyRN1ROt3kflQmD%2Bqag1DximiU4LmhKd0Zy35mbWT4YMUa8Hhj2r1oCRU0oB8SGZd39tew%2BkFyC6hXMhOi35YnbxFlTpJ%2FWouBdR9kTFavW8Pgf6RmIaMyceXcpsgz4wMx4Qh&X-Amz-Signature=1dfd2ff3d21b1c129e38a6169866d6a5ead3395471324f4340a88e9cd47620f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XD2RPOQV%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIAXTJshdfbtNugu44rFRHUiWOGwxtNwcfkJBeqGi7vlfAiEAnX1jpVSpNIrLdsmyRvJZ11maKdD4BL2%2FU9a0zO8dyo0qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJh%2Ftiy%2BgxT1C%2FWviCrcA2GHxJ68dpc%2BWdYSnmO75Tm4quKvASxyeC7FHudjb%2F1VIecymu3L%2FowGoZi0r9AGjb3cxIOvWEYqw%2BgUaYPCGuCPPteFcT6MnUtFTEcp9NzfSLJBGRGtI%2B2ndM90DBWZkokrreLrrZDL8xdjcF02Pm7tr2ffgUTiT2%2FkaUdd3IvvmHdqx5ibvoaxg4pK45pXVZAUXFufMZwk8LMKVHOcjPvdNhUr%2FA64TVMBpHQhYaIGMEFPzbirTAC76ajJw%2BhXVnhydgw3Q27qF8b4hjmY17Qrc7R1urPXkIHBU6oLPxO8ptHV9iDhKknj69MAjl3VMDgKV76GJwx3bBXddEarELX9XBZi4F9vmtbIP3jsUGoOkdlWKvU6D525kADw%2BuqLjGbqKjSG0h4EzKJaYLZr%2BIWckQzcZj7A5KPcawxB7RCgCY%2F64%2Bp844t%2F7wOOLpQvryEBUuG7IU823lgRsjsE4ASTg9lZiAVtyOGq1Ugu7Fdyhcf8syEoAWVP1sDu30xSoAxq34QZVe9fnstTzSxyUCM7dO9bhPlISgMBnzcyOiWutDul6dSjoZgZepbZF1UiTaNPvn4Yg8w8CM928rRrw6e3Q9jcrcSMPBX59ABqdZrgpe7fQm0b1Agw%2F66aMMLylssGOqUB%2FWj1r1AQgwEnnXTrsVT79HZ3GTGjFKIabS9ZVyY9Hbn%2F4f9S7IXHOW6f7z%2Bgk3vcpOslNHcaDs6i%2BZ3RrvKpdGLSMkvlOkfSAP%2B%2FZt7VYw8TgqcohdWG8aYLAMujJ%2BffLIci%2B95ZnKi%2FASTz8w2fyLayNj5paCWPbQNJhxF0wcxWrbjVSKIV61i9aoWoAFB6M5fta6X9nJgQSSqlyjriwqYG0EX%2F&X-Amz-Signature=b6f2d153dad209e13830664dcfc9b32d23ab88e9ef29f75fceaafa648be01c9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWVVSLMQ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDcX4yBBVE3W6n3vUuw%2Bw6OVUjqAmMa1YhsZS%2FdV1jWRAIhAIQCC6nEiFkrVMQ9xUVzb6mUr76Sp%2FnV8OLSRRmsXMiJKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxBtOuW8Ndzuvc%2BCKQq3AM783wn%2F8W7mSpyhzForpIahG4Ud%2F%2BcjAxC7%2FnfAA7ZU12PQGiJqUilxnnWo%2BgnOg6xkfgZ1y%2BrZiEAnF5O6K6GLCoeryZj8P9L467BDTFFHgU0rO0XSghCGTg0ysuwA63y9DeJUjcb%2F12hKZ6pdvGDjjjxlIfle2VlScIxaYvrFdijJwlqSpigte53yIa9jghSL%2BGH05K1jF1apUCqNG8NRn5%2Fpc%2FwWmXBo%2FTf7XAqX9Tw9%2B5n5Z40E1Xu5XS8u3T7Oq0VRFr4ZnYJqQLeWA0Cqv9J3lP9mui9Kdy10b5aSIuSXFnPf119GeQN5F8tBZ9KzZc4RFw1fMpPHLJ7ay8vHX%2B2sUzyebTPtpV21ypNE4d12XgoO1y7Y4z3vN6WvG35Vow9WOAsJ4G8PrbyJGopt46g%2F8eGww4xk%2FyyZ7IjDLDwSmKxMhYMFT%2BN%2BddxT9VMeK0dguRPbFUfmKcwtv2y4udDbCarALZQTMoDQBXnaHbhZ4waRkzX0GXWuhjXIj8RowqnUP3XzAUHAwEJFw2FYbKCjnUxXAQBcfc7etgD%2F8cb1HZvIRq9KXKUDilXyoBuU0LWJiHz7%2FoO8f3KSopPVbUteA26WCGb6IFxYKyYkGuvIO3MsslHQHmwGzD98pbLBjqkAYXvAPTD4cmzQSh3vucJih%2BGPTPVH7kmadAeiJslh8XfEhD%2BXT0AdPfm%2FZMEEMTmDVTZ37xaMycWLT8sq37t%2BmQjFaf8RcJT6sZp5PAjNK2FSWZ8WKUbM1MIT6OWF%2FX%2BIUYsM147Cervj356gcf8p2FigoazHfJAzc%2Bt0zFpY6S1zprYd6tRHprcgZ4PNw2vOFHuH3XMap%2Blyf5w6c4dmn9etumO&X-Amz-Signature=1b199f6c81259086697cf17f206e47a6f830744e30729ce4b861db65b15fd3ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWVVSLMQ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDcX4yBBVE3W6n3vUuw%2Bw6OVUjqAmMa1YhsZS%2FdV1jWRAIhAIQCC6nEiFkrVMQ9xUVzb6mUr76Sp%2FnV8OLSRRmsXMiJKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxBtOuW8Ndzuvc%2BCKQq3AM783wn%2F8W7mSpyhzForpIahG4Ud%2F%2BcjAxC7%2FnfAA7ZU12PQGiJqUilxnnWo%2BgnOg6xkfgZ1y%2BrZiEAnF5O6K6GLCoeryZj8P9L467BDTFFHgU0rO0XSghCGTg0ysuwA63y9DeJUjcb%2F12hKZ6pdvGDjjjxlIfle2VlScIxaYvrFdijJwlqSpigte53yIa9jghSL%2BGH05K1jF1apUCqNG8NRn5%2Fpc%2FwWmXBo%2FTf7XAqX9Tw9%2B5n5Z40E1Xu5XS8u3T7Oq0VRFr4ZnYJqQLeWA0Cqv9J3lP9mui9Kdy10b5aSIuSXFnPf119GeQN5F8tBZ9KzZc4RFw1fMpPHLJ7ay8vHX%2B2sUzyebTPtpV21ypNE4d12XgoO1y7Y4z3vN6WvG35Vow9WOAsJ4G8PrbyJGopt46g%2F8eGww4xk%2FyyZ7IjDLDwSmKxMhYMFT%2BN%2BddxT9VMeK0dguRPbFUfmKcwtv2y4udDbCarALZQTMoDQBXnaHbhZ4waRkzX0GXWuhjXIj8RowqnUP3XzAUHAwEJFw2FYbKCjnUxXAQBcfc7etgD%2F8cb1HZvIRq9KXKUDilXyoBuU0LWJiHz7%2FoO8f3KSopPVbUteA26WCGb6IFxYKyYkGuvIO3MsslHQHmwGzD98pbLBjqkAYXvAPTD4cmzQSh3vucJih%2BGPTPVH7kmadAeiJslh8XfEhD%2BXT0AdPfm%2FZMEEMTmDVTZ37xaMycWLT8sq37t%2BmQjFaf8RcJT6sZp5PAjNK2FSWZ8WKUbM1MIT6OWF%2FX%2BIUYsM147Cervj356gcf8p2FigoazHfJAzc%2Bt0zFpY6S1zprYd6tRHprcgZ4PNw2vOFHuH3XMap%2Blyf5w6c4dmn9etumO&X-Amz-Signature=94e7e3802d689a72a8e3fc49c9d857fb90ae0b49543372918f37f9639d49b589&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6UGAFTY%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIHD5ps1Ul8pBfiOE5e%2BgHuZvr58bpaeKpNZqHkv0zLP3AiEAibuKc9gUCjWr7ztrpwcO2IfHknOCFXlWskBGFn3n1TUqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNkJL4P0iGh5w2ET4CrcA4UZBVF%2F%2FvpQQJciZJLqa2ETHf3qeq4lEwwaIWN2mZffkkaJ7dmXuH2pqdg1cqBbkgCuHjKYsIxJ1D4F2%2B4QccvhRoLOzQwdWKwiozjriflha3MM22%2B8LG%2Ftif3QnJP4EDWbvvdSFfGRDqm%2FPY%2B%2BTnSd1%2BwiCPbxxr5ay1R4tm%2FkN%2BEaeP0msmDZjmRYJTlWZP%2BAaczZXMlkBrFhyqcdaBdT1sEFxB475Q25POiuMvYjST6jcsUdjcWySFGa5%2BjzYzqNnL4HhR4qomXc7g4cseHi%2BjkfdkIafuwdMinR4sD46Tz%2BuGWX2hesUJCFg%2B5n2G9%2FC%2BUfSoiN3HD4QdnR8ygwj53JCq9U7vkNteUaW1DI2Ze3S4Fj4Mk%2B6Gvz9R3OhBIaoz1%2FfFUYR%2BSuopr5U2Vrcpz%2BpB8%2FNHwx%2BcDPH32ykSO5yz%2F8g0W%2BMiwKhG8qr5KVlRsl2qB8a55%2BrYSD%2B1ZzT8GBPDsukiJF2yIB9%2Fk15D6IwvUbiTGnDGoFBkmFfBdGunehdCGGEFVBsZok1Ro719SUIc%2FRwfZi%2FzpvEw9VSRzntRpin3nmXcELnmx8D6jlYlxuc%2BBIkSf51YoQnqKhY%2Bi1NvG9MYejJlVEqk%2F4h0Rcg7foXDduXc0%2BMP3ylssGOqUB1JXf0dn7xB8xcwfRPDJTfRJwgvIb2v8iezCV9H22nn2IGVyMzK1RP8WfCgXTX9LuFFptg4MnBOhzrVgBan9oGt%2BMiDWAamFZdcxYhKPtGeVpSUD2vCXGyHpdgiw8HrBoK3G689Jp8tbJe306JsAW7QUGmHTiIww%2Ba3RX4niyjNrpqyODHzXv8svk5OvSER0m6grqgT5qw1zfaXFIye4SejAY64TN&X-Amz-Signature=d406597f01c524601d3a6b46fb6489e3a58effb9af3fd38e448238ff96928c56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSKABGZ7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIAdVLUvDxmAIGz6GilrLrvlqSbRLDjiMeyi%2Bar%2BoEvutAiB3w3ltFJBI5jYCdfSNYStgcSMAsEkEx7l%2BTzkq2KJuLCqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5LOTXomV%2Fy12BghiKtwDERBdKo74jIroblggWxC8%2BUuv8B3IbH0M1%2BNZsJsk2yPEJeMZFz%2FZtH0e7ngWPIS5GTBLkwuVt7oBRCpCXCjV4BZDA%2B6%2Fx%2BSKOiGqFVbyUz80QWQI3sbFST6%2F7xE3xn%2FREWeYoq64d6rdWgPEdvw0HnWxbQMDph%2B3s9I6yKmu3qIFFTW2qQqKJBjGq%2BiRpFtkNo99%2FB2fC4wHt5Y3jx72VC%2BrFmqLCEgaQKZYYVWNsTwZYyOFaQp4ANf6eeEabNHw1nfMf2sfGPzx0vmnUtMl5I%2FhI412Xf33ujwwYj43M7o5ezegatwDSuCveYSWd%2Fe4GWeEfoq4mUz53fQBtNRML4%2BHpNr%2BN4kD1z0L%2FJMwlnHJ%2FSl2gG7FPg%2FGxd2nw4lCj812IItcJ55wJiYwwphyl83uDAwG3tTT3GuaE6YvG%2BXVwK0ybah62sHh8drkDwflKSR8tXNspsTIuNvFLj3PrGPhMsnOjEavwQyQuMACayYmEOCSQI8r6A4XYDLQT5dQLLIN0iEkh6pbOZFxBXzq9ClgMjO3U9lfSdV0j1xrGkxgWuFH5WWvZ6UtHW0j%2FoXSKqQqAk97Aysval3vWMQH2nvKhtUfwpKmWwgW42t8r6dJsLLkB7eaBspqORsw%2BvKWywY6pgEwheUbKN7lInK%2FTlNXLFjqruZz3Uw33eG6u2iMujBgiF7D1Sl3VHWGHUkCHKUkrWfOFrHDBVFMuEH%2B73uhe3V%2F8gEPnnGjsB0r4S78Q4yqO1wPzQjmUDL4k3xIBLjplsTWqRtvajLgQ271W9D5%2B90rLV0j66ylDo2yzUCqcpTiA%2BttGxn1y4v4Z3SDrVygIAKvLKpKwOGn8QEdl7SmHeeuJLw3tC2h&X-Amz-Signature=2d280c5e5d3055e1bae089dec4023684cd32652fd0fea78a418f8a18b28a766a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSKABGZ7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIAdVLUvDxmAIGz6GilrLrvlqSbRLDjiMeyi%2Bar%2BoEvutAiB3w3ltFJBI5jYCdfSNYStgcSMAsEkEx7l%2BTzkq2KJuLCqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5LOTXomV%2Fy12BghiKtwDERBdKo74jIroblggWxC8%2BUuv8B3IbH0M1%2BNZsJsk2yPEJeMZFz%2FZtH0e7ngWPIS5GTBLkwuVt7oBRCpCXCjV4BZDA%2B6%2Fx%2BSKOiGqFVbyUz80QWQI3sbFST6%2F7xE3xn%2FREWeYoq64d6rdWgPEdvw0HnWxbQMDph%2B3s9I6yKmu3qIFFTW2qQqKJBjGq%2BiRpFtkNo99%2FB2fC4wHt5Y3jx72VC%2BrFmqLCEgaQKZYYVWNsTwZYyOFaQp4ANf6eeEabNHw1nfMf2sfGPzx0vmnUtMl5I%2FhI412Xf33ujwwYj43M7o5ezegatwDSuCveYSWd%2Fe4GWeEfoq4mUz53fQBtNRML4%2BHpNr%2BN4kD1z0L%2FJMwlnHJ%2FSl2gG7FPg%2FGxd2nw4lCj812IItcJ55wJiYwwphyl83uDAwG3tTT3GuaE6YvG%2BXVwK0ybah62sHh8drkDwflKSR8tXNspsTIuNvFLj3PrGPhMsnOjEavwQyQuMACayYmEOCSQI8r6A4XYDLQT5dQLLIN0iEkh6pbOZFxBXzq9ClgMjO3U9lfSdV0j1xrGkxgWuFH5WWvZ6UtHW0j%2FoXSKqQqAk97Aysval3vWMQH2nvKhtUfwpKmWwgW42t8r6dJsLLkB7eaBspqORsw%2BvKWywY6pgEwheUbKN7lInK%2FTlNXLFjqruZz3Uw33eG6u2iMujBgiF7D1Sl3VHWGHUkCHKUkrWfOFrHDBVFMuEH%2B73uhe3V%2F8gEPnnGjsB0r4S78Q4yqO1wPzQjmUDL4k3xIBLjplsTWqRtvajLgQ271W9D5%2B90rLV0j66ylDo2yzUCqcpTiA%2BttGxn1y4v4Z3SDrVygIAKvLKpKwOGn8QEdl7SmHeeuJLw3tC2h&X-Amz-Signature=2d280c5e5d3055e1bae089dec4023684cd32652fd0fea78a418f8a18b28a766a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUUOOTOI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T035557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIFrWv0PzWq71JBUgewBw34Zir0cwbJg5YfnR0Lr83Cp9AiEA08P8kWZapGA7tX4MQPAcngxqr6xMvAO%2F2qo8xTuTRcwqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO99n80ZaE9F8ahLUSrcAyfIw2wK0RI%2Fu8aE7dq1ovI5EgAnXEKuUeaauuu2zTdBmWnkgMHjC1siPBwrWm21XpA1TvGQFQ6ixGXRbcb6qKbN3905xHc%2BZx9SmO%2F2aUEinPStlVuPiQJV4PaUjoz3IYbAJwL2GJsoJgnfDWM8KwCz%2B%2B7N5DR5St0NUvrx0OBl3zJEOsVudjhihQ8S5mrzl2KxD6jl7GLoMcvLl8xeQ3BOflkngoGhuNOsSpzpMe2eD8KIUH%2FAJ7osDoPUON7F3otXsj1HRopNiN7xbw%2BM34S%2FLkk%2BNlPW3u1p2PWoMjwYtdPvcb%2BT%2F6L%2FPgrswvADwWwG7o%2BCkkgXyDdNGXLBS6T8WLt0MCVa%2BugEgymS9pVroNdF8b893z6%2FhJbsIAL86ib2ydQOuTDARRJeN8YHf9e1mviD52HIMTUZHo9f%2BWF8wWIwXb1kjoWsMXZ7crXSpf8NgkOPOy1PS%2BKzeuEMtMgiTtMbRPqTIHSolSdispg%2BGMGnJfk8BMnfaeo9o5pRzfTvehHirXqNB%2FX0CQgQp39P2xDbDMd%2FuJbe2trslV2cLONcFpucwA%2FxMvfNbkShTr%2F%2Btx6MBLZV5miLudwB3y%2B2i%2Bui93OsZghgSkZzyEnWD%2FPAMTDnfF97r5SUMMLylssGOqUBbWifnjRVaamMmkg%2FrUUTvpQNzjZsuwq4%2Bm3CzhXE6hfi2tSE5DkeQ15OzUhOA1Pz88ldIxxMAGnd9YB8VCsKlVgeDvHz%2BC93G%2Fg3%2FRdw%2BRhyiiXWByhYClv9duUvNTG%2BQYTUjrs2TFhVJBHCNBg5BdTHi5GONR2NLrsnb7gZqx%2B4iNT3B%2BPijTvMLrnLa%2BiD6Gbc7LWmbwa4F6flklAMN44gXUUg&X-Amz-Signature=62df0f1440c0de94483f766e92bc01c660be6664a669fba458472db226cfffd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

