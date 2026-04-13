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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643SJEZ5P%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRRuJMeIa0JgfSHQZ8Q3R%2FCF3ydoJOSxY7WhMcBT9dSAiA0APpsGvfFaHXRN2y%2BqWgIn8wxTudXhSjfitokGkwYrCr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMt%2BUGiFP48wguH61jKtwD4hV6cJFIGVaWW3QumhYCqjg8YfJEuPM5CnasT1A13lGE72dSF418xExIFHvZNXeu6W36WDfQq333HeKDFi8k9dAfKYGTjboea%2F9IZ7ToZd92mLHq9BFtUWcO9aUpyIVflrffRsMAI%2Fg%2BnitMiMbGId%2B%2BfLhID4lL%2BrChOWKnzP9P99jsusC132d5nO6wAJHy%2FGbRMN6YBrS49ZfEzCp%2FlaMk4%2BbRUkO%2Fh7aIQkmn5j8kBuOeRwLkpTBxlOpikllBVeLjoXx57ld%2Fi3a72QKWkfBu1f4VC%2FYYECOxakX4t5vLcAjg5WdJkUDbZZYbcYMZ4%2FLWsxQNBiCE%2F%2FDb3pi%2FTRGSCRm5witQllCCfKD4Y4HlddXRG7LX1Wskekh%2BmiYKiSrt5C9do6i9jimZsgLZqxpiKGyUzTzHfxiKtm5MbPfqWt5yre9Kbsk%2F9Mp8kNP8MhhbFmf%2FLxO%2Bn3dSXNTI4KTxvK5K2fVl6qV6GRCYhnmxadYKUUgS2dFLQB%2BV4q6ue5RPVOA9fvM7QtbguIvewj%2BY5t1kuvCWIz%2B45M89CpyLc5u3%2F6PWOLFJDPMztYVsv9OCGXT8238qGYAVKcq93WLmeykyv48sDhBzWXFgOE3nhhMyq3pOl7o60jUw5N7wzgY6pgHx6yycJuMg46QGJSKmjy69JVbBCAESo78OHmfjXyGLiwuihap7OhMXsu6qEy%2BEcGlvo%2BP4kIXZING4tU36982F0G27eyeg70pzU0ch24TB5abKa9FyXywDXPfWnHsu83PCWO8YJt7TOxr1n779t%2BHGRfPDCTJEAfeyVjEm2ADIxvIOJ8DhjdjFOTUzSLKjyWShN3e51lpIevpWdxP%2F3Uap%2BPvEXtNP&X-Amz-Signature=b0809f57de8a82cdfe6a59818dfebca666b50e656c8e12def8ca882067b33b74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643SJEZ5P%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRRuJMeIa0JgfSHQZ8Q3R%2FCF3ydoJOSxY7WhMcBT9dSAiA0APpsGvfFaHXRN2y%2BqWgIn8wxTudXhSjfitokGkwYrCr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMt%2BUGiFP48wguH61jKtwD4hV6cJFIGVaWW3QumhYCqjg8YfJEuPM5CnasT1A13lGE72dSF418xExIFHvZNXeu6W36WDfQq333HeKDFi8k9dAfKYGTjboea%2F9IZ7ToZd92mLHq9BFtUWcO9aUpyIVflrffRsMAI%2Fg%2BnitMiMbGId%2B%2BfLhID4lL%2BrChOWKnzP9P99jsusC132d5nO6wAJHy%2FGbRMN6YBrS49ZfEzCp%2FlaMk4%2BbRUkO%2Fh7aIQkmn5j8kBuOeRwLkpTBxlOpikllBVeLjoXx57ld%2Fi3a72QKWkfBu1f4VC%2FYYECOxakX4t5vLcAjg5WdJkUDbZZYbcYMZ4%2FLWsxQNBiCE%2F%2FDb3pi%2FTRGSCRm5witQllCCfKD4Y4HlddXRG7LX1Wskekh%2BmiYKiSrt5C9do6i9jimZsgLZqxpiKGyUzTzHfxiKtm5MbPfqWt5yre9Kbsk%2F9Mp8kNP8MhhbFmf%2FLxO%2Bn3dSXNTI4KTxvK5K2fVl6qV6GRCYhnmxadYKUUgS2dFLQB%2BV4q6ue5RPVOA9fvM7QtbguIvewj%2BY5t1kuvCWIz%2B45M89CpyLc5u3%2F6PWOLFJDPMztYVsv9OCGXT8238qGYAVKcq93WLmeykyv48sDhBzWXFgOE3nhhMyq3pOl7o60jUw5N7wzgY6pgHx6yycJuMg46QGJSKmjy69JVbBCAESo78OHmfjXyGLiwuihap7OhMXsu6qEy%2BEcGlvo%2BP4kIXZING4tU36982F0G27eyeg70pzU0ch24TB5abKa9FyXywDXPfWnHsu83PCWO8YJt7TOxr1n779t%2BHGRfPDCTJEAfeyVjEm2ADIxvIOJ8DhjdjFOTUzSLKjyWShN3e51lpIevpWdxP%2F3Uap%2BPvEXtNP&X-Amz-Signature=b0809f57de8a82cdfe6a59818dfebca666b50e656c8e12def8ca882067b33b74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZACLWIM7%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHgP3pF94Yw5m9X%2FauaZodLmeqhPKdl2p50qM2%2F%2FibeqAiBpJKD4WbEgPxa5QnX88%2BCAOYrsYAUqVwlkY6pPytT55Sr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMgRzdYh193UN2bxVFKtwDu7q%2BdC8xLgzqvL%2BWg%2F%2F%2BC%2FGWwfOdOSCj8wwzAHpdUteD1Og4yN%2B0UnAN2lS9s6%2B6weL%2Fjn0FA4rEtAdI7XvC7dU9oe1JgltT60By5sPj9i2cE6juWcnhupTU%2Bl%2FyErpRDHD%2FlOnCFlyQFHwlM%2B0Tb0DyZWdF7w7hQ2fdEAeAqKIaiO7WASLHpKSifuSVdWsJfx%2BjIw17qDbLr7YLgD0pn91mZkOvGF83QGIWXyIxEavHdIeFPOKiS7EbQEFmYyCTxCtLRhMQ%2F1c6r0GqawiJjqsLPYfcciXYUmHoNoEcUZ6oBYXYHAHEeyvjMtrQCWYQGryD%2FS7uWSiLFVrXt1CGhZ4zJOJE3zuNq4k6aCKSPTTq5bvDDBa5kiIl2AhHZ1NHBu3s%2FzTuoY3c2hJcylZSlwN0worOmrHWaddwo4donqMWMZbbEVbJHn6rWOhtiISmaVN9z6RFNaZ0Ndpi3NglSGZnNhRAgewveSJN8h1bUo4vEeuj%2Br4OMLVaAN503jweNd10K9Gkiqf1ITiE8Z58kU%2FBT8xbLJb6lSfjD9Ghw9a1Kpb73n1q6By4%2FRvHohQeBJ7eC9V4RKouzHe%2BKm4RzvUkCnDblAaV2jJtFySAqOzEjYdi2rA4lcY%2FpJ4w9ODwzgY6pgG6TEAaTVc4HIZDRtqMc7PmLL4URHVdw%2BVero9DG5TJIMv7jJ0YL%2FHTD%2FOn%2BiR6BtMKtMJYFgodDdFPNWXb%2Bh5VDgOzSAPGVo%2F7GqcA%2BZEIM%2BOeHIx%2BVSepleflu3VF3pi%2BwSvoZd%2BKysFZknynFRPbFvgeQP%2BMKdgCU5YV%2FqQDXqEgXZvdeKAvgxaNiUvk%2FBLlW1ZZn1qbqST2G%2BWUvbIXgiwPrgT4&X-Amz-Signature=85aeaf516849eeddfa65e747b42363beb6f23129d6dded720924638d9195f2e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EJE7IJN%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE8jLQtk%2BqGxqq9j0iihOrKI6zn4EEdFhvTwDzEw2QcZAiEAqANhX7yJO9gjpv5KYm%2F4Hhx5BYAxIryDYrNPosGL3BMq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDA3%2BWFqIRG8kWkMx2CrcA5AYzhsNl4yMMbtS%2F3a6IaWc%2Fni1F24eNziRguNgvSZxiyuw3NRhyjYt6gXgm5FwCWoYiWEpaVqbUQPVnjF4EADPQjEPTyPfLo6u3W5oARJQ09kD6Do0CJJD7oDVTyIoA0btMAORcfhSA5BbOLVdipCNWTFZdR42EXEoLjqgall4RzbnTKz6W7a8XRppwsBbWyPsUJCxmiD4wFzgqx2NQRDJTYrPXS4c6seFf7k%2F6k2IfL%2B9%2Fa5o8YmcXlKofLFOWI6guaXUenNHu6PAtDU43%2BCQ0MAJLL%2Ftq0yF0QlIfW87WaHRXS4j%2BTgUg%2Br8GyRKGcZXlG9ds6bAVkgD7tuyhq4rWAWf%2FFNSdREndxd4ijMTi1iCpH0yGs5zTioSBOfrL9kGFRoeqX02JejDwIQYhUfbOq4Bp2kjL1%2FWuDtWteHnPExKvsRZT5V4i%2BQPO1uu3cBIkaafWdpcXPFu8p6WrmPfLjJFAmOswJPfbWHQcM6CiwZZbS2lN%2B28cOY9zEhj8s2c%2FDSwubBh2LqhzRiC2wTvdUAX6eJqQAlz9TAHu0xkO73xjAmKZZf%2BVrB4qTN1sywkJA9WHPk6PsAjDYVWM28V8Wn3WF1sxhvqnD3X5qDrLpA580FaNFewFzQKMIHg8M4GOqUBgvY7NIzkhw%2BdwR5ZSuKaWfn%2F8MpDn%2Bc7EMYxXHpB1j%2FRvhnQuh0foZcY14CDBzq4k2bxMpN9kzdJWG0c8Ch%2FZ%2BsNLhX66DTBKE0NWhgs8kIjkqOqo9zJ%2FVYIw%2BmYVq6%2FoXywRSH7hDRq6B5eNEfsC9fPaV0yUY9GSLE%2F44eOGR7KTgJ1OtSb7xKjyPXfY5QG%2FfcCXrvJ2wapwDxpnBT9ALdCuiY6&X-Amz-Signature=3ccf95dfde058982e3cac50a1a46bf44c6819cee95b862ff1faf97d807b163ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EJE7IJN%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE8jLQtk%2BqGxqq9j0iihOrKI6zn4EEdFhvTwDzEw2QcZAiEAqANhX7yJO9gjpv5KYm%2F4Hhx5BYAxIryDYrNPosGL3BMq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDA3%2BWFqIRG8kWkMx2CrcA5AYzhsNl4yMMbtS%2F3a6IaWc%2Fni1F24eNziRguNgvSZxiyuw3NRhyjYt6gXgm5FwCWoYiWEpaVqbUQPVnjF4EADPQjEPTyPfLo6u3W5oARJQ09kD6Do0CJJD7oDVTyIoA0btMAORcfhSA5BbOLVdipCNWTFZdR42EXEoLjqgall4RzbnTKz6W7a8XRppwsBbWyPsUJCxmiD4wFzgqx2NQRDJTYrPXS4c6seFf7k%2F6k2IfL%2B9%2Fa5o8YmcXlKofLFOWI6guaXUenNHu6PAtDU43%2BCQ0MAJLL%2Ftq0yF0QlIfW87WaHRXS4j%2BTgUg%2Br8GyRKGcZXlG9ds6bAVkgD7tuyhq4rWAWf%2FFNSdREndxd4ijMTi1iCpH0yGs5zTioSBOfrL9kGFRoeqX02JejDwIQYhUfbOq4Bp2kjL1%2FWuDtWteHnPExKvsRZT5V4i%2BQPO1uu3cBIkaafWdpcXPFu8p6WrmPfLjJFAmOswJPfbWHQcM6CiwZZbS2lN%2B28cOY9zEhj8s2c%2FDSwubBh2LqhzRiC2wTvdUAX6eJqQAlz9TAHu0xkO73xjAmKZZf%2BVrB4qTN1sywkJA9WHPk6PsAjDYVWM28V8Wn3WF1sxhvqnD3X5qDrLpA580FaNFewFzQKMIHg8M4GOqUBgvY7NIzkhw%2BdwR5ZSuKaWfn%2F8MpDn%2Bc7EMYxXHpB1j%2FRvhnQuh0foZcY14CDBzq4k2bxMpN9kzdJWG0c8Ch%2FZ%2BsNLhX66DTBKE0NWhgs8kIjkqOqo9zJ%2FVYIw%2BmYVq6%2FoXywRSH7hDRq6B5eNEfsC9fPaV0yUY9GSLE%2F44eOGR7KTgJ1OtSb7xKjyPXfY5QG%2FfcCXrvJ2wapwDxpnBT9ALdCuiY6&X-Amz-Signature=701ccff261df0c80c8337752c16b9f6d3d5979323d8d8cfaebbfe1d89b853a40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVB2OXBH%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpQYVXdhiuV4F8We5E8Add59zyxBN0rG5AzHMrYKuyWQIgTbZHb822Q5%2B9HkcQEFdxXuPTu7ht3flBJWTIis14trwq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDCgV2gRmFmaQ%2FIcmMircAz%2F4B26%2FEpCXPCWB2vxzWx%2Bn1U4SA3l%2FOkd%2BK%2Bf1sejBWlkXKm%2BVzxGDETpVaw2kn9FaAQHqFzQoDdqLJ%2BptDD9MiQPKOD4GFcE65zccVIFrG7UDByzQuNqIaRLyddrbJAdSwbfHBWOycsjXtJzCWQzSqwdeIElGJmmIFSv32q28h6rW%2BvqfScN0D0BXg2clT%2FDPBWoxMiCk%2Fz9Mj3F5F7Clr9M6LaQmYY9Oc7gJoMg22QhsnEe8A5eyeysv%2FAYruUvAIM1TDlN0c%2FOnKpOI6sYVKemLUbjv4qepv2IGQafxdk3Qz8cJEZVepAxWeHq9y5UNWtfPEdnKFB3dHBHWa7pdyAHWS1Hkm8GD2VUo8n%2BFaJ%2FPm9Yn0FVPbibvFrIe0wMtb9OmT7DP4JJtvqH5va%2FfgjTl68u6ytX%2FzDT1lx9hsP54H79vIJeH1JaXQ%2B0iHJUrcas4gHdLkNhSa6cZrXezyH3nmy9Bdz6DYnN3gYizR3syjdBsVgtgyMXI1dQkbIaXF1I3RVN%2FELuYaq2iXnD4hShNGLyZQtCtJ9hss2jt5CYRbYtVYD4n2Z8ZsSsrYLv6yAs8OMcglr%2F8wroqtCmCCTw18rmbiu2JcOhw7CkLMhIXshXy3Virm8WhMI%2Fh8M4GOqUB1ggkSy1cSMxMT9W2Gm1%2F1qN9E%2BPNsx59la34QVLrfM%2BCOoheVc4mTO238pVY5AwfYOXUX7mMRHcOhwCyBhZaedaEIVAKpx2hvfXekIwW6%2B7zG9ill4N%2BpF1cgn36TdEVqdd5AK5m7FLD6nPEL2%2F%2BWsMyUy1ruZFwsqQ9us6cbp8sbE5xHkdJvzdWOJNY5ct6e56w4wmT%2BTk%2FkAqn5WLqWi2m8%2Fu6&X-Amz-Signature=d176a66e91da0ee0249d1f1de6b6cc99953c5bc471961758f99c11778f59e7e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZGWU5NT%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDS4gEa46KIvjRVkXb%2FCbb3p7oz4w67S6an82dxBcQ5egIgT15aqRngZp0IqzCaCpASlTp6vyddYrZXK%2BKwPOuMRG0q%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDAlzrepgrTkdfGcEVCrcA%2FhkyAA0w%2FOBVja1zldj8U4ptSz2rMaBjUNTvtuCxRQP2%2FeM5u4xbkM3jDQDMCyAeTFjZQsYq7L0UaSQNbJ6W7W17Gzjxu2t7oHpiNCTVRP8BkeyVdoyk6NoIaaPF3KczfR%2BKK2wSFsqsW9qrcGj4YvLWfMfDimt5urA7nYJ1HuWXjyCGlWQRImNGqU%2Bj0I0qUGXWpfGQ0eDYHP826DmeGJb483J0I6UrQzAyaVt%2BiseF3C3AEMgzEdBJ45HBxBRpipGwCpgO3Ca0II9JmQhnxLSi%2B%2BsVqSr38%2BjOWSrOsr6SOebrbCoMIUIzqhRqrjY%2F1QY7NWYGPuWpOukELW%2F0SuZXqaP2K2W6xY6m%2Bqt629ertwF4WZyi7BcxCVJw1hB574kfq%2FRGOGNYaDREPpL6VoMmAIuW2gJftyQPSQcW9lm4eXutMqDqQxhp0BCACHx0h63GMJwqJHqY6ZP9KX8l0W1hNR1GB5j53uVxwfKb%2F6Jd9IWqk9SOI7wab6dXO%2B%2BmsFpL1bfhhfBSVkPqu%2BmKHDu2gNK5eqT%2BkPH0f6F2Z71reVk1NKmq%2Bfki8aKNfRefRVXjrwZ2m2RZt8EzkSr7apRhn9E8tyJv3rFRZ5HNwR%2FiUEKclizvIAZq6D0MITe8M4GOqUBmkubI%2FPPU76KS9T9GpEKJVYdcS7xoX1B%2FT0tdED9448ilVkvdd1EAfNLA7dXe966Ke2NXrssFHjnHgATz0L5VPwaZoj29so3Hl2HHPqxeqmItoDGRag23FKEHNEq%2BJAGuBIAfA3axJbzQWErFdbQMtwdTh4GFMu%2BS%2BAJN1WR1ZOY28qvZrDvUJk1oBKNyu9D4%2BfKYhWxp7wCB4zcPS7SuESXQjSf&X-Amz-Signature=54c68900c428fae95c52fb5d86d8868739f3fd7949d7ec5c9b094cc4664b01cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWWKQNBH%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB%2FocoNnQvKpxEvn5%2BKH6L6Xq5okgo4l%2BrSJkugEj0YWAiEAlzxLxuNM9vgGx21M5K6fX8Ffpe5dnOS4M1QOygkyFZwq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDHYVQS6MMeeSf55aayrcAzHPLJz0Wh15D7VTx%2FUmPXk5%2FGPQYimntn4cjIUJ00j%2BHN%2BR8FBqTs6qNf0eo4SPyxLgM%2F6zxG7KJY04EA9NgfBsnipAbMjKcUFvpVaBl1nJoWgDrao8V%2BnjIr6buqlkCSWtYAvv5hFMsNhi93TaDmITI8kLt5ykybAKw2jFHDj%2Fazu6fMnIjH5Xeg6EzhileJ2p0O2JOlHIyrbdx8RTV8jnFgr2dEQFM%2B5f0r0%2F%2BFiqbw3wkP2ggzpCXBg0JP7ctTJan9fZCOcTgU8qAZr4oKgIc4dJL7PAjTEiroic00MNorUZow%2FkKuIz%2F6JF%2FXZovI99vhwXzpOhqv%2FYOOc%2Bu46agVk5Fcp0aLylvJiKt6uTOhc2V54u1XEdmGW1iNeKYlSvWEKpR5Mi4%2FzxhSMgGiRoqwLQKijl9M5%2B%2FuAIv%2F5iw%2FRw7CgRY93Kau5JhSw%2BBkS%2BM5o%2BspifmyL6eSndjiUqbXDtIK2SdXDgSAT7eO90kw7ospswln%2BtZBFvBLwoxsxTleZW0IWhmEJti0nsT0Kg4TUFx2Qc8aaYpjoyJFr4Ey%2B4fMGJz6VdjUAgyEPtmAP3TEINLjoyKxrYeuhmHZc05POJz%2F%2BfDE8T%2BlGXZCljdkW6tMKq%2FOdZ0Cw6MITe8M4GOqUBxgwxtsh3mXoO%2Bv79q5zzr0SJyjQUoLx5%2FeYrvae3WkNg5BeHp9XTSu1E%2F6wW16Tt%2FKxX23Pc5OG0X5z0eofYEk1jJ6ix5kt7yu21%2FQ6JOB2n%2BRKMfauoReA7tudJOMhET6qNkCD47mNS%2BskyLsmfhNSA%2FbSoDNjF%2FxYvvGr1EmD%2Bo5fXkAxLTb6UFZbWA%2Feglr0IAbVRWROW5cEC9GQkH7kQ2OE5&X-Amz-Signature=77af0e07d908a6da5b4013815b1e1c742deb09cef8caf7db7621eb6fd310b7c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LPP544G%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjYyQ5ACWa%2Bw1EDeVKIHmFjOHGTq2BQN99zFu7Tdb3WwIhANu6TA15PWoHDwFJ%2BarVa6G%2BRI5Z2zl0wu%2BERVFtT01yKv8DCGkQABoMNjM3NDIzMTgzODA1IgyvTVLEm6TAw2oPVj8q3AM4%2BGGwCSLso5g2yzn1BIFRX2fHmHyTLiyoytV6aJhKdwdpfZPWFVc9bRbVSiUEdezzgOcr%2FP3wLHmHuDVS7prgMoyW4%2BUJ5GwlxAkcRLUSMRuTzEOkS7kJHhmTeVBWoqe1l5KW5gISdWhBm%2FRvkQmt23R2IJoG5BBGBSBR9RS36GIAh9ldKtVNc4HEdgT0Yh9egbqC2WfXlYaf9FMLEE0os62RyLjB%2F235jjcB9tR0WhQmpH1g4lDXRwZ2Udxg5OCdMYuCRiYdVaOn6k33D2JBVnIQPekkNVueReoxE118bVtX6wq3z9OaetnRdIBzGePC7RLjkNV3Sp%2FL19uRlUIcn7QOxh5iIMiKGmFAmo3spi5dD82yqWum6trztC1GOFjELsir3%2FnDnK4oTiDcgcPuMn9ErvIbXWB2EId8PQ5ixMUeoqd0owRPIzv5zCXaGHY%2FvuIJpuNg98VSPT7uI4cyL9q%2BEBMWpRSE4AwNEXO26gE66EmZCy1dGikg%2F6vowS0qAYbmib9JGjLkOfzGtt0U17qkeEdYYC2nrja3iZMDSPK7nVoH9Wgik2j4IBjOisXLjMIQVSA8uLo1ozA0A%2B%2FbisWUbIPb7ZNfmN7WMVE18TbXdDpasoQ5z5%2FfYzCY3%2FDOBjqkATLN5c45obPkvKzmAn5SFxUfvq0tMkvaJpk9cWi7IwdLUuEJu2XNKdSljP3QsSdaHWeT%2FcO9NovqEgtTjEooK6kxFck1vcefnMEvp9nsCK5FQ4CaqWjsmfwrgD9Xkh9HdVZ3s%2B4%2FB%2FTWte6%2BCX4cYN00LuKH8uTttGLu%2BH9XaeAaGglceq2UxKTXeoxUKHrb7OHsDwsYvo2rdYa9Z0Q0Aw3uyBSK&X-Amz-Signature=82e59b2adcf956d823967ec3555f38d209c4c44cfad239851449c541e192d914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LPP544G%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjYyQ5ACWa%2Bw1EDeVKIHmFjOHGTq2BQN99zFu7Tdb3WwIhANu6TA15PWoHDwFJ%2BarVa6G%2BRI5Z2zl0wu%2BERVFtT01yKv8DCGkQABoMNjM3NDIzMTgzODA1IgyvTVLEm6TAw2oPVj8q3AM4%2BGGwCSLso5g2yzn1BIFRX2fHmHyTLiyoytV6aJhKdwdpfZPWFVc9bRbVSiUEdezzgOcr%2FP3wLHmHuDVS7prgMoyW4%2BUJ5GwlxAkcRLUSMRuTzEOkS7kJHhmTeVBWoqe1l5KW5gISdWhBm%2FRvkQmt23R2IJoG5BBGBSBR9RS36GIAh9ldKtVNc4HEdgT0Yh9egbqC2WfXlYaf9FMLEE0os62RyLjB%2F235jjcB9tR0WhQmpH1g4lDXRwZ2Udxg5OCdMYuCRiYdVaOn6k33D2JBVnIQPekkNVueReoxE118bVtX6wq3z9OaetnRdIBzGePC7RLjkNV3Sp%2FL19uRlUIcn7QOxh5iIMiKGmFAmo3spi5dD82yqWum6trztC1GOFjELsir3%2FnDnK4oTiDcgcPuMn9ErvIbXWB2EId8PQ5ixMUeoqd0owRPIzv5zCXaGHY%2FvuIJpuNg98VSPT7uI4cyL9q%2BEBMWpRSE4AwNEXO26gE66EmZCy1dGikg%2F6vowS0qAYbmib9JGjLkOfzGtt0U17qkeEdYYC2nrja3iZMDSPK7nVoH9Wgik2j4IBjOisXLjMIQVSA8uLo1ozA0A%2B%2FbisWUbIPb7ZNfmN7WMVE18TbXdDpasoQ5z5%2FfYzCY3%2FDOBjqkATLN5c45obPkvKzmAn5SFxUfvq0tMkvaJpk9cWi7IwdLUuEJu2XNKdSljP3QsSdaHWeT%2FcO9NovqEgtTjEooK6kxFck1vcefnMEvp9nsCK5FQ4CaqWjsmfwrgD9Xkh9HdVZ3s%2B4%2FB%2FTWte6%2BCX4cYN00LuKH8uTttGLu%2BH9XaeAaGglceq2UxKTXeoxUKHrb7OHsDwsYvo2rdYa9Z0Q0Aw3uyBSK&X-Amz-Signature=301a35a1d45c1e7b803b3d5f3fae05fa42b2614bd723e147092b92f01955879a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6NT2K4O%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEt7HyE69X18Kq9Ch78aFVKU%2FNletA%2FDfsxoDMIi0oSqAiAegrMVQLW%2BH2LmcnF7S969BXweyRY6QkjiKzAg4yqZtCr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMFvKn1Wc9NUnPHD9tKtwDB1nccK%2FJvy3GFKjMr80cfafhpcvgZTXx9aQw3Zv77l0kr5K%2BzXUiJnz274qt5ZqUcr4FBViTt3klDFNT%2FCUcHI5sYs%2Ft%2FGGGzdeZlnmtGC7jPo9huhu8jK4%2FWW6ivF4JW8hNWbDrqG57%2Bu19%2FOkjmTIb4e7tP1TK53EEqrq2OiRH9L0ds%2BuKtW%2FG4q7MdoxMJZDrgaq904gQaVvW4n%2FKSwO%2F9gAcVpF7J3Jmc0crtRZJqhsLwF4ypNuDmInj7alcgeMeCiMp0VTX56UQvaXL8ilv1Muzitv0FcOG59oXNF%2FF3l3zhwkrLkrxqysv%2FPl2csSQxsL5znTjJJB2CmbqxkCGAoZcREo0cmivnaN3U%2FiBwrRm8VlLeesq%2F1u8GaUjsRolVWO6fu5vl4%2F4S5l09V6kihhiABaoQj%2BXjODyWYNX2eMYprX6S%2B5gLur86XleV7Iz5Ul8abOVWbrkB%2BPR9w%2Fw79aUQW8ehlOF%2BzvqqRjj83feNr0tBWWb5hnY0JUaQC6ItotzW2gpQ6tZf2OPz5aNDLY6QprXE4O44EHL06nIrOo992UJEcA2o4dxxtOZ2hZPi46CDg84KwIjB57wUC3ZlHCOKgM8Tb%2Fsus9%2BHwGRlEx6KfbcLiaOqHwwq97wzgY6pgEIWat47GIXgTbaYOKorTncsw7LPbtaeKnQ7unkHp7n5y257yPD0McnLMNM95G4szWrLWanBo0F0hP%2BV7zyhg1mfr1vlKDyaTXmyrdiYEzFhZG779%2BYg2ninJ6e59IxprmvLtTU99OXZOwtllEytjoTuvtNAALDAz1k36JwXQ7grNrYQ7rlIwp2YKR%2FXuyhTZbPeNn8MiOgkdXZXB62GNxHPZvXaH3S&X-Amz-Signature=0adad91d6f57aa4498e7fe8735facbf196e18190afa436f2099534726b912e5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674S7AV7U%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXodIfXaQVxQxc78X1DW6fhLHkS2ZK6aR8PrzM0k8GtwIhAMxsgeTdFnCo3UvatxeYe238PvctaWLAuLz7%2BLcGuXd1Kv8DCGkQABoMNjM3NDIzMTgzODA1IgwEwkHRFD7Hfr2KmY4q3AMNARs7eYFg8xuaeTD0fLVGbRE%2BhCL9gLORiuu3%2BSRY8IvdW7hlAKhWio6stn4G7H9jXX%2F%2Bq2FPhqO1nyvlSQlgtsTBbzAqYWlTSG9L1H4ShasE4BbWij1Iud4OtJ4ADV%2FoDZtBPl60plpWGYYV3PP%2BaZY0wbg3e%2BYqV3btmUW%2FvDBG17GzVF21n3z6kjI9NahDPm2vVWxpf7QNtOp1Amj9iIN2XXT%2BT%2BqqZ0q%2BxA99bXgdK1HOEYmtaoZY3vjLxFOa87bH%2BVm%2BcEkye8%2BjN4jyBdRmcqxXD887CMeDw6aVhK87ZlDp1HM8cqaY%2ByD3SN58QSNxG7ErNjEDINOSNK0Ib65asGxTlMupiXEV%2Fmt8l%2FRbgBhwY5pV%2BbeDpJ0n8iIsJFfXnQv8XnDNNbrNsMJCd%2B3RZ7J8KP2btz8vdK%2FUqCYbbB0upofaBk6G5wYPG8qgCg8fDk4%2FwDe2Pp6NqFyA1EGoa3oMp3b5wt9mi6IsznZb9xKz8324nEAlyijY8kTPJ0qoJ2IUFamjctvnJq3zDsPGczVMiHmDP%2Fgz1s9dcIaCAsSK7KsMQJsJmiJusB%2FHCBioVXK4DaTkOcak%2BrrqRQueWeiT8%2FHk5ZFd9Iq%2BTS4JSrvkxU1WGKIqCzDk3%2FDOBjqkAdynwJmzU%2FVSN9HS00CZOEA3rs0WZuW%2BRrEOd03%2FRlTVUnXNOkhm3tBcQ2WGoiMLUeKsiitzXqmytSPq%2FEqbDy47uhdKgmhQ0nqBOKog5Lm0BQZlwpJjno99gx5Mzf7fptrRZvPv1BvmUHX9dM3HgffzvBQB3CCKctbVyXsTvk6g6oEyF7wvyZlJp5VPDESXqBdSkr2GAgM38b%2FkHSft7WW65hLS&X-Amz-Signature=b55cbc7ba1805b0d7334df779f7d89df4071b8d00870db7704159289616d73d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674S7AV7U%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXodIfXaQVxQxc78X1DW6fhLHkS2ZK6aR8PrzM0k8GtwIhAMxsgeTdFnCo3UvatxeYe238PvctaWLAuLz7%2BLcGuXd1Kv8DCGkQABoMNjM3NDIzMTgzODA1IgwEwkHRFD7Hfr2KmY4q3AMNARs7eYFg8xuaeTD0fLVGbRE%2BhCL9gLORiuu3%2BSRY8IvdW7hlAKhWio6stn4G7H9jXX%2F%2Bq2FPhqO1nyvlSQlgtsTBbzAqYWlTSG9L1H4ShasE4BbWij1Iud4OtJ4ADV%2FoDZtBPl60plpWGYYV3PP%2BaZY0wbg3e%2BYqV3btmUW%2FvDBG17GzVF21n3z6kjI9NahDPm2vVWxpf7QNtOp1Amj9iIN2XXT%2BT%2BqqZ0q%2BxA99bXgdK1HOEYmtaoZY3vjLxFOa87bH%2BVm%2BcEkye8%2BjN4jyBdRmcqxXD887CMeDw6aVhK87ZlDp1HM8cqaY%2ByD3SN58QSNxG7ErNjEDINOSNK0Ib65asGxTlMupiXEV%2Fmt8l%2FRbgBhwY5pV%2BbeDpJ0n8iIsJFfXnQv8XnDNNbrNsMJCd%2B3RZ7J8KP2btz8vdK%2FUqCYbbB0upofaBk6G5wYPG8qgCg8fDk4%2FwDe2Pp6NqFyA1EGoa3oMp3b5wt9mi6IsznZb9xKz8324nEAlyijY8kTPJ0qoJ2IUFamjctvnJq3zDsPGczVMiHmDP%2Fgz1s9dcIaCAsSK7KsMQJsJmiJusB%2FHCBioVXK4DaTkOcak%2BrrqRQueWeiT8%2FHk5ZFd9Iq%2BTS4JSrvkxU1WGKIqCzDk3%2FDOBjqkAdynwJmzU%2FVSN9HS00CZOEA3rs0WZuW%2BRrEOd03%2FRlTVUnXNOkhm3tBcQ2WGoiMLUeKsiitzXqmytSPq%2FEqbDy47uhdKgmhQ0nqBOKog5Lm0BQZlwpJjno99gx5Mzf7fptrRZvPv1BvmUHX9dM3HgffzvBQB3CCKctbVyXsTvk6g6oEyF7wvyZlJp5VPDESXqBdSkr2GAgM38b%2FkHSft7WW65hLS&X-Amz-Signature=b55cbc7ba1805b0d7334df779f7d89df4071b8d00870db7704159289616d73d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LJXHAKA%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T011319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDP1XtUPAtj1EgfChocer8VpdtclIk8zlE1Ta5%2BMvgEQAiAAmOg%2Fi6j0Z3SNgBo%2FzRRZalNGMHQC%2F0vliWaiubYqZyr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMAnQzhPnbsTlKSLm7KtwDIshjwGJ2QSJPcTslEubatrc6l5LuPj3pzHm0%2F699t%2BjL3tGYbiQb7LzQiM2YO4qgyeoRXMRh5oElcIcw%2F%2Fhr%2FsqtjnRqJkcHFFMZx8cQztVL%2FIIGNM0vP2CEE1fRWogVmTKaRB%2BBoQnbLnEZdC1ovQWOWoWIj0mxG3KOGp30B4L%2BHSVsmEoKpBggdIUQZEKfEhHz255YLUAhpMzcJsUIIMV%2Bx1KNVtjnRNbAmJdaN6Mrg4SUXNWkGONoLRc2f906AW0jFaIFo8VBwe8hNrRTkKvtP%2BoxVdmcGKWTQEIlzC7WRB%2FKoyVUPmUck4p71dLNoWmRfHvvbNszDAvIu%2FX2l5MC%2Bu7FuDgnwMRoNBWpMlFYtRZh6ZIw5rMQ32DfE%2B4%2BUlnSJY9glYqPb%2FIKhPPYxXbvk7SjD5d02uIxlKzgFUu0IwqNPYbVs4GtyGuAujnfqahj%2FMMbMm6hAjdmWf7KUiH6Qv%2FHh3zmy5n0tNH26x0PryiqNctY5GTlesTP4D4%2FVdkAqWQMhu8DXZnxad0Zr1nj3FlcKYUAl14I36qHyOI3CuQ%2F5fPR%2BgjR0Wj%2B%2FwUPXxi8%2FM7a5HzaNmO3JhQ%2Fpq1OosAz7AEQ%2FUlOWXoAraKu7cKBTY06%2FK7ejUswt97wzgY6pgE6FsE%2BFlHbQj3YdKXI0OcBHJ%2BTds0n9yV%2B4fYek0szxN62SFBMNKFeNWSzR26hEBsFv6FM5KPTZ0YugYvwhWSHlspoh5TjNClhWPKQA%2Fsh0LCoHeaMJFS58hGxz9tUzcFs9nrqWdKkShRYzldweSErrfRCKYcpDMPwdt135UEd%2BaSB4eak%2F6skVnQ5oRDUnaJy%2FGW2%2F7parbEsmaIplJ%2FtKi11t6TS&X-Amz-Signature=2d0da72ff0f7cebb26c5432e8cb5799814d0a63f7a0f3dccea65d7c4de3f35f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

