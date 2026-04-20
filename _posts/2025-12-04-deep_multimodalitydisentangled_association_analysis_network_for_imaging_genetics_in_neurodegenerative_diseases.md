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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZE6SLBIY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIEDcOAnhz8hQ2fjVeAO%2B0YrPBjEWxW5yVLgG5MnC%2F6O5AiBRnQwKW7gQQD8eKRebbedh2E54hdMNPT4MB4C0bvWKMCr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIM8YxuvXJxquYgoSZ9KtwDufvgxZFwO39qXIQfZOmXi63xYc1INqoLfbdXEfMgn7w23vKgFK6qviI0cr9FIh9gn9keP9SppBGXo5bYncUwfSQvJZrurhprqMgIh28waigspPFjnjlCburkW1DiQ3b4IAzyKNAPwY6QYFnG2HlloebInq%2BLs6X1tLJW6ZaSc%2FX%2Bkg9JWwBAeibGC3NbDPuzRoMFtAm4FkT68ToerW7jozDKUaiuV%2BaCgrrLy%2BFdsHtQFmmq6U9SKV2V5CTgMaoxz1DsDs9ZqvS5um89%2Fzx4wO1VXZs4wqWk%2BZuANG2WncdK%2BDfjPgTFMEM3%2FfoenVk8Q%2BlvDDRXPvSxbtceej0ghHMCAd0TGV53rXZNkI%2F%2BtXRSudNCMFSLBOBBjAGvBXpC3%2Btb4c5j3sEfp0RcbJ%2FYHgbT2faDSdivsbhsESV71WjZJElWR%2FWPBQjHH7CzJPOZ7sppJA%2F4tPf%2BF1nbvwXylQ3W8T2VPgomqVd3kN1IPWxM4zFW9c7TxmMPsJHriclT67Md4GTGme%2F7E3sh4k45x4iZo2CmPqnPr%2FJ5Hw%2BCnIFbwWH%2B2ZyANkYZGGDluiAsjccjUmfvJypL70tW%2FbNi%2BuaU4lKrXjTtOkEX1WypmZTTrsEwS%2BWA21%2BDqv0wv4%2BXzwY6pgEsXv3wPaQsRU%2FpOiql%2BwnFqoYzZWZ7p1AyXbpqmERufES%2F15MsXd8BIRawe83Bk8Xerv%2FGggBvQAyKUAmZnL1XGM1z5NrqBnQn6DmvsMdhABXpzX708ROfwPGLzhHzOqsobvCABzdF1slyKU48wOqJFR6%2FQXrl5qvfzQahB3t7oNKzfbwucEoKPIK8cgwCt8U3WT1RxoFC0UCvIsbwydOmcaEfeakk&X-Amz-Signature=1d3b0f7b2f30764882e0b6c5613fa3660d73aa959707a83ae326119384a8efc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZE6SLBIY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIEDcOAnhz8hQ2fjVeAO%2B0YrPBjEWxW5yVLgG5MnC%2F6O5AiBRnQwKW7gQQD8eKRebbedh2E54hdMNPT4MB4C0bvWKMCr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIM8YxuvXJxquYgoSZ9KtwDufvgxZFwO39qXIQfZOmXi63xYc1INqoLfbdXEfMgn7w23vKgFK6qviI0cr9FIh9gn9keP9SppBGXo5bYncUwfSQvJZrurhprqMgIh28waigspPFjnjlCburkW1DiQ3b4IAzyKNAPwY6QYFnG2HlloebInq%2BLs6X1tLJW6ZaSc%2FX%2Bkg9JWwBAeibGC3NbDPuzRoMFtAm4FkT68ToerW7jozDKUaiuV%2BaCgrrLy%2BFdsHtQFmmq6U9SKV2V5CTgMaoxz1DsDs9ZqvS5um89%2Fzx4wO1VXZs4wqWk%2BZuANG2WncdK%2BDfjPgTFMEM3%2FfoenVk8Q%2BlvDDRXPvSxbtceej0ghHMCAd0TGV53rXZNkI%2F%2BtXRSudNCMFSLBOBBjAGvBXpC3%2Btb4c5j3sEfp0RcbJ%2FYHgbT2faDSdivsbhsESV71WjZJElWR%2FWPBQjHH7CzJPOZ7sppJA%2F4tPf%2BF1nbvwXylQ3W8T2VPgomqVd3kN1IPWxM4zFW9c7TxmMPsJHriclT67Md4GTGme%2F7E3sh4k45x4iZo2CmPqnPr%2FJ5Hw%2BCnIFbwWH%2B2ZyANkYZGGDluiAsjccjUmfvJypL70tW%2FbNi%2BuaU4lKrXjTtOkEX1WypmZTTrsEwS%2BWA21%2BDqv0wv4%2BXzwY6pgEsXv3wPaQsRU%2FpOiql%2BwnFqoYzZWZ7p1AyXbpqmERufES%2F15MsXd8BIRawe83Bk8Xerv%2FGggBvQAyKUAmZnL1XGM1z5NrqBnQn6DmvsMdhABXpzX708ROfwPGLzhHzOqsobvCABzdF1slyKU48wOqJFR6%2FQXrl5qvfzQahB3t7oNKzfbwucEoKPIK8cgwCt8U3WT1RxoFC0UCvIsbwydOmcaEfeakk&X-Amz-Signature=1d3b0f7b2f30764882e0b6c5613fa3660d73aa959707a83ae326119384a8efc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOQZSYWG%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIBgXxmbxGY2VeXZSJf75l4Qxz8PDgigi2WweOoAcOPbxAiBW13jaNVhM24LkLYceKasOiXuQETlmeyNfOVMAai5xvir%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMe7HQsYpKbhcLd6sSKtwDpySbTqVte2tJtJmpNFluCpxIucfgqfZMw1tVrjrsf0tJR6EXMOPfVDyNuaCQAQVLg8XmuF8AT7BmKtnOwZ1yKrGw3qSNKnVjkH4%2BmcScIYNJf398jiRr0uKUrn6WH7HqioNcCMCPz9YpkDetXEKeNsSos52JxHw42KC44EZB34lVBE63dHAISk8jg81zKvB95nm5fTCcrm6OzpaqH6QGeLC4hWtXumcTknJoEyN6FrARkWxijaqydliP65j75w3qjZkZY61go6RxqAMiODkgNSh1DXTouUSUZvLnwzXxIt2vEA11trqyo7wl7fgIJjJUBJN4Sdojm9z5j%2BS3Os4BLIuZRfUWArUbvkhdaSflOxiT%2FEKs96abmk6uWfddaTxP5UL43jU6MU%2FojUJeYXH9FkjgznTj2G%2FpmkOiIBBk0D8exSDa1Pznpmv6HDzi6OtQYiKEsU%2F3plRDyhwBV21JZubKMm0vCq5nHU9tnHr3W2wn%2FxFYw2WdelNu7vyenepp9wy0tQ4JcXeDMCAt0KK8TxwghWtBtle1jUqSfe5jTiSAmnx%2BOw96uG%2BJKe%2F%2FtwKW3kWtrBj3q5j98ua4wByFBvr23Uwg2GxbPXzT1%2BZsdBmLEL962Uhhbe%2FoAYEwvo2XzwY6pgGKFAm7RnJzmOhXMzG6B3j8hZ3AEcSdeB5XS%2BMgPZKnG5h2bVzRRB9HSw%2FQPw6WqIg9HrkPnHh6wgeewo%2FXnV%2FmzP%2FtgzH9EngtlUkX%2Fod8a7rO4ABy%2BMCUPiIOHCfVAPG2ewhDqbw2tSCT9%2FYCLkNu6JB8WS%2FiCLEOt2L5QaF4kcCmPVWIg8JxpjAryHsjdXEzpuO82lZpFHnbbZuIZYZOXP%2BIDJht&X-Amz-Signature=660011b01c664c8a8c1dd511b51577b43528a8b5c2d8e2ee2ad1d4a5e8b7ec46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PPJN5A7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIGk8g76oURDwS2rcneWNotrH%2FO2QTOedheKSJpVaDtADAiAtA3wWwZAJ5zh610owWgL5JehWWh3AypiQJt5ObVgqIyr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMDpwlSjS6sthAl7jjKtwDDNaZ7OZ6ZfxyDRj5YWxGhe5RvGSGvod6xcGrKSV7ULZ6sBU3AWbBYUO7k6W2wuok6d6ogDEVZ5ZOztaaXDXVLRxD5GOJUu1onUP%2B5%2Fk4G9EKlU73Y%2FNtI0w7QkGV8P7Cle89v0Ym1x7MWJv%2B6Idk03jBzdfFLjhqbIPhhBlPZKi2%2F8vlS9fhQxt9mF6EeXQHL6cc7uIfu3tjixxgVzQeaNBwN5jbHkSq3kO9mqFOttO6d7Jwks9WRwe5abKD0liz6d93m2d5VE3huQmyPBu%2BdSh2Fjz%2B2YGKg6HXw2PE4C2VjVlTQ10VBs1xXbwp8VIuNoYKzkC%2B8COGQ%2B%2B2WKI7PruoYw7YpevFVvZdnFQYIudLdqKndHuq%2F1HyWG7gcmjEtWZ1YHzfx1i5nhZIXKmLYSJ1S%2BuVMQpvmiHgNzXzK0A3NJuU26tFsFH50xsHa3g63qqfrq3khFFj01KBORBc%2Bn1u686UrOJFWkWpfCKvoXRE044g6a8AIZ1KwBhMm%2FW9Au97l4wb2klTUthzmy%2FQmWuzmrWrWEjYzBfH2JCmQN1salHV7O0bt4bqFV07toYxkunYv%2F5lqsf0GigSlxa08KJe072BC8x%2BWOEC9s4EtbxWfuml9yRiXVgKghswl42XzwY6pgEo98CPqJw%2FMJMmMQXlaT%2FjiP43PrTd03NH5iG3wVcM5mtEazYpfHtjc3Rbr8rqbu668jJp67EIskicnwwSDJ%2Bblol3wjgTi6x33fwN45voXtifAsklQeuQWBlNv6iEtYAc%2FwrE%2FNp7fKqiiJ2DzJyBpkSVCausmYgymAWjqMcZgz4E7Jpe%2BMJpQkO%2FJznU1RBVGweiXuU5F%2BPAqX9gmt1oEh4ij9bw&X-Amz-Signature=87796e75e13c5dcbf8f4e3031c070622bf32424c5ca907afc28ed6565805a64b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PPJN5A7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIGk8g76oURDwS2rcneWNotrH%2FO2QTOedheKSJpVaDtADAiAtA3wWwZAJ5zh610owWgL5JehWWh3AypiQJt5ObVgqIyr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMDpwlSjS6sthAl7jjKtwDDNaZ7OZ6ZfxyDRj5YWxGhe5RvGSGvod6xcGrKSV7ULZ6sBU3AWbBYUO7k6W2wuok6d6ogDEVZ5ZOztaaXDXVLRxD5GOJUu1onUP%2B5%2Fk4G9EKlU73Y%2FNtI0w7QkGV8P7Cle89v0Ym1x7MWJv%2B6Idk03jBzdfFLjhqbIPhhBlPZKi2%2F8vlS9fhQxt9mF6EeXQHL6cc7uIfu3tjixxgVzQeaNBwN5jbHkSq3kO9mqFOttO6d7Jwks9WRwe5abKD0liz6d93m2d5VE3huQmyPBu%2BdSh2Fjz%2B2YGKg6HXw2PE4C2VjVlTQ10VBs1xXbwp8VIuNoYKzkC%2B8COGQ%2B%2B2WKI7PruoYw7YpevFVvZdnFQYIudLdqKndHuq%2F1HyWG7gcmjEtWZ1YHzfx1i5nhZIXKmLYSJ1S%2BuVMQpvmiHgNzXzK0A3NJuU26tFsFH50xsHa3g63qqfrq3khFFj01KBORBc%2Bn1u686UrOJFWkWpfCKvoXRE044g6a8AIZ1KwBhMm%2FW9Au97l4wb2klTUthzmy%2FQmWuzmrWrWEjYzBfH2JCmQN1salHV7O0bt4bqFV07toYxkunYv%2F5lqsf0GigSlxa08KJe072BC8x%2BWOEC9s4EtbxWfuml9yRiXVgKghswl42XzwY6pgEo98CPqJw%2FMJMmMQXlaT%2FjiP43PrTd03NH5iG3wVcM5mtEazYpfHtjc3Rbr8rqbu668jJp67EIskicnwwSDJ%2Bblol3wjgTi6x33fwN45voXtifAsklQeuQWBlNv6iEtYAc%2FwrE%2FNp7fKqiiJ2DzJyBpkSVCausmYgymAWjqMcZgz4E7Jpe%2BMJpQkO%2FJznU1RBVGweiXuU5F%2BPAqX9gmt1oEh4ij9bw&X-Amz-Signature=5908b39ad66088e8c41c91bc02461561ff2d9bfd2a1f5e236037e67f667bd443&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3KUMCMU%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQC6Rygtt2yiQSAD5G6gwWHdKdo1zw2UyvuoEbSo2CdP4gIhAISg3VebI9oTZmQTZO1c9zL2ojeeA3%2FoRWDhdbkuHOlOKv8DCBcQABoMNjM3NDIzMTgzODA1Igx%2Bqj1HWtVjnfnmxgYq3APPjc1EvX23IToCyW2svct2WuSKsHfvVfLgcwgQDDicJaR7WDk9MxgcvFT%2FJCf42926oKTA5RO6pkIyKI5OyZE0C1eSDOynbRLjff7foqsqGQRhDFOpYc3yn3Qw1RczL6lcBaagTo9UH9wPtV8k29QEhIGx2090yi3WuonzPXBZJ15drJ%2F%2FviHZbXNLJvM9RuOLdy%2BnZ9TjAYYb%2Fh99rEBavPHcvbb4v8F3E%2BGzFXcaUl1rQ9J53NHQ6CGPzPze6W8iZA0ip7cBaO5V12Q96MA4OLFQKB60Ucus2ugkRfLMq4u68MKfCRccCiwW8FVQ%2FSAlc%2BC7eDFhujJed7aP4Wc0kQcpxW4nwV0dXaSyG9udQ1p8yFx7MdrbW7XyKq%2B4gc6DiHzZvazKyxgDFAlT87YLe1q46r%2FYAP5%2F8PK5TOzmGjiTa1UEOhC08SbF06IpnNzG%2BTaDSHI42PQ8zUW%2BSzqLEMzBU8hkOWfHe36L8qJavHNccw87Lj%2FSu115Zors1DqL8hHX9d0IUKGzwmVpqKGiX%2BApVAvl22GBLsdxQZIbtnwP9UqCY%2BRqi3RLhcjgx7Dq4Vf%2FJ1CVBYdchPbTxDV5SiHJJoY%2FSMHhlIzaK1EYGRXMgF0k23MBJSgGxTDZj5fPBjqkAQEpIHJ%2Fo2SbASMTSdEsRws2iiF6EypTKuI8B433l8pUSxbWftGKiasGZ8q3drXFi7XN5LbeLNZqAhHhL5xCMr7m%2ByCMjNOtp%2BKRGg3QgwosGYDBHcxtnIzsDluEQtcpnw%2F9mNOEShUU%2FBD5mybqVdrOWLMBqifh1j71tMMPTYbR8iOkfcbjGMERmom2dh6qdtiqeD9EATwL0maLizrWpg7v1mQa&X-Amz-Signature=c7f1707def591a8dc461d9445a68bebb224bed8404721ced534db88452ef9395&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZUTTCHN%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQC8TtZdqXuvEXixV8IwoZ9EVYEfrsHtPMv1ocykRjrFXAIhAJRbLGaUcJHT1FgIG4ZLiAnTBqnjSHkNxzafJ7yW8Wb5Kv8DCBcQABoMNjM3NDIzMTgzODA1Igx38rdxzXNK7wW%2F8nYq3AMs3D8Za2ftvC0Hb966Tr9j7btrR2eMrAKbgZv1xnnTixw9zjvF06OkbZ2asphDFyNLh4MnEwys2VMUd0mFN0twtgOnRJu969ZZZdDkSPecjVM52VNGaLde146wTmtIgMafQ1DZBZzBcHpM2FFo16zGP%2BfXNG0dDkteLv5k%2FsWNnKHhbSoND0LU4ieUWAlgYd61FGQxtDwn1Z1DCCC1IGh4KSzIaPdnhZZmbEh6m0VIAYbxeadnJaGufzUvzsxCuTmWS223yi49a76KB1XJpPHegkJdLyXUYXybualMWrMzi9S4gA%2FJZOslBUZdNDoTmHmY1gc3eVNcpZbzc0cTvm59URtOvVy%2Bt301eXkMPhQNA%2BjI9mjq5cNy3GV4HczMYu66Y13Dy735H1faimWLRNnUAHqeuANRw1Vak0BcI3NY7%2FhZ6sKBdD1id1tIVIp6io1w00KD6DEMyqM4NpG2rd7MdFwNXXQZFiUSKwPSujJytIbkyYs1LgIes1s%2BmkahmC7PMWMgG4reMsckhFuknbA6wtcNpE1d%2BV728ZYYEs6eO3JLPXeFG3NNNekWiIirSFw5qAEvp9QBBxVSG20RoLpZ62glKz%2FFpkVq0XSkAql2oQverLNI%2FXQyqHOsijCBj5fPBjqkAeA4KnU8q%2FbP4W7rTCcyghL5PRawzHgPhC5MQyNOGpbTtqi9U9HHOol6K1qCPSDEsKkuhQXZ6q5%2B4kqMmCtt5%2FTaCPoNgVkr%2Ft2pzcnP7q7fwfuir5gRds8hOOPjSJasXDZuUdSeVqt681krb%2B9yYieYZV7TSm87F8LDcPN7q0hKWIWHbzwmltSvdIsqRPnTClQg7JlPresbvMLYwpNOjnCfAc8e&X-Amz-Signature=e10ab29e173b888dbb1e9f2c605319756f8728b7961aa862d34b877cfd4e365c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRQ4EXOS%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDM9N2CvWZNWNuxn0nrPDbIcDYD4dVzchgTAhi3IEXacAIgaUNioLSqCV06d8m7CUWIEEbtJ6NnMMbBHq%2B%2B4%2BOBNuAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDI1q95zKmMArLer3nCrcAxU55Xrc7DoVwh2v1udBJqSJ5yAk9RI7GGNyOZ1Mq4iBjisqwuTao5ec97jsDJqQZItNa85aRJ5XlzQRq8t8wbF1QSwogax%2B7mLQAgqcCazOk8Alg6xhYYIhvwPjaTvhhF%2BaNGWoQYN4uT8F%2F13rJXYqU9QDCwEYBX5Y63AB0K%2Fo3PPo2Bd7iKe8YHt1bjw3QVxbC8Ft8b9DcNPilMGV0KCU5VYfuI2nypOFQn4UHP1t3nPuC0YCeMXrfjWsSeW1qtF0HUJJ9EI66Hm7FequUxAih3ZtkSnxkdYxJRu7n3o5dqzPw5qzAr8SKLfhHG5GjD0Q10lC3rFfN93TbVH8CDfeXD54%2FyXkV72dYJ19ZT0dtIHGyS4rkkljfk8nKyzPR9NsJzzKb6y0zJlmjFSaylNpUu2kIo0HEOwLSJyuc93NlETbscw4QskaWf6%2F1VedwPb3TLA9J%2Fw8pwrAi5g3sJfX1uc9lY2ceR%2FTl%2B4L8uXlav1LLWpaGagz3D99LLIVNlr6tU%2BjmqUhynEQOa7orkEe4w%2BAoIHVV4IEcdP%2F0GN7xCAtj2byVENA3culkTej8%2Bn48OtIqplhb9jhfBD3nW3Hy6zXBRrgq7yQxjIUezGzQ55a6pR3Efdw%2FxKGMIiOl88GOqUBYyHZk9UC2hTEO4hlGKrQBBw%2FEfiuBJpJ1gH4LoJTIHWGCDhLFxIfwaj%2BVq%2FHDG%2BUII86XT4OOjNBpqRcTItdbZcTL5mZJPvxM2r5nYYdtmKdfdI5ByszkbJjqf1XQUiDnMsoGMgPPNu%2FWRAuZlLBAFEbOmsnZgzvo4A5jfyxKVbaIffZtOz0XqZabBw4V1cLOHtrSXZ4Z1azYeS9XSZ%2BEeqEkgr7&X-Amz-Signature=fc8b4172bf6cebfd0164c056c0c10a772ec321aca8dcf00d317619c5f0292623&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGSJXEV6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDH9peCXWp5u%2BOmMllBjMHkxnVigkCsKaSZP7bIVH97iQIhAOJ3gsJFw03hiyzu3bEe6oE3%2F8uZ3el%2BLIKwon4ceZdxKv8DCBgQABoMNjM3NDIzMTgzODA1IgyEs8ZCyBUZiCMQ2TYq3APNeaXgsdiGxX5ttqBHdIIIlgFv4s2Wbi8AJ50h8azK9vXIHwMPubtecrSr12rl265Np%2FWeGMCEtDb0SZ3fSNDk0UDXOPTRC0skfeYR8E5UJgB%2BhvXt0BL2wlRzYMkOVsc2k65xaXiQ4MuS9GjDyCIsYhXUIB50Z3BnRM%2BJaLoXZn0Hk%2BJREZ%2BKEemzbEPnXG7aGIw%2FNLwt5xaAjNE71%2FfWVBvAUU43FqFXkb3PzWFHkbkXhVOdaaXiVrOY7dmxpnH6tHPICKD%2FZzjMtCekiyHveWqB7Qz2l2NNuHTWQsbd3Q%2B8LF%2FdULZ4KAnMUALPwz36rJ1UrexAoR5GFnrJ87YtT%2BfmpW0uQzT9wkUKWjoHgWvj0qm0mqzlqaKP%2BIvgwAdxqqVVlxs4jWZa0dac7vnQjWFr4Y%2Fh22KQs0Ky9xxFmPSq%2FW5i%2BWVoeqcRw%2BdE%2BdKHLuyMLxCdA%2BZyixNOkQWfn6FkeJ1h9UirLldUP7dMAN79LjzhVabuzomZFMjYzZgOYPWyWNKfwYllz84pIt82rEseCiM%2FaML1NI2mrLsfpclyF%2FnaDZ0zi6TzczcMHa0tqmUlrpkG%2BZ7TKRdBt%2FRq7cggnzjmmWpbgkoNj6B3bLws%2BVV8NiKZr%2BnlgTDzjpfPBjqkARtGL5LoNWaQBwzyqvSu9lImL5wXtPzLkucLtn6xZhIZEkIqn1EF8FOSsVAn824PjnPqSXX2Fl1b4O1YTNqd6u32L81RQrV9xMcTRzhAhRx48eeyKr7%2BfY%2F01dTQ758rwIZGLoz9%2FR0eJfWy8JvvyrQnlFnG%2B0xqr3w4Lo8wKTb4awPpUSG7stVZyl9tf3ehYDIF5KQ%2Bt3g117OXrvsDeTqf57NK&X-Amz-Signature=f13d229894ec7040f5ee27f606b28a03cadf234f30a0a17edc142353b76b0559&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGSJXEV6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDH9peCXWp5u%2BOmMllBjMHkxnVigkCsKaSZP7bIVH97iQIhAOJ3gsJFw03hiyzu3bEe6oE3%2F8uZ3el%2BLIKwon4ceZdxKv8DCBgQABoMNjM3NDIzMTgzODA1IgyEs8ZCyBUZiCMQ2TYq3APNeaXgsdiGxX5ttqBHdIIIlgFv4s2Wbi8AJ50h8azK9vXIHwMPubtecrSr12rl265Np%2FWeGMCEtDb0SZ3fSNDk0UDXOPTRC0skfeYR8E5UJgB%2BhvXt0BL2wlRzYMkOVsc2k65xaXiQ4MuS9GjDyCIsYhXUIB50Z3BnRM%2BJaLoXZn0Hk%2BJREZ%2BKEemzbEPnXG7aGIw%2FNLwt5xaAjNE71%2FfWVBvAUU43FqFXkb3PzWFHkbkXhVOdaaXiVrOY7dmxpnH6tHPICKD%2FZzjMtCekiyHveWqB7Qz2l2NNuHTWQsbd3Q%2B8LF%2FdULZ4KAnMUALPwz36rJ1UrexAoR5GFnrJ87YtT%2BfmpW0uQzT9wkUKWjoHgWvj0qm0mqzlqaKP%2BIvgwAdxqqVVlxs4jWZa0dac7vnQjWFr4Y%2Fh22KQs0Ky9xxFmPSq%2FW5i%2BWVoeqcRw%2BdE%2BdKHLuyMLxCdA%2BZyixNOkQWfn6FkeJ1h9UirLldUP7dMAN79LjzhVabuzomZFMjYzZgOYPWyWNKfwYllz84pIt82rEseCiM%2FaML1NI2mrLsfpclyF%2FnaDZ0zi6TzczcMHa0tqmUlrpkG%2BZ7TKRdBt%2FRq7cggnzjmmWpbgkoNj6B3bLws%2BVV8NiKZr%2BnlgTDzjpfPBjqkARtGL5LoNWaQBwzyqvSu9lImL5wXtPzLkucLtn6xZhIZEkIqn1EF8FOSsVAn824PjnPqSXX2Fl1b4O1YTNqd6u32L81RQrV9xMcTRzhAhRx48eeyKr7%2BfY%2F01dTQ758rwIZGLoz9%2FR0eJfWy8JvvyrQnlFnG%2B0xqr3w4Lo8wKTb4awPpUSG7stVZyl9tf3ehYDIF5KQ%2Bt3g117OXrvsDeTqf57NK&X-Amz-Signature=a97c52394fe59e4a2de514d2c09e71eaa6d608191505458d9190fef84d2832f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQK2LHHS%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIFExeMFhSWQXb7k9BGlphDfsA54a936OyPIoUp4l8HgKAiEA2T3sTouVDFaBEuzzd7tl%2BIDdLM4Gz9W8cGaLQSvbdmUq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDMPRPGSuQZkQzliabSrcA2oW4T%2FDExgq7i9c0DO2I2XJ3zSB%2FVApTkIehOrp4YbMcJXl%2FqrqlOkeaR3f1Hu9POUlcAZmYX9hrS3JvWgwKrJkhldQsrdpd54f0ebQpUxeXi43Igz%2B3bg7pD5Bpx4zMOnhHKXMuEPHG3StndLKd8bFOmDlGggTgEssWcfEmnWfzZlxUrRpd7GSOsIHBlY%2BiNc23UrdjAgJG7JkRAaT7F0z%2F2BQHxD39JvdGHgIdkXjqydA5s3lOTuDj7WgALwpY0IPRSguttmsCbCy4rJdHR%2FKIYZSQu%2F%2Bzm%2FaqtcbukvvuzoB7bmmTDHeIm4ZUfNBkUMYgvVBSGr%2FQSeCyrq9orNoauytNkU027kiJsy%2B7EKdtYucOD5kmABZB4Mm4um%2F4PCARuueFlQwfo3QkIjyufAWUTJr8j5Bl2SLyKBsUX7YOQMFIEJCEMN1og0XUetyBZGCsK7MbqvvfGMYY6ZtLx0vOpmru67T7SEUQUQ8b%2Fl5yzSPE0114d9gbLX1Gr8WpIs4E8ciAPI0sSvmFgA4S9HKZO3VaTl9hs30ZbFJwsOlElKVeUqXepKkES%2BHDYUMKSoaBt9O4GpMdn6uLrBme5I3mlAEsPeNRuP9a4ntnXJAuiLwKRHhAb5qA8BcMMOOl88GOqUBzp%2FCLD%2BwVEv5JiTkpZgmqNP7FoUzroDsDsLjy9%2FpgIPUtIzrYTGco0CRr7VPmf3YwhR3D7MsiJ7uLZGrJav5%2FlTApMSv4kxIyGqowRUl8A%2FQfgJDzP0cTTiUBqT96QPZK0nofBuhAQ4xabRugwLvIZ1VunPPNIUpzF2scxf%2FqLTuNDlxHUT9PmvDPeOvuJgXZEjOpazTorwELG3NU9i1RBCIH16v&X-Amz-Signature=985723c801d0de6bf43cbfabbdfd986d3c3bba910909ad5761d29675c6ddf148&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YWDXTW7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCCrK17vD%2BcbqLseGnuWlLLOsGEl8YMtL3LXASOBT0SLQIhAIDlNjjiESNsBiyXPT%2BvX1U%2BA9A6I5PYPxWh%2ByXI%2Fwv6Kv8DCBgQABoMNjM3NDIzMTgzODA1IgxFBjlbVZhCQXew%2Fzkq3AMBLB9KdOkhWaeDt%2BBTXLrhtTWcn5f4lHrmxmLWkoDHaro0Lfbi4oEr2uOrtS36birpQ9mT1sxUsOFsBF1RY75shnwhTrMupPLxDSLjrGbH4Mi65YyHxKGUgIGsGDftRs6okOiF1oASsmEWyQtBOUDE4VkImXcpgkctOstlMx6bwi2CeMHTnq9l3fhvNIoxjEOaw8TjJjiIYMy5DL%2B3GTUjOOY8MuUpB6agModO2ryzM%2F982y3ws0K7OLpwC6GziW3xhradMgqtNumFfqXph4FfakpfoQsrQso5SMoRE10dfowzS6tPIKONK%2B0OOiEx187VJdmpoqRGFQXQsF2L38seflaFbgIvkQR41TS89Nrt2fVK6RVBrxTAwCtyelFB7xc7Pc1UUjC%2Fgu%2Fi82pJCBr3vmH2l6i2H9nAhPMIGg7t%2BkUY0jqk%2BSaiVLzGC1WibagHYk5nnQExsf4m0enPI93GvmafPpZ7eqn5q1gNpD2o%2FUxBYd4Qyk93mB5KsFHYvMzMg%2FkB%2B10%2FPz6AJllnShNtIxQOsxtAF57jSLvCG9BxA2GRNd2J6iHzCRYjZXnGlSh7Flj%2FWn1h%2B7K8LNDtR9AFsCho4cWyh9hPN2JaQlxIr6l41CqzyG9ByjFfdTCRj5fPBjqkAVA01qtLRrmy%2BeK5gCKiu%2BD%2BI%2BJZT4i76D5jH14SM6RUXd2fFaYJCbVXcVlTyZ0fM5BT3kQ7e8uCfH2Wy%2BJDdL6RfA0VtzQ5sjPRTDPqkpkOq8NZu7N0S6Q8W7bXhwt0AVa0Nb%2BVYaclh80KjszYHzynPB4pLsANMN%2Bh%2BTopCRrLaAIFFWjigVfknpSvx4yoIe8wgBRBNU5jp%2F4wtZ33C7KIlWHM&X-Amz-Signature=01e0fc02cc7016439551e53cfca92ffcd667f93555c6b5686cbb24653b625c6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YWDXTW7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCCrK17vD%2BcbqLseGnuWlLLOsGEl8YMtL3LXASOBT0SLQIhAIDlNjjiESNsBiyXPT%2BvX1U%2BA9A6I5PYPxWh%2ByXI%2Fwv6Kv8DCBgQABoMNjM3NDIzMTgzODA1IgxFBjlbVZhCQXew%2Fzkq3AMBLB9KdOkhWaeDt%2BBTXLrhtTWcn5f4lHrmxmLWkoDHaro0Lfbi4oEr2uOrtS36birpQ9mT1sxUsOFsBF1RY75shnwhTrMupPLxDSLjrGbH4Mi65YyHxKGUgIGsGDftRs6okOiF1oASsmEWyQtBOUDE4VkImXcpgkctOstlMx6bwi2CeMHTnq9l3fhvNIoxjEOaw8TjJjiIYMy5DL%2B3GTUjOOY8MuUpB6agModO2ryzM%2F982y3ws0K7OLpwC6GziW3xhradMgqtNumFfqXph4FfakpfoQsrQso5SMoRE10dfowzS6tPIKONK%2B0OOiEx187VJdmpoqRGFQXQsF2L38seflaFbgIvkQR41TS89Nrt2fVK6RVBrxTAwCtyelFB7xc7Pc1UUjC%2Fgu%2Fi82pJCBr3vmH2l6i2H9nAhPMIGg7t%2BkUY0jqk%2BSaiVLzGC1WibagHYk5nnQExsf4m0enPI93GvmafPpZ7eqn5q1gNpD2o%2FUxBYd4Qyk93mB5KsFHYvMzMg%2FkB%2B10%2FPz6AJllnShNtIxQOsxtAF57jSLvCG9BxA2GRNd2J6iHzCRYjZXnGlSh7Flj%2FWn1h%2B7K8LNDtR9AFsCho4cWyh9hPN2JaQlxIr6l41CqzyG9ByjFfdTCRj5fPBjqkAVA01qtLRrmy%2BeK5gCKiu%2BD%2BI%2BJZT4i76D5jH14SM6RUXd2fFaYJCbVXcVlTyZ0fM5BT3kQ7e8uCfH2Wy%2BJDdL6RfA0VtzQ5sjPRTDPqkpkOq8NZu7N0S6Q8W7bXhwt0AVa0Nb%2BVYaclh80KjszYHzynPB4pLsANMN%2Bh%2BTopCRrLaAIFFWjigVfknpSvx4yoIe8wgBRBNU5jp%2F4wtZ33C7KIlWHM&X-Amz-Signature=01e0fc02cc7016439551e53cfca92ffcd667f93555c6b5686cbb24653b625c6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAAKTDNT%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T070710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICl2Sj09DBbfJ8%2FtoxX%2FS%2Bt8e1hcvbLtfIDfbZQt51EbAiEAjJLYIsBWFrhh7tg9yY%2FdPBwgJ72PptaskScavrHAFlsq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDBiPCwFBvTWxUbyDhircA9gJue%2BbqgOjQfF5xpC2hTBeeWZqcZZCT2vDqeQOqqri0J10UsmQbTRSsQE4vuMSIDonWfbzbdjVtkGD85JKnDJ1fXDR1L57dFMagCw1Xgla%2BfqYBdspz7%2BigGQ8Q8WdyJ5QlQwfc%2BNYhKmLa%2F%2BI4MMREkks9XIlzUg7GjSkP75DnESEqGBN8P%2FK6twuezNn1L1PN2tOV7LnyVtniT1%2B3JK76TduSG6ma9aZUvlGRx7qkWQ4g0AeJ%2FEvZF8nCvwCuUKbl0KaK2%2BMWyTmYuGkq1MuvKOey%2FBAzO8C4p4UdKZ8wAzdgWqA8B7zWaamSq4PzVH%2BiTmDGUxhALIjFs91Fc3ZtCJQrEHPGsllsEflXut15JYuYZa8EBQaNTfj4PM5WX%2BwviQsc7AVevHV8szV5BkBziiyXBHd9Wwy3OgTDT5UqXE4CzoA9SNEUf49hK61QrNB9F%2BBEDK707A%2BL3JLDxVAH6vd75ioFr5H%2FWqv9sSJicu9yAde%2FESyaoINz1pbU4ztJUsMbOATQ5pJCkz8aVxrUyL0HEhV4ScSjp6IaT1VHvF4TdLG9NiQ2axde1R1scsiXj2BSHiC7s13KdHF%2BaG5BVp82JeJPAdLtfzjwlVpHIS%2BBaI66ydiZ0jbMKaPl88GOqUBAw3xLzsFiyt9Aeyqq2uZ2feC2qrGc7DUGAFuafwu1DSxvw1eDR95igyX2ehDGHna%2BqzJV4U5BLv8ml791F5HTJulkuEoM%2FRToxEKIQDHK4%2BKcoj9N31L2JRh9nHa8OnwBhj%2Bf%2F4tKycO3k9ZaoVNQkU52PM70Oxm1rMhG3QFXU9vwJMPo9wDujj0Gyn5PgnaCrsePf9AEghT8ImJJmYdSsNFZndQ&X-Amz-Signature=250e102ec6f310fd1b8eb95aac50885825db16b7a001da13cf94cce16555d035&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

