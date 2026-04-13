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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ5QNM5Z%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDNMuXLrWxe2tFhEv5ky6zyDYFdrhif5b3G6n%2BMKnjTuAiBtP73ARTjxoZR3jOcMugksSLYx%2Bxi4cIBnnZduh%2FWLeir%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIM2FEjA7ywz3Mz7V3LKtwDYjRfhCq5gAujmnLSdpjfAFNXNISfhcMewZ8dbmEmjN2cNpaQrVO93U53XEcteRmZwMtMf1jou65fV86NTv1YflihXWZbZ%2B0m0zKoL8YLm%2BtZWE%2B%2BkotFWg5rIQAznDp0vQyo2GmL%2FCQPDUq%2BsBMLaMAo0%2FDw%2Bw1Fo1sjwW6cY7Cg1pg1OeF6r9VQsLbpoT%2BoUXzKLpm91kXJWU9JUkAH1LcKK4IlHj9SIwRRGtssPQ8VDocigUUKbdtWd2lon1rLw5rX3kOWr3qDuEsyn6e5cbLopBc%2BCG5Fe46c%2BvjE7b1tZQtcw18ZFTH7x%2FHOwgbXe4njTb9dTfP56OyUrRuCTNLAvWvpfxLvlzW5ddxG68xWMlLGZ9t6IbfwgE1LOp8%2Bpl%2Be6t5rfmjwrrOnVdB%2FLZN%2F9gh9MHdPTdR6uthXUWCxpegl4dFWnfQzS9foApAmyfMCtotqfc8N%2FHj0pQrtHhJxo%2FDDx%2FoKfe2zWnl%2BNZqdhyGjLqeuMpakfQyAuFlqIMIDQ5TZ%2F1NTMlGo36PQHZkb%2BZRo8WjSVmP0pLSpEZipFDwbFOb%2FZPfzQoDZ3dkYwvQAUiWkCXyuJ33fKXMv5wUeZf%2B2XB4AqF1LNB7OWjSqIzQtZy4Cnv5FBb4w6cP0zgY6pgFH8dpF8GabnJJ1yKp4XlqaHS1TCTDClAyWmHfZ7UyL1UBCaHALateHt5v4gJOD8k7T58lnutAtFlztl6BU5mjJdiNHk6eLesBkx%2Bt2dc8HYBUqAog9Flpnx6lbFatwb0wLd9UpJn2%2FZ%2BtpWLDoNnBFAnwILSAtq0G%2FMtxhq6lyWxiCgUBs0U83HIKP0x2T3Ga3bhoO9CMLumUANYJtI8ppi5ZXmw%2F6&X-Amz-Signature=1de35205c606d81431b1cf854ff32d9e1b58614006406c4fa68d76973b651629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ5QNM5Z%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDNMuXLrWxe2tFhEv5ky6zyDYFdrhif5b3G6n%2BMKnjTuAiBtP73ARTjxoZR3jOcMugksSLYx%2Bxi4cIBnnZduh%2FWLeir%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIM2FEjA7ywz3Mz7V3LKtwDYjRfhCq5gAujmnLSdpjfAFNXNISfhcMewZ8dbmEmjN2cNpaQrVO93U53XEcteRmZwMtMf1jou65fV86NTv1YflihXWZbZ%2B0m0zKoL8YLm%2BtZWE%2B%2BkotFWg5rIQAznDp0vQyo2GmL%2FCQPDUq%2BsBMLaMAo0%2FDw%2Bw1Fo1sjwW6cY7Cg1pg1OeF6r9VQsLbpoT%2BoUXzKLpm91kXJWU9JUkAH1LcKK4IlHj9SIwRRGtssPQ8VDocigUUKbdtWd2lon1rLw5rX3kOWr3qDuEsyn6e5cbLopBc%2BCG5Fe46c%2BvjE7b1tZQtcw18ZFTH7x%2FHOwgbXe4njTb9dTfP56OyUrRuCTNLAvWvpfxLvlzW5ddxG68xWMlLGZ9t6IbfwgE1LOp8%2Bpl%2Be6t5rfmjwrrOnVdB%2FLZN%2F9gh9MHdPTdR6uthXUWCxpegl4dFWnfQzS9foApAmyfMCtotqfc8N%2FHj0pQrtHhJxo%2FDDx%2FoKfe2zWnl%2BNZqdhyGjLqeuMpakfQyAuFlqIMIDQ5TZ%2F1NTMlGo36PQHZkb%2BZRo8WjSVmP0pLSpEZipFDwbFOb%2FZPfzQoDZ3dkYwvQAUiWkCXyuJ33fKXMv5wUeZf%2B2XB4AqF1LNB7OWjSqIzQtZy4Cnv5FBb4w6cP0zgY6pgFH8dpF8GabnJJ1yKp4XlqaHS1TCTDClAyWmHfZ7UyL1UBCaHALateHt5v4gJOD8k7T58lnutAtFlztl6BU5mjJdiNHk6eLesBkx%2Bt2dc8HYBUqAog9Flpnx6lbFatwb0wLd9UpJn2%2FZ%2BtpWLDoNnBFAnwILSAtq0G%2FMtxhq6lyWxiCgUBs0U83HIKP0x2T3Ga3bhoO9CMLumUANYJtI8ppi5ZXmw%2F6&X-Amz-Signature=1de35205c606d81431b1cf854ff32d9e1b58614006406c4fa68d76973b651629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FOCLENU%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjpyfvNu6Y%2B0qwsDbRscyIc%2FzUitj0LWdtxf1w2onHJQIhAPXS1SdBvuigksIzUcngT69VdbYPQg0wqZm1FTeTN8y6Kv8DCHoQABoMNjM3NDIzMTgzODA1IgwctY%2FTwGawyZM5yK4q3AO%2BNKq1QZ%2BeTbrOaSIcNH2emT2PmNqFJYcWzh%2BgDJ2Rameqgs65tCTncrohyJSJo8GL7MWAsEEZRw%2BvssQuArLY6j1kK0MJ7h%2FLtc0Q%2BmJpbdkkpEoC1SPxzXxp3VRrKwr%2B75QmUFN5IHAGwMeXp2oJ1kBHmzOllp4ksCHDvKbSAwzP4TKhhSOlQcboYLVBcoVr43PYZfURi5q%2FkTL5qmByOJkjRmTDLHe9ge9d2POoNYYSXWvEiScDM676GYOK8xra71D%2B79SKtEo6hhAaDqv%2F6dEVXLtjlyymzrlxLAgyPpi%2BxcSI3ICnmNXNYEUcJBRI8rhoUHe83R3uNwYbYVl7oedj%2FxSFpLZen%2FFVuTdFWa7DDdiPWv8jnfakU0dkubU8XUVFixQzkH9ovS3CnLKT7L%2F9oh5lw4oXI6gkzHsM8JzvR31pt3fmGsIQik74IDJZ%2BBmauLOoJSMT0jsn%2B2MWtMs3fLLLqLEubmDKjQ6SDoxGirOLuGZCVGUilg5AJfZ2%2FrdV0GoqADv3b3kef1qhaT4XRof4qaW%2ByTF7nql9ryCxaX04chnr3eR7k775VMicUFBCqYA5etQy%2B5FMtDUUj%2FrVGKgr%2BlYpjxTPWP2oryLMnKdWwr6EPHA%2F7zCcxvTOBjqkAebLIU%2Fn8HPZ9mj5pmzya%2FoOltbHlZJFPMcFKDPA37YBsXeXrogzs0J8u8kiFhvGRYbPi5qOOua4CiqrGGifWHeW9tiadgiIaEaVjZWsAhK7b5KuEmVN%2BGOPfDHMSs7VbR5PwOL96gAzZUjp%2BW%2BV6EnASTTbPjmloTnPtnorb0ovAwoAiHVnkIIL%2FGEhSMkkvngidmG%2FXyRPZnNb0sIcFm3Oc0em&X-Amz-Signature=34d8e91ceb87c4b7283847eec80f11ae53e26a2b0244090f648678617f363056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SW5QI2TM%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCccLhd6sbdxj1ONWV0S2C35BO8Rk%2FWJ8GEYpVk0tCQ%2BQIhAOJoXRXvwJTM45SHwxPenG45rvF8uNF32VtFfEzi3HXQKv8DCHoQABoMNjM3NDIzMTgzODA1IgwbBOK5G1ZfEIL%2B4IEq3ANkLLO2V4lzK9hyGqjIq5Sgyi2HxS525jDCYYE2l%2F9rHNts59%2FKXxEhCFFxUT51bbyp3XEHnhO2%2FFkaWczxdhfP8FZ49qsBNzBJW09ifxVIAUJm%2BrXovCxhMRq%2BgjuNNs%2BzUVQuXJFpCyhqQMkwME%2Bm3DkGRpNBNo9qgdnnaIDqK1SPULUHsnsH%2Fw9ztvtlV%2Ft4sI%2B8oODh%2BCcUuz8UTvjerjgpE%2BenB9T0BrPGVKv18LEit6MsakeSRozHttE7iusr7VZYG3JmJn2YYl%2BTVXjMGXJeMkK1Y0uDQF3uiKwAcS3R%2F%2FyjMAF%2FgYP%2FjK3Pf3u2lZ6VxebAjXVtT2IsYNJhHXynLIdW1aeY%2F7bJQizhVxoq7b7eqBOwCzvIrvdL4XsJEHBQ5K0XTvXfmsJ9BejZuZQVHq995cK5lkoSXaawQzIanQ1R4f22zAeDLVcCK82nMOxLG6%2Fp14l7jZ0AxNeCa1lSkJlUlRb7TajIgc2h2l8zc1UVBRP5j65ppFTJZVCmfi3iX6IuelUIWz5BXiw0TjjTOJIkO8CQdR%2FLvHAfBAVCdQMjUL7P4bn02dndtOoGTIA3eJpCogK22vimQ8DpD42lZ6T%2FOPJGK%2FHVwSvyfuGpJlhQZbZdXgqICTDZw%2FTOBjqkAfPzD5sKWWHAnv8aSW3OEwZL6Ty%2BNhZzN9kW3h0cEpehjSzi8FLJ1AJ%2FQVHE7jcIh8d1d%2FwulynVeLkOkataibyavXYo8bhM2vcGwyYA8bMB2iSmIFvZrSoC1re3bMGmhi2PpTwl7iSO3HMqpdlnzxxNt1KDjmMj5t73W26o8iNkAyhqhqR12jBKGIx1sz0Scz3lKxD3xu7%2BXbQF9uwd5d0d8ovk&X-Amz-Signature=94d7531831823c25b85af59caa63cca6dedb286a56638407d744bdbb81e8aa70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SW5QI2TM%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCccLhd6sbdxj1ONWV0S2C35BO8Rk%2FWJ8GEYpVk0tCQ%2BQIhAOJoXRXvwJTM45SHwxPenG45rvF8uNF32VtFfEzi3HXQKv8DCHoQABoMNjM3NDIzMTgzODA1IgwbBOK5G1ZfEIL%2B4IEq3ANkLLO2V4lzK9hyGqjIq5Sgyi2HxS525jDCYYE2l%2F9rHNts59%2FKXxEhCFFxUT51bbyp3XEHnhO2%2FFkaWczxdhfP8FZ49qsBNzBJW09ifxVIAUJm%2BrXovCxhMRq%2BgjuNNs%2BzUVQuXJFpCyhqQMkwME%2Bm3DkGRpNBNo9qgdnnaIDqK1SPULUHsnsH%2Fw9ztvtlV%2Ft4sI%2B8oODh%2BCcUuz8UTvjerjgpE%2BenB9T0BrPGVKv18LEit6MsakeSRozHttE7iusr7VZYG3JmJn2YYl%2BTVXjMGXJeMkK1Y0uDQF3uiKwAcS3R%2F%2FyjMAF%2FgYP%2FjK3Pf3u2lZ6VxebAjXVtT2IsYNJhHXynLIdW1aeY%2F7bJQizhVxoq7b7eqBOwCzvIrvdL4XsJEHBQ5K0XTvXfmsJ9BejZuZQVHq995cK5lkoSXaawQzIanQ1R4f22zAeDLVcCK82nMOxLG6%2Fp14l7jZ0AxNeCa1lSkJlUlRb7TajIgc2h2l8zc1UVBRP5j65ppFTJZVCmfi3iX6IuelUIWz5BXiw0TjjTOJIkO8CQdR%2FLvHAfBAVCdQMjUL7P4bn02dndtOoGTIA3eJpCogK22vimQ8DpD42lZ6T%2FOPJGK%2FHVwSvyfuGpJlhQZbZdXgqICTDZw%2FTOBjqkAfPzD5sKWWHAnv8aSW3OEwZL6Ty%2BNhZzN9kW3h0cEpehjSzi8FLJ1AJ%2FQVHE7jcIh8d1d%2FwulynVeLkOkataibyavXYo8bhM2vcGwyYA8bMB2iSmIFvZrSoC1re3bMGmhi2PpTwl7iSO3HMqpdlnzxxNt1KDjmMj5t73W26o8iNkAyhqhqR12jBKGIx1sz0Scz3lKxD3xu7%2BXbQF9uwd5d0d8ovk&X-Amz-Signature=f29dc4b2cb6ceea92c35c879fba18c2c4457fa2ecc433e661e14eed829e3cedd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYTGBARB%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCP6tdvLnkGSIDgMIuAireEmc6RILEHtTw2OCSdgejDjgIhAIYyDaHs5s4zWZlXHInQJVUb%2Fp9fYH5VbkIkuWxCR%2FMPKv8DCHoQABoMNjM3NDIzMTgzODA1IgxEtvl362ASUKb377Mq3ANhBwoEtOr9SnSOE7D1r4LIOycL%2BekBb6pGoQbXXoAo%2B49U4weckepBRiryHDelFQNuA8LZSa%2FAiZdVa5sEo8vFI0wIYyMYencX57WjQun6CwiRnD2zIXoDFXDdMfvq86H0np%2FOp%2FlNOHY6DtkZ7pDzDTDmW4RTcyXGOa9DjP77MD5GFFP%2FMqRAtIgjua4m7rfheIHLEMNpLdq4zFQpeQrvtYZNQT%2BLMLHWsJil5%2B0rFmipwi8YecCgMHXoH0CzVsVhtFC3qFjbwt703O%2FA9YQWjFEZWvheyluWZgigQxgQFlGfGalpy85XfbzGTAMWM5TLnk%2BuJAJApvPsxI6bQLb0f2cigwTrd4lm%2F1l%2BX88mDNua%2F2xYJcBn%2BrM0scmk1ZGBxrajfTjSNhClvuH2ZuQHZR8gjBx6Cop%2BifFDO25ZenuAcoBhjqcYy1s0aCF1GdoI5uLkxRg5n7Fpbyup88drtPXT0aNDArlS5uf0odlp29gh0TUgaWtfSFnMEwFHI38RbePXy%2BnwCC7iKsBGRweMcegBdEyrqXBnEPDdEU0TUViuFeJTRpMCRoSQRuzgbmA8JycN%2FL2OnYQ9sG2Ks6C0VwH0LYA8DvqS2FsGia%2BmpgaMS4MAGclldfmyZTCDw%2FTOBjqkATVdnt%2F%2Fo0f4p4oedVViJe9KI%2B0SP7LgSJ5%2BF2gX85JIoqSAls6BdCxXwyokwSicUrjYbwbRhN7wij43Yj8GIEMUc8dDaseHHWb5UTwQ8b8fGeDzMx%2BHTaleBQk30CF4Ry4srvFZlwZaOyvyxUjgZopnEcGmw86vv8W2xVmV2p87Rf3lQT8%2FwJIwrgFAmTcXAmIaTCRkUwUhhTA8nc7oWwFCTcLV&X-Amz-Signature=5f8bdd91450d1d8e1748ceea841f5682dcc5fbe7cf145db6ca01ab10e880bf49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XDM6GBS%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCtdq0N0zn3TjfhXYrFX2bVGMjr3k9L%2FupWZAsaGySg2gIgH8eeTtQykR7M1EseyeXW2lOuU4cJXRwv8EGwiHpc2TUq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDJC4X%2FCv3Otrrep1tSrcA4faUielk5SQYgRddg48qeTnDTI5thHLPE9QpJRb8raz0HammKlGkoNXUzcYCIXZK4BcrW7JBJ%2F44Tzd3wklKiQp7h%2FVbJZevzqi9Br3mUgdW5BEm3ulHQJnbQnvy%2FMwmsND9RuI8FIzVye5U3t3gaI6fqs1w50%2Bv%2B9%2B6OmzLHAPci8N3c08oknZmKm9x6Hq9lDH%2FtNPrFnlbuLSdWAxdQViTWUtOWlyCnaIcDJr5raI8iZT2Q%2Fl1JZIL4vaOL1Y034m0WbhHq2YtuKat53%2BTp%2Bkqz6idaZUR8S0fLZbvdx0usZ1nWtwVhB4U9TABGe8xpT2dkouMJah%2BotP%2B21odPTYqIRz5ikln6EpOR6MwgJUQMS5yeQh%2FI24wqJj8XzIRWEph8xCxT4pZOm6W9Ic2KWt5I1bsrDf5HGZYfw%2Bi6auvx%2BX%2FyASKC5m1ZXv5BQ7qvqYihmS%2FxPC0RoaFz6N3WBlAmq1ES5SlOBycXCd4LTR%2BMzsNLJlDqVQWCYSoEL2dp%2BtmJuw9sz1nnnVMWNWrCEbINkiW5BeB%2B02gcgbR5t%2FdBJG4Mu4NzJL%2BVT%2FE1w1DQdsMJxhdPKMZKGfiZuXK9KzDn8ssCGi3TIl5A%2FpqmKf9mafs6m0IxNwGIhwMLjD9M4GOqUBzDN1D5Mfni1B9IoHkN%2F8F%2Fvr06SE1478Z0pi%2FpLi2xiZP5elIQdBoVVUPb8Mj%2FrqVLMahsOc64HC67nKuSEyMnUYlcq1WzkWI1l%2BMdHF6VwJQPpEcL20IBsVyA9r%2BLQMM2S1VaXtx%2FnRupRbGYnQHZHGCdqKANYfC1MlqMTpA%2F7zEET4Be7aFQZ3pydtxXtjo0wiSXhtP4ZcYbYerOnT6SIeDRQ0&X-Amz-Signature=0f12a1366a4345276b4d6ad03084e9b2100a1feff1ba81b8b3d19436d602ef92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOVOUKM2%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID72UyjORcfDn46rg7fTUKgeRosxy%2BO5c86cgPVlEwTmAiEAluKq9JTDTBzQ4xw4GrRyWpzpoGJEPWzJfxN0K8MP7YMq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDJmrSWlz7VvOFt9LQircA1bMFoV0D2q3Ush%2FSB66zaDN%2FJ1izPpJGO%2BRYPFGgLEy6qL9yfXrEykZbkz64zqtRqrPRtv%2BvlVrNfIL56UCra1r%2B4z5QjvO59dtx3V17ooQPO16SJvass%2BGjByRRgBAm0eG68lFBn04HPeJPRDMBTL7I3wTsgceb3guvE4k3cWoaLi%2BoXjzZRcZAuJYUzSdy35C6l3hsg%2Be8YfRSNSzLJJSkS8EwdD7%2FSiw1qQMPUTPcFWRBi3o4G171Te1UQfO4cdQQC571tfh9LsWwnag6ZUkY8jPhADGDBN7%2FCrm2vRSbAGsFd5XUltuRKHP%2FhkU9HwC%2Ba8aA2q754fLgoaHkH%2B8MsdvpjNkqCI8P35lNFKdQrq9hiGWv0p8d6uQfsnCGF%2BpbRNJCwdZR9uwhWStTQo2nzg%2FfF5RARzmsYK51aH2Lzpd9htN72WldXPEh6tfdF4wMKr8%2Bh0MalZab0UGcU7HRMYsxzTOV1q81PihRb7FDb98Z7O%2BnWpa%2BUR5jmS%2BXLV5QbKhcnK7M7kZ6iVVACguT%2BeiYDQGsK5ig6LEC1MiI40qkR0VZr2wilCaLbVi1NbtDAY1NKV5E6zYMaTFgAZ54mXnIGaVbsINmwnNzGK1KZr8KO4s%2FL2buiL4ML7E9M4GOqUBFHpYU67NNi3k2dP84NM4t%2FzUKeS01kn1BFWZ8z4yKpR7bgVLrmCT0voT2a50IiYZmAgcz4WgeRQ%2BCNHrZwDJihOIiIBYu0by8eNa724an7XPWziM%2F%2Fyu5QNrFKGQZ3vpQ%2FekuqnoVE%2FCLqcGIUe5OdbjHFr%2FzliKVOGbdZhEoB%2B7UMUnbeM7dmEaAdwz8RIVtACnPqQsMVgVscloV4L7%2B524Xx4B&X-Amz-Signature=61f67516b571a13a3cabe4d82b5e65befd20976d5c41dbba80279490c5c1a00a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL4XDWII%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC7QIxNYDnBkNMnIVUz7kGt3AP5i9VAabiSQudsA0ZQkAIgZPe52oHnoQdcu9pyzYLBp4JltAxzedIpBgDmyin1p0wq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDCVzEzPDpMgL5cos%2FCrcA26WpnixK1jlLz3XirmWjm4jpGZAPWGAVjxbtjJMijriYa5XD1ZcO4WReqbvI987a0UJ142NvzHBzxtYAC%2FIVqs0rw1%2BAKilgzXvpFV9b6fZdpZX8x4Myta2xzccTsqm2PU8vdh9EoJRukW493qy1X9wpByaxhVN7YzJhSxZOaoIKvUtslZwt3OFd5gnWJAfD87eSC8%2ByKxUqoKDBONkfSeM7rZnHXIPEhSFQsRPdnXUm7%2F0f6yRt8XP4nylaXJGaq9MS%2FDg957o8HmJaOBd7Pry7LUpRJ8VsZB9fbIGpR0VsodQbh7VgM%2B33S%2Br56acWkODSNHod2JZ3eKaa536hF%2FSxtHSO9huck3zPc2A5Y3v78YlzrcSHgmAPvLe54l2g0Jdd8gmIi%2B5Jd43wFkzApGsQHpdCD9TcN%2FBxBscN8RaL1YpqmCpEsyqemJuQBXfoa%2FPtx3ekhIU%2FZymRjMkvtUIhSESWaOB7WhIIA27R%2BIuU2ausmCpfBZhQ0HpqZ8Uq8kCSCiynnMs5UG%2BsxzHYOXn5AyCkp%2BCcar2fa4Dqo3kpuMrx94DyQVQduNI99Si18dGGFqAf%2FK7UfzQeDHJet1%2Fu0MSEiNqylG4VpqpsKx%2FCGZgU%2Frv3BJEMq%2B6MOfD9M4GOqUBlsMEBCy%2B9Td5V%2BDRP9dzFu5KHac4VwsxEtV2n%2FglQpB%2BXMST8W0iYQuX6gIAocEhmE1P4qZZI573GK%2B1WuE8EzseUU9hETDJ%2Bpyxt8ZAnwB8%2BNjU4NKUNyL%2BdX7YUMQRMSn6fx2pq%2BRJwN4caekbt6GiMPG5zxXGg20cskPuAXgtPRcaVjL0GwToCPXfhTcmpYTbphRzWk%2Bk%2FhB%2BMPR30%2FJoCdIa&X-Amz-Signature=1234f37716113b5b2b793620f92cc1aaaf7aefa38708795141772aec2cdf4e81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL4XDWII%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC7QIxNYDnBkNMnIVUz7kGt3AP5i9VAabiSQudsA0ZQkAIgZPe52oHnoQdcu9pyzYLBp4JltAxzedIpBgDmyin1p0wq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDCVzEzPDpMgL5cos%2FCrcA26WpnixK1jlLz3XirmWjm4jpGZAPWGAVjxbtjJMijriYa5XD1ZcO4WReqbvI987a0UJ142NvzHBzxtYAC%2FIVqs0rw1%2BAKilgzXvpFV9b6fZdpZX8x4Myta2xzccTsqm2PU8vdh9EoJRukW493qy1X9wpByaxhVN7YzJhSxZOaoIKvUtslZwt3OFd5gnWJAfD87eSC8%2ByKxUqoKDBONkfSeM7rZnHXIPEhSFQsRPdnXUm7%2F0f6yRt8XP4nylaXJGaq9MS%2FDg957o8HmJaOBd7Pry7LUpRJ8VsZB9fbIGpR0VsodQbh7VgM%2B33S%2Br56acWkODSNHod2JZ3eKaa536hF%2FSxtHSO9huck3zPc2A5Y3v78YlzrcSHgmAPvLe54l2g0Jdd8gmIi%2B5Jd43wFkzApGsQHpdCD9TcN%2FBxBscN8RaL1YpqmCpEsyqemJuQBXfoa%2FPtx3ekhIU%2FZymRjMkvtUIhSESWaOB7WhIIA27R%2BIuU2ausmCpfBZhQ0HpqZ8Uq8kCSCiynnMs5UG%2BsxzHYOXn5AyCkp%2BCcar2fa4Dqo3kpuMrx94DyQVQduNI99Si18dGGFqAf%2FK7UfzQeDHJet1%2Fu0MSEiNqylG4VpqpsKx%2FCGZgU%2Frv3BJEMq%2B6MOfD9M4GOqUBlsMEBCy%2B9Td5V%2BDRP9dzFu5KHac4VwsxEtV2n%2FglQpB%2BXMST8W0iYQuX6gIAocEhmE1P4qZZI573GK%2B1WuE8EzseUU9hETDJ%2Bpyxt8ZAnwB8%2BNjU4NKUNyL%2BdX7YUMQRMSn6fx2pq%2BRJwN4caekbt6GiMPG5zxXGg20cskPuAXgtPRcaVjL0GwToCPXfhTcmpYTbphRzWk%2Bk%2FhB%2BMPR30%2FJoCdIa&X-Amz-Signature=3676e0c7606c6c2ab75c3dab55ae5a264eb89a120e96acb5c0ce074f08a7ea6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRYM4DD2%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEUUKQb8x1EQRkhaxIAxZouS0Cii4GwUkFOWK1lruHVgIhAKfiLVEbuMviyflap7Xzjta0%2BDAKij7O%2BSWeoenWZyrLKv8DCHoQABoMNjM3NDIzMTgzODA1IgwueT7me5zqMPKPxswq3AMZXpuFVUjVxmFzJcFoXKxrwOe3YJyHV%2F1d8RLjxOWG7z83gC9FZC9aWdOvukdI1lTFI1%2Bu8ps7HF3l%2BCxVVnro5pHgAOCYCGFQc%2FSr0MvNs6kSV7fFIXN4ucnxqRUb2yxUnGc76sabvTfXtZfEQAZurXzkTwMAo4Ir0YCTIpOO9Ek9r3Nr%2Bht%2FCNHCwdLY5nfdlWkGA4T9xB4eVknxcQ1cO4h8xNzmWPq9N%2B1efTvXd%2Fdh6jTTffIvVl%2BLlu3Fyt6fGm36CWIbaIgmavSu%2Fv97oZJZV8YJsfCw4gdynHb5AEcSRLuVPx1UzvOkTzQlYUjZ8QNKttI7aZnUTInUFEbXRIAkGcaykYjkHJ2Dzrd42nmn8mz0VnzAkmoLNRETutqiMp9nipZFK8xvuUbN1Dh50gTN7T9U3h%2B7kNWRXgtvatP0Yx99PMx3i%2BDXSFaeQE5mgj1aHHkHtzUFOMsdcGApGIof6IFrt6GDI1OWvlexZ7NtwqZsniuCz7tyCF0ItBAk%2FnMlQ4VTdGY9vnq3aKU%2BPk75%2FdFDs4X2Fhoy3xCnrh1Qh8bZkhOYBqyx7GMrtLub%2BTf9CRwKDNS5mDLuPT1fozRZh5tNCSWvnKyH6IQSE23Ud%2BXwc36pNsBmcDDHw%2FTOBjqkAb9suRQ7l9qdZqlmwO7d2qeyPxuP9HSROGkzUCxqfLTw8pxOGskh2KXw6d0SPTIRmE1AjSzPKFg%2B%2BVgl8c6AzeJJkIHACfaKkwU2nRGO90hMTH0P984n0GYecLmoH9TYCoJviPxZe0OGJ0lRdl04gugO2P7wl9rnA%2F5WOBWC1ZhE0vENfSkLa9FNdiYiJrjxwVMWCzsZQi4D32KXuREzr0CluT9g&X-Amz-Signature=bb174778aec6c013d3eb9d1828d469d5298eb8de65e2698a4dd146d2ffec42ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NRSUP62%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFkWc7IFGIYJuttP0v4q4RUOaKK%2FFQzL0cBwgUf7PTMFAiBBdzRcSb%2BRDeFxr%2FhnDwc%2BNz51kfOM74FK%2F5qqe0MRQSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMbs5roODW7aeRe4JcKtwDU9dAFY53pIMi764Qa%2BI1TratQ3AKhoAo8s9kyFUyOeRfbWdlttw%2BUifh6KZHnOXVsK8hwzgjsKDapiYSiCdJvhGxuDyiyyfa5Lv%2FBtfi6P7VYseTJFXTCZHC%2FVr6StljAH4H7kak4YDbmMucc6oSh%2BcTqVjg76HtD17ExkYz7FSXrIYcnE8x%2FWymE9ElZeBt%2FRrWAR2h22Yz5tfQVPfw45TaB6cV5wlD9OD%2FkMBgJtAqMqLL3wQMjzI9BB5RHOpcrU9oncT%2BWo6ffJ4NKI%2Fn1A%2Bk10Mgn4Ct6J4219UlseyXRwFyBeROKxWccDXeKOsIIDOIti0he0RJE%2Fd7lfH9ygDajrA%2BKPCKVdmCmV7tj%2Fnn45NMaJ6z34oOwCMW%2BqG7FC5pKwzsA9Z0g8aYeVmpPGcUrWBR3Hzmc3j1UTeZ0k7qZt4oNChpCZjqaxvfVvdA7rF1h6hL2yq57U1bwD2WnQ%2FApAR3IJLHASfWEd6rcuJCsj%2Bt3qn3Pj7GO3HmAJ9Ol9WftAZNpHlnoqp1VmPMfPz8XpAuzW7FMi1S3foVP5suo6IKxi6eWQW4GLx7B3D49%2BZsO0hMvDgnZYHHtvpjLBsCx2lFL%2B37Zyg2pEWa3p%2F81VRr9tgC4ziGtsgw2cP0zgY6pgFmiKywYUjjDuAFdwolPhPrtmmtNIf%2Fto0JVyyjGgkU4uR7zI98DXakNyASbZy6F2PLnB7ZOHP1ToCE1Dsc3c5KsRiwQb%2Bt%2B8oPInLN6iXVkO5syr0bhfTHs4SsFiNTvhyPLsbU%2BOac6YpxojmKz4SJITJhCrjMIszwhdU5d2pLyR%2Bf9IGFETeatw2btlq%2BiSJuEgma2AEVPjyjbS8pnHHrniOozSHT&X-Amz-Signature=8da847b7c6d59e647457515450c553b6938efc03a369b36661abd43b82f0f5c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NRSUP62%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFkWc7IFGIYJuttP0v4q4RUOaKK%2FFQzL0cBwgUf7PTMFAiBBdzRcSb%2BRDeFxr%2FhnDwc%2BNz51kfOM74FK%2F5qqe0MRQSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMbs5roODW7aeRe4JcKtwDU9dAFY53pIMi764Qa%2BI1TratQ3AKhoAo8s9kyFUyOeRfbWdlttw%2BUifh6KZHnOXVsK8hwzgjsKDapiYSiCdJvhGxuDyiyyfa5Lv%2FBtfi6P7VYseTJFXTCZHC%2FVr6StljAH4H7kak4YDbmMucc6oSh%2BcTqVjg76HtD17ExkYz7FSXrIYcnE8x%2FWymE9ElZeBt%2FRrWAR2h22Yz5tfQVPfw45TaB6cV5wlD9OD%2FkMBgJtAqMqLL3wQMjzI9BB5RHOpcrU9oncT%2BWo6ffJ4NKI%2Fn1A%2Bk10Mgn4Ct6J4219UlseyXRwFyBeROKxWccDXeKOsIIDOIti0he0RJE%2Fd7lfH9ygDajrA%2BKPCKVdmCmV7tj%2Fnn45NMaJ6z34oOwCMW%2BqG7FC5pKwzsA9Z0g8aYeVmpPGcUrWBR3Hzmc3j1UTeZ0k7qZt4oNChpCZjqaxvfVvdA7rF1h6hL2yq57U1bwD2WnQ%2FApAR3IJLHASfWEd6rcuJCsj%2Bt3qn3Pj7GO3HmAJ9Ol9WftAZNpHlnoqp1VmPMfPz8XpAuzW7FMi1S3foVP5suo6IKxi6eWQW4GLx7B3D49%2BZsO0hMvDgnZYHHtvpjLBsCx2lFL%2B37Zyg2pEWa3p%2F81VRr9tgC4ziGtsgw2cP0zgY6pgFmiKywYUjjDuAFdwolPhPrtmmtNIf%2Fto0JVyyjGgkU4uR7zI98DXakNyASbZy6F2PLnB7ZOHP1ToCE1Dsc3c5KsRiwQb%2Bt%2B8oPInLN6iXVkO5syr0bhfTHs4SsFiNTvhyPLsbU%2BOac6YpxojmKz4SJITJhCrjMIszwhdU5d2pLyR%2Bf9IGFETeatw2btlq%2BiSJuEgma2AEVPjyjbS8pnHHrniOozSHT&X-Amz-Signature=8da847b7c6d59e647457515450c553b6938efc03a369b36661abd43b82f0f5c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644PURNQC%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T185547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDX3J%2Bf9PFARsxXjmbopxxd0atITtfWbnBB4VAcexBYEAIhAP75i59gfJT%2FyHub2Nw0OkigwPN4EI6xzeKSC3598NK1Kv8DCHoQABoMNjM3NDIzMTgzODA1IgxIWPMWl4Zsik8GAKUq3AOcks9w2BrvjjmeyydZmApZvPMIWsqgwAbvdmR0ICTs2BGTw6%2Fzb%2BHYg318pu6xAHSdFMB7xymFYrKPmL4sDo2s1MmXamw01gTKjXr8NrtjWCjcdEbYqFIMxu4kTjVoBAHnz1RzUufF69rpFS%2F5Q3IW28Dj8DmHIiYlo2ztSSl3WzZGfKkNNoU7iEIE9%2BC3LdgaBULcVY2qEfsxaxS4EyYXSMuh9EjViaafLrffmSQiYwhTNCuVl9JtJa3zgaMfDCOQBUJNd4Ilcg2r5q6WxHXLtn3C%2BqGKOtV8ZGOECrLTtQpSetGKifcOfb%2BJb4fQ178pw6XWwl4c0IshakvGQbeKpj3MOkg2pPym57s2GhUa6egLdsSf2Avt5GiufV5eoblPklyAD2qCk6ZljCBKB2kE%2FPfC%2ByXYTiE7fOwGE8xNjwfnSVBEXZM9wr%2F1YEciYtEvv82LA%2F%2Fvd3UaBQ7i5iutqHdRhIgq9QzA0urkwpPR2g3XR2%2FsqmLWLbQwlZz23CzrE8vcjU7xZosTBLVe3QYHUNNwU0xr0IBWsOWm%2FSB2uRogA83hYTmmOtF4P51KsJvtMYfHJ2uTX9qGVqnCSTZK6Na4M6bzbDCCFZUBCzeCbQ838KPFoYFY95E7fzCFxfTOBjqkARFOWxpfRqLQjuhs8N4MfeBbbfT14mcVoo9UVQMrTbQkXsrqrzfqnYnlhi4qJaM1sKRTXFCQ0q7Us%2BaSE6kA9yHforfdnQu23X9mjeso0EwMmj60Ojx288%2BdvNGKwB1r0xcvT7aGIQBRQmxHBmtX6fPtiK%2BA8%2F3LZQQMyYVn%2FvMpwdLU3NcYBF%2B3t0aGrowrds3SIyNeVWvKezzMscPQhJosif4f&X-Amz-Signature=ebc12309598e171a817ea42b6cc953b12501bedf73c9ad4124cdbd36ebe560ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

