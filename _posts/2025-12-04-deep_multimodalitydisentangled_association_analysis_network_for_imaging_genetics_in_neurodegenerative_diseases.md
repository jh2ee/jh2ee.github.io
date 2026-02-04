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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDDYL7EO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCzCiznLsp70qqhj5%2FR39Bu5usCt1%2F51jzw8rQDlBx3CgIhAMetgJYq%2FY4QQPRzQ5%2BoJjD2pkr%2BKC5nhX3gay8MNajJKv8DCBcQABoMNjM3NDIzMTgzODA1IgxwYxSzEaHaaeygygkq3APjw8BimEdJt1nm%2FOPSYotVXPFsQPSkyJoPJTcSw1nuv3t5WXKdmujVZwkOL%2BOjmN1nrGtU53nm4rna0Uz1kz4ct3V%2FHKBeqE%2BGo0qD%2B%2Fw0TfH6LZAaW0S1RRE6ySHgHEb8gLuMPrpmb0A%2FBGPIQEg8rqIaga1kRwofWjmELHCOzipNlEB7aPxa6lbx3GIHWypZAgeNeNTKvMfWRNrxQGDwZXvJLklP9dhZ6MtHRbhX5ZvBrMuMP6a41UWV0Fr3t12m96uJADLMCCTWA4wAecfb%2F0dlvDA2AQLrcih0W2YMZFlj9vr7wLcL9dRPTsFXg3DuE71L8L15OOCoaxoq75fGd9F3ZT%2FsIGIpuPYajE6tL8ncBEhFF3D3mi1uo4EW7tGyvjPRRpra1beewjteYmUd7Xt7XyMtHyfUjU1sL3aLKZaguExb%2BJfeqWsdnBmmmvvv4w%2B%2F2BE7eUe%2B2mw5MWuj3VWHkuiu8B4xQcY8yGc2w8g7%2BGAe%2FCt8vmpPr3XVN7rzVHmwWRq7gQMu%2Fk3dOTz52QbZn%2BxGUkljaq6TpqEJyQKeSOfxqEsY3TBlKpCFGo2SBk8EpuRVEpUlQyXuiw6YqxFeN8GhfbUnvRCtls4TA%2BxXAXSDRne9eSnrejC8mY3MBjqkAZyFNFEkXBLhRXliGrDHpnm60d8o2xYeDhDIlvbCUr51oaizqbMuCu0uqzLLxFy7ehPF388iR%2BhNXzkyR5JFbGIaZ2CQLgbwOuDFhrjIRAKGuoQIT6TsS3YBatMA0zG5lJxR9pAXrD7Fu3zXlTZh0sLIqL4bzTbmjXyW%2BeKH3RexeHkCxQBpN6MHpJUcxAZfl%2B5tYs2H7BAe9ld1TZ94u1OAWiL5&X-Amz-Signature=ce01bb115f2be18f5261db4203fb2f5e8ddaf72b6b7ca0bc5bace41799e571cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDDYL7EO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCzCiznLsp70qqhj5%2FR39Bu5usCt1%2F51jzw8rQDlBx3CgIhAMetgJYq%2FY4QQPRzQ5%2BoJjD2pkr%2BKC5nhX3gay8MNajJKv8DCBcQABoMNjM3NDIzMTgzODA1IgxwYxSzEaHaaeygygkq3APjw8BimEdJt1nm%2FOPSYotVXPFsQPSkyJoPJTcSw1nuv3t5WXKdmujVZwkOL%2BOjmN1nrGtU53nm4rna0Uz1kz4ct3V%2FHKBeqE%2BGo0qD%2B%2Fw0TfH6LZAaW0S1RRE6ySHgHEb8gLuMPrpmb0A%2FBGPIQEg8rqIaga1kRwofWjmELHCOzipNlEB7aPxa6lbx3GIHWypZAgeNeNTKvMfWRNrxQGDwZXvJLklP9dhZ6MtHRbhX5ZvBrMuMP6a41UWV0Fr3t12m96uJADLMCCTWA4wAecfb%2F0dlvDA2AQLrcih0W2YMZFlj9vr7wLcL9dRPTsFXg3DuE71L8L15OOCoaxoq75fGd9F3ZT%2FsIGIpuPYajE6tL8ncBEhFF3D3mi1uo4EW7tGyvjPRRpra1beewjteYmUd7Xt7XyMtHyfUjU1sL3aLKZaguExb%2BJfeqWsdnBmmmvvv4w%2B%2F2BE7eUe%2B2mw5MWuj3VWHkuiu8B4xQcY8yGc2w8g7%2BGAe%2FCt8vmpPr3XVN7rzVHmwWRq7gQMu%2Fk3dOTz52QbZn%2BxGUkljaq6TpqEJyQKeSOfxqEsY3TBlKpCFGo2SBk8EpuRVEpUlQyXuiw6YqxFeN8GhfbUnvRCtls4TA%2BxXAXSDRne9eSnrejC8mY3MBjqkAZyFNFEkXBLhRXliGrDHpnm60d8o2xYeDhDIlvbCUr51oaizqbMuCu0uqzLLxFy7ehPF388iR%2BhNXzkyR5JFbGIaZ2CQLgbwOuDFhrjIRAKGuoQIT6TsS3YBatMA0zG5lJxR9pAXrD7Fu3zXlTZh0sLIqL4bzTbmjXyW%2BeKH3RexeHkCxQBpN6MHpJUcxAZfl%2B5tYs2H7BAe9ld1TZ94u1OAWiL5&X-Amz-Signature=ce01bb115f2be18f5261db4203fb2f5e8ddaf72b6b7ca0bc5bace41799e571cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKGT2PNW%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIH7waLDf7fOEooi2jtcN81DfdsjIxyqDKmi3xa8lFERsAiBeilyeW28rt884YERjXO4J%2FNoL7qDmRbu8iT8Xb5yfpyr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIM7LsYwGiCN4EVOrbRKtwDU%2FKn8KcX1PCXRcaRzXzzeMYRQqg5F550o1W260qMHQ4Lt%2B2%2Fg79aNuGyW%2FCn8qP9WeHW8m%2BCcLbGZF9h5QadkBpVazwwmncoY8WmkqB0M2GKvqkUp1xnrA6%2BZr2ayBFMmi8io9iTIe7ALmnvVoC3rwpg0f1%2FpCPr6JBpCcNCnO87zUsEz8zgnuzYevmeaV7Jke6%2FrMmpuun2czXALQZJ7SjBM%2FmBr8so5el9qgUbws9LNEDydV933HzZArO3QRg3aP8r6teS1UAbIuLP%2BcZ90rlnkWQRp1MmgMiaCE2Qz9eskdnWpfrDNC6ivkd2t9jm1jeoSoFLomcNMIO2%2BtEA9nLWyBt%2F38LvshnDY3f89lG%2FwIfpgEaLOs8mEb5Tas4Y8Q6RicjNlIE43hQMgavjXwCXJrFGjQ3y9r3vflKbY5oYd5uZ8FzTKne3SBtEPbM8tegZ1SIJULq9v7R8gJZWQ6ZIOwrdBHppFOONNayUx%2BWnqmQGdspl2ElM7fa74Sb3PK4W6XqfIb6DP7ASGQ61JZW89HeemH50lp2MqWsSOChIWfXimiNrDtIlk53TJNjkWWhG9xDTso7QiqVwWpnf2kgWFwt27XJFENnWBfHv%2FhxUOimy2es25%2FYoUdAw1JiNzAY6pgF1Q3NFjFZ8rOugyfg5UiCHE%2B2BVCtA24iyQfvX4gw%2BN3teIonzJLv4e30kz%2BEQvUluO8sGQOV8XY0gFwptmqY4JsVTwrWNijkfwUxDMVgoMmEKZGTwBAdzPTFiupxVRvaMDqF2597tajCP0guMgllA11F%2FnrB5wY6qUH2o4tmwVujvp%2B2saF85MCFqNeqbn0loOFaJh4cK1CJhsLjl9iXSqbeWmTPR&X-Amz-Signature=412d5f020c0db5412908c84436f03fb6d1aad612092a63a23b9d15455924208b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WV3FOIEO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIA6haSuFQb5dgU55ua8TxyaQFKw4rnDkVyz6fWBZmSudAiEAw4G%2Flj%2BGiKs5hRQoGfTB7FbdzLXruy1xk70KY9SagLcq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDJdxCrvDQeJR3BxG4ircA0UESUc0uMkUmt6OTnUR6rkVG%2BZBF2Bp1%2Fi8cbqo1vQGDgBLjftVI5%2BH1jlT1O62IGCKVAwk0HxrHnosSp2ABSBtRCW8oMaEQhBJ1d0q0a%2B3IMRR2WKvHVnT6u3ACEdz7JIIH7VK62bWgRzURQhkIryDvsGPfUoLG2fvN5oFXL%2FN13IaICozamA3wz%2Fu4xGyfUs5EIiI51hp8ZH%2BCDf9dYusdvvTQjY4gRi%2FxBYeW9qwMqEI27KnfHTMycZlcFRUoHHPd2wdjDTCNRQpdpHwcKLeYCzuUV1Rt8fverCPWi0WukqJnuPDIJT%2Fsm1JftuET7DR9COLWl1YW7qlXooy5YMa7mXCH1JWc%2F9PlTibdSxWmuCBxRm%2BDzSFTb92DPUst75KX6cITKTwchwj8PK9YpY07OFy%2FP9HDxKxXjjomm1D1%2BzhWJify84yGfq54IiRjz3TsJVvqbWgIRXt1syQ2lUFOWbBvCVZ65DrZymbZEGICO%2BREQCQpgUJ6pM0lTScLIQjQZSENSZ%2ByEzYH8%2FjgRAIj1xu7rj6F5U9%2FZ6Ep39HJTjqqGZd5iKdtQvxEBZPEfv929Cp%2BdH18zi7cxMPRlteQV0n5Ag56iX5vQZpvYWDKgnNEXSbi6GWLmQvMK2ZjcwGOqUB17JQUj38YkrWFFTLSg%2FOczmtTdcUkBP6tB6ExiD7fRJDZX19e78rVs%2FrPsohkiHw1y6X%2F3P0XDG%2BGJ5fnCh0DPY8LC2lYDnzjO06WoHVUIDutPKhFwlLStX8jS%2BWpTz1N1yc7irF%2BwK8Rc0VfFZ5Tr4C3nLhgKFpfoCz9qvknxHSEnn0EWtO9yHkTvwyEugUMjM1pLGD%2FyQiL6%2FFf4tiqkgHiwtR&X-Amz-Signature=a2cbd7a34c334a63911e9eaf0364cb533741af82b38a4012335a075af9e51c37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WV3FOIEO%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIA6haSuFQb5dgU55ua8TxyaQFKw4rnDkVyz6fWBZmSudAiEAw4G%2Flj%2BGiKs5hRQoGfTB7FbdzLXruy1xk70KY9SagLcq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDJdxCrvDQeJR3BxG4ircA0UESUc0uMkUmt6OTnUR6rkVG%2BZBF2Bp1%2Fi8cbqo1vQGDgBLjftVI5%2BH1jlT1O62IGCKVAwk0HxrHnosSp2ABSBtRCW8oMaEQhBJ1d0q0a%2B3IMRR2WKvHVnT6u3ACEdz7JIIH7VK62bWgRzURQhkIryDvsGPfUoLG2fvN5oFXL%2FN13IaICozamA3wz%2Fu4xGyfUs5EIiI51hp8ZH%2BCDf9dYusdvvTQjY4gRi%2FxBYeW9qwMqEI27KnfHTMycZlcFRUoHHPd2wdjDTCNRQpdpHwcKLeYCzuUV1Rt8fverCPWi0WukqJnuPDIJT%2Fsm1JftuET7DR9COLWl1YW7qlXooy5YMa7mXCH1JWc%2F9PlTibdSxWmuCBxRm%2BDzSFTb92DPUst75KX6cITKTwchwj8PK9YpY07OFy%2FP9HDxKxXjjomm1D1%2BzhWJify84yGfq54IiRjz3TsJVvqbWgIRXt1syQ2lUFOWbBvCVZ65DrZymbZEGICO%2BREQCQpgUJ6pM0lTScLIQjQZSENSZ%2ByEzYH8%2FjgRAIj1xu7rj6F5U9%2FZ6Ep39HJTjqqGZd5iKdtQvxEBZPEfv929Cp%2BdH18zi7cxMPRlteQV0n5Ag56iX5vQZpvYWDKgnNEXSbi6GWLmQvMK2ZjcwGOqUB17JQUj38YkrWFFTLSg%2FOczmtTdcUkBP6tB6ExiD7fRJDZX19e78rVs%2FrPsohkiHw1y6X%2F3P0XDG%2BGJ5fnCh0DPY8LC2lYDnzjO06WoHVUIDutPKhFwlLStX8jS%2BWpTz1N1yc7irF%2BwK8Rc0VfFZ5Tr4C3nLhgKFpfoCz9qvknxHSEnn0EWtO9yHkTvwyEugUMjM1pLGD%2FyQiL6%2FFf4tiqkgHiwtR&X-Amz-Signature=f2f87404a6966bf12b7bd079836934e4a516df95b085b1200ed9dd2931f71901&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSS7XF5M%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIEDXI38vr4BrZSq1p9NymodPptluzD4zsAFj9KXvO2lBAiBp0KBE5Upu1ehfXxw541KRiPgIIfDGRrXjNYQRDZeC3yr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMEBvf9z%2FTmMHbpN4VKtwDAwttXc8o%2FcDjkOWx0zEhwOkXFhd5lvlkpGH1LcP%2FsCFBzzULF0zj5qIXATjYbwW5KrIIbU5uH8CuRJgrXzCtrZBoXCYcaMlwc89GeD3xg98Pub%2Be0wTg3vUwRx2lWrNUoyoYV3Qrs4t0i7XKAE8kJZEeCaoZPwTAJKABsuruRu2JS9xtUSPlw0zIqAHJmx1lb3MA%2FKauSjhZ5kNBNeqvdXFFkuEASqZTAHCTIt%2B9YWwfb81ecOvkJB8sckRezGRJHTpQSuQGXDI81FNekuE0SdlqkCW1Yiw1QCBVs%2Fa23GJvmhrogM3XcTGKgvQ0nOZfsHynG4A%2BP31djr2sxly8cE2FgClsmlri9D2CAzwcwEUDd2gvzYGta%2Fzlyv1WZTlJLRDHGw5DX9Wn7eqleRsx4nqDI3tZiTc1xjMcNAbYoc0xCOt48zrInUav33Ssi0%2Bt4RltR4sW1Gg9gXqDTj2%2FeA%2FP%2FIBzNE%2FqXcsBbNzjfHFk7ye9Fc1mwQn%2FfIqvYx0NwR43NiGcNzIPVIBYzzfokSaSaOcx%2Bg7UrirSO%2BlMFxm5LNJz6u3pqnoYgr8Su2P2XyoRaEcoKHjhnZjwEsFDDdaLPILsi8I9sBg%2FJ97xnJzU1iMfWLFD0SZu4qEwo5mNzAY6pgHR2nH28o8ho%2BM6Ryr4vBBLaGblqoauIso61%2F0PAYApk223P%2BNI0%2Fe4hMdm1nZT62iMWbh7b7nEaHjGoqrkvNn6Cpu20xHptCKQLxo7BtAeqIrvD5j48QWBl0flm0dvtnT%2B%2FIXepRAnCK5vWD18WIzctTdLapZx0ca0tdygkqGVVeUiWUhl3fzX4fhnxhIWupjoy8IhQsXkzq6Rnv2jIaOIcfNtqmuL&X-Amz-Signature=a371db20572b2f7c46374ecd43fd2c3471138630ed9ce3281a22084b5ca969c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TV3ITWCP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIDuEySqN16tPB9czqxv1HaOxYqITdRgBcUsDrmRuCEi4AiEAtqLL6o2P7jJO9DmiADw2tABSDoZkWHwGfbzO%2FzlXCMcq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDIuumEh9qrlTMhS%2BoircAz22ItCCzedXAM4tAtMW21vaL0ER74%2BYF3DeAxwHnMZxqtyNHN1Qs7O1TWteSyH4TTciwjIAAVm9V5fKYKWayWliQCAoJExx9TMkC1BMh2KdyxBxsnYlcHyKyKDv1M%2FmE6j5bHQtJ5lEbbOxC6vnnxBHrnrnpBDLKjcOVSx9s21alkts8SFqFB%2BzHzjwKZ9U9eeMRJEpG5Xx3EI8phc%2FRl7napUpAAqZ5JLfqKzEdQbDXKjUL3EIyI8kKsbJwAb3BOXybjHOv9u7JPpMAWz0BTa2HLDmEHhdVrKecWzhVAju3mrsxn8ABHPfq%2BRq8kqPLGs%2Bi0d8iwY%2F8HwuR2uU%2Fa6R2F4sd%2F21gRZs%2B%2Bt9rAfqJn6TKXKGWKw83ejwUITEFvsxkiZ%2FpvekOT6%2FiaYexgwrOjvZ5nljzz9qyzbUG7ItN8j3JO9XcFo%2FCWL1ZIUwqbaWehWBm9Ciw9f7XLx0OUQJOnCO3YXR2I4uEK8N57lFBggycEtawzezg2lxzpSWrrz%2FWJ2ATe0B44TN8Ucf1BZSFth18gfcwLIMSF%2B0WUN3vB3PG8pc2wfDRltS2M29CoxL7puVELwC1C1zUrFuvLHqgZPGmqm4PdKAdj2zt%2F8%2FeiO5XXuhk32hbFZHMK2ZjcwGOqUBCX5INNVFudhThSNYeurDKCg00DMH1rASGjnE%2FNLbQFFELogzIU7hRVDZvk2KP0w7omqUyNvBWZIVrFjxxggNyUmP%2B8qzcOwYtEUm6DX3OvLFMBzbNL0m9O7BRUDcEMCsdO%2BW5aBmONHXvcmxLkTPNX6PB1aRM%2B%2Fnb3sDhdxkO51rKk3X6aA7TBwp3bevgMPn%2FJwYKT0EVaAypwHD2eUgLuZ%2B1zc7&X-Amz-Signature=bfbe96992c0b71b51951fabdfab86c091086a68eaeae09c5f7ee29e25848f150&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEGWAEPN%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIGlm1CJZJI12D8Fcyr1ahtY15VxHvPmOcFpMhJ2DDKVaAiEA6szAYywxgnNL9Xtp59SM6gDyXzV9O6eikoX3r0BxWOoq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDALPugV1sG%2B8OxCTIircA3aEN5b6EJOqBb6iTDU9XxfxlkxqhvYISThFeQoL5EzJre2u%2BFGF60xq0IAtSUwoBw0N6l1GcHrel0eIm20%2Fga%2BM%2FJTDTI9oQ6wiGYthZ%2F4pWep8Rfd%2F2Eeg3r6RFmz2RPF1Z0V6ZdEr7bdLJUTto0JSK7ra2PjRRRbIK0mpdz3LQ%2FowRC0c8CbSWsRL2g3bc82GAo1n4lbfcn9%2FegfknNEfRAsGfgBtLRECHmvcn%2FylTac95xOUDvg3q%2BNXq%2F5%2B1Tsbzl3KSxJvlpBSA82Nzs2rVdbiQgio0h7WONQcuyMLxsMLjPl9cBRlmsuCk4PDhxvBAuYZPfEqLb%2BIxf%2BQKrh1BeU5sI83Yc91q0cUMSN4vBuLGvFh9dHvWUgHI72oqk5tuN0gf7kxzluPMeWnLWuZVfxDkMGG8BboZrREMEryv0AzdT61LgrUjZs%2BVsaUXGyS4qiHaXrh84f1DXr1fTmkiF6TOaDWJCakXOZ18XUcrQaED6T9WK8GL86DZ852EVdBy70vxw318aZc1y4kFdWb8hsDXo%2BMD3wz0wDbHMAnKH8O2XrvUNuRllBjxjc9HThaqtt7qSNeV5Sf4uJDiR9vKrwJkx%2FhwWbYLZF6zskuUSO%2FmCgMUSMNsnXcMK2ZjcwGOqUBL2RBC%2Bkm4289WFi62uD2n1yblq3G5q%2FeExbhJct0HqVM%2FYAfQK5svFsHrITic3dfFImPaLlvBThO3q0cch88mC7xjAsbq8I4Y2VG03vBmN5jrbfpW5EyAkmAJVSeHiVR3lHEGUTB6B7%2BeuM83ZNp6ulc6xTNwzE5nFVkPdtbcDMfr5kp3wCpoL0o3Q7K5CAl16x98k%2BosyADnuHfZSBOLI%2By4i7t&X-Amz-Signature=4d6b41b7de8e89bb53fb80325c0868175906735a0e694ab3db35c6801dd9903e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BO2NBE6%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDlCf%2FHx%2FnMD3yPOKY%2FE5TXV8Ku1KX3qGTrQyUgJU5LkgIgW887ztHoKavr4IMvEVoJ6IYxeP7aCqIYbBP9l9nlDS0q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDBPXsB0IFhFcVKuyDSrcA3CWnrSbtTbvCLVjOMXPfiAaF8St1L6hlgxldQs%2FvM4a063Vbn7orpsYvFErj7Vj4G2COZqnLiBMFipPojoaQ7lf6unZ%2BB58LUd%2FuvKDNvC3fZBiM8R5mpuX0sHRlV2cFaSnCaR%2B7TeNNzfU81oMk4CXLyf8xs17Ht%2BcIV5geRH2s5R1%2FYU90vU4MXY5%2BstdqEou%2F6u0pBkD8abkvXHyjPABIbNVx8OTGnkKU9vojPe9gD2Ds9cmDfBm7F%2BUCnRHsvhluKhX95829NbMYpMT95P0d0ppJvTP63Mt%2FTbiSUqyQdEZ6ky6%2F0hOcpLyDxglsKxG8vEthx5Xg%2B8IqjWqor2Tb%2F%2BBprwnjcueuc6eFrb4fThmY8WQZYBdiOdNetk8ullGCGe2ERNVzGPlFgmeEA6EXkkjbraz%2FXEA3qLwVfbh%2FLcrpG5KWgJjAjPq8DV4lFHrJJit4sbrT9uz6O2FO%2Bb0X2%2FP78LbB4FfXfYm8J4wlilNQjhLbuPQrI9jAyr0ih0%2FY08RD%2FWlkra2g7r6w6q%2FRLvUKW0l3IhBGQkvI44PpuzD%2BjbEnoa%2BttKzX%2FQNBi15o3UXkNM2c0XZSO8fZOo9xmmKnKz1J%2FcJph8Xw%2Fxvmu2eeey6voWC6fPeMJ%2BYjcwGOqUB%2B0fyVG5UJ7H3L6RI%2B3ReYGmImJqlJz%2BRIQBOq54Czyolk8g4b2OGH3TmEeRpkRvAWULb5mciNZ4DAsQqClqRPJ08bKPijBjkPq%2FiOCp5rg4G60r3pltQc1k%2BnXwnJ8OxfHp2%2Fhc9wgs0YroY3eftqkzV%2BaR4VOG9LjaXrvzcRURkPPmqxYyd5ElIMWyHLThsOO4HIyuvGEiqwkvZK9RReS%2FVuIb5&X-Amz-Signature=c61939f95f03c77d7fe0526caf24be9cc125098b2900598542d1b0d9315c8fb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BO2NBE6%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDlCf%2FHx%2FnMD3yPOKY%2FE5TXV8Ku1KX3qGTrQyUgJU5LkgIgW887ztHoKavr4IMvEVoJ6IYxeP7aCqIYbBP9l9nlDS0q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDBPXsB0IFhFcVKuyDSrcA3CWnrSbtTbvCLVjOMXPfiAaF8St1L6hlgxldQs%2FvM4a063Vbn7orpsYvFErj7Vj4G2COZqnLiBMFipPojoaQ7lf6unZ%2BB58LUd%2FuvKDNvC3fZBiM8R5mpuX0sHRlV2cFaSnCaR%2B7TeNNzfU81oMk4CXLyf8xs17Ht%2BcIV5geRH2s5R1%2FYU90vU4MXY5%2BstdqEou%2F6u0pBkD8abkvXHyjPABIbNVx8OTGnkKU9vojPe9gD2Ds9cmDfBm7F%2BUCnRHsvhluKhX95829NbMYpMT95P0d0ppJvTP63Mt%2FTbiSUqyQdEZ6ky6%2F0hOcpLyDxglsKxG8vEthx5Xg%2B8IqjWqor2Tb%2F%2BBprwnjcueuc6eFrb4fThmY8WQZYBdiOdNetk8ullGCGe2ERNVzGPlFgmeEA6EXkkjbraz%2FXEA3qLwVfbh%2FLcrpG5KWgJjAjPq8DV4lFHrJJit4sbrT9uz6O2FO%2Bb0X2%2FP78LbB4FfXfYm8J4wlilNQjhLbuPQrI9jAyr0ih0%2FY08RD%2FWlkra2g7r6w6q%2FRLvUKW0l3IhBGQkvI44PpuzD%2BjbEnoa%2BttKzX%2FQNBi15o3UXkNM2c0XZSO8fZOo9xmmKnKz1J%2FcJph8Xw%2Fxvmu2eeey6voWC6fPeMJ%2BYjcwGOqUB%2B0fyVG5UJ7H3L6RI%2B3ReYGmImJqlJz%2BRIQBOq54Czyolk8g4b2OGH3TmEeRpkRvAWULb5mciNZ4DAsQqClqRPJ08bKPijBjkPq%2FiOCp5rg4G60r3pltQc1k%2BnXwnJ8OxfHp2%2Fhc9wgs0YroY3eftqkzV%2BaR4VOG9LjaXrvzcRURkPPmqxYyd5ElIMWyHLThsOO4HIyuvGEiqwkvZK9RReS%2FVuIb5&X-Amz-Signature=87a0370811d07f6a9712cdf410b72becf9ceb8cb16b59f3810c4a8c326ec1be4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPVOEPLW%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDbuN8%2FeUeZWf9XGdujznFNJ0VwtZH0ujjqYbYKCm1%2BlQIhAMq%2B8U2TSH3VTraqgsTC%2Fc1ZiRM26w8LjRq%2B5FAfrpoHKv8DCBcQABoMNjM3NDIzMTgzODA1Igyhg7B93zpJfzvB7J0q3ANrQI1Zwng46H%2F1t3fZmCofFrVhfawm8gfpOw6dZvmBifg6GTQQTOhsoKDkR5U0pfk9jnwVAn88f5ejtJ1x5I5MCeJISIWpBN6%2FWRVWM9B4K4%2FjNOnNe0KsaR86HSxxNRf29pxUCvq8bistHrivZf7MjdbTDS0mJ%2B9v3XsGrcgkRYbFWT46h4Ai%2BC06CJokLF2NbtvRGkPnEIAkIDoUVTkudDaPZ7G39r4vazvnZWbe3lWzAE0WxczIc5O1z6vb3Htuhu8xQPjOnF0SKKxuPCg72IsXUzObryKTSWdUMsORcFv9OK8wazv74FKz%2Ftx931frPrdDUCulfi4dRMv81Aai04CmPq0sYlsWkF8ot5qLVOK6cdZfpQWv6LohdyNRtp29TQAHiqMCl4GUytD6CZraKgRqPMHtPhNjsFtZUPw1IZb1dh5GGApdTtMtkR7VmMrgFi0r3LUZ5ZMBnhwowqg23p1Yt49AAQQigCHRagDIef9MxYdqOMDCEQH0L8mJ5hxo0YxurJccrDF675PxPTd0syy2KlSJ544DGlJm4wiq2nyYcckwf6D35aJ7U5e0RgNVs%2FUGfIVpX1pC8L5tKuxVZLjO2FWq8uU18NWe%2BRKJ1ObJsNt%2BZroeLT0yEDDUmI3MBjqkAchLwW2P%2BRqEGm6hwMlic5%2BfNa67Z6CBOzxDZQMOLuZhRgwodH7%2FX3MHYdr3bi9cuI8WBQieur5v7CCY4cfynt3RPmPIUtISaK8yHg3hWN9v7VMv1xsBs6sWT6P9my8gml%2FU3J%2FigJPp5h%2BSSUmgnkLhaRBC3oPGAHtjCMbnCUq8ONvWK8vl%2FSiGUpnJQzf%2BvFpT52aH%2FmJm7B2PCPEfDRGqYefR&X-Amz-Signature=d4ce5e0e7e1cf5020d4e7b5637bafa4e8dfef5b183679b887008309082001e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNEP74JG%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCHJyNFAs4xBQRfJ3SE0DzwfsXhW4cz%2BPRuu59kWQfqKgIgLHXjr1sp0zRYMLid3DaSGTIrwyDwNnkJ74Lv8SzHXlsq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDAff3USvBlydFn38hSrcA2odWjhI6A6jV9i%2BKZX8NTbGp%2FTieQcl4KbY4EuiZSAVIrzOqB2NOMP6PfAPAnP2C9KCoYHuWb36eOBR%2FXAEtiq0RyaZIg9SxzL4tB%2Boo62btkz6wOgKimwpedQ%2B%2BVMYuHpHqMokBFBxvFB7vKmjwa5kpgH9aD2pvVS%2Fg%2BUzQD85eX%2FCXO7MVFc3NmSdL9MNdMTj0BcoINduBDDmyPYaEp3wUwVXCkLEfqpuhvQGulsaiAnbDjYN2Ldivwf%2FVlYYFzT1r%2BAHnT5%2BBMaTY%2FBChClPb%2FVRH3I5NOKbBywlarsqZyj0%2FcdZZ7VICNK6NBqIOsy4RFl%2Fd7S1v8AdxpdN3l1h6JCkGPO%2FFCJlowXA0pkIcNjRr%2BI65skt1h4mY0cw0cZe%2BZbXD8%2FMbreJyo%2BDoFlnlOtR%2F4x6E6IsUVljrqeeQPPpKK1Alz51o%2FkNtLm9qPns028aJML717zfNmmbwp8XCQuBZc73GLODSka9bZFYvpPrzMcINxeFA%2FlpFsV5C%2BqNc%2BsHLjNE01qrUTnKb%2F3qjWgCfAyM0TfJyoGPG%2Fpem3ik7%2FhwjAmCYobNPazhRDxRMQknxD0xRbrFiXNVi1ICwy118zw1zhlVsmKi%2B0qjJ%2FiVTPiFewp5C5wxMICYjcwGOqUBVdJOwVh2jacn34vs4QLQf%2BjJ9pu23jhxmsL7lbtsfQsRnrRAyGHoCMxEFR0CiJaWvzoIX5hQ9EOC51LQtHd4VRLJh44RiDTHT%2FxwTO8uNk1z%2FGrYGF5IrSlwU3iiOJh4ZQLn6cizFMI4bWh3Pfc0xKwc0RT13Wh7CDicB6wGH7Ycel6M8foaCCaW%2FxB7YXxM4SN0WJLvmK1lc3ILk4pgmD7%2BFM38&X-Amz-Signature=7b151421f9a6bd7a82bdc6c045d2d5f0ca6980081c57ca9c02936bfa6b068f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNEP74JG%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCHJyNFAs4xBQRfJ3SE0DzwfsXhW4cz%2BPRuu59kWQfqKgIgLHXjr1sp0zRYMLid3DaSGTIrwyDwNnkJ74Lv8SzHXlsq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDAff3USvBlydFn38hSrcA2odWjhI6A6jV9i%2BKZX8NTbGp%2FTieQcl4KbY4EuiZSAVIrzOqB2NOMP6PfAPAnP2C9KCoYHuWb36eOBR%2FXAEtiq0RyaZIg9SxzL4tB%2Boo62btkz6wOgKimwpedQ%2B%2BVMYuHpHqMokBFBxvFB7vKmjwa5kpgH9aD2pvVS%2Fg%2BUzQD85eX%2FCXO7MVFc3NmSdL9MNdMTj0BcoINduBDDmyPYaEp3wUwVXCkLEfqpuhvQGulsaiAnbDjYN2Ldivwf%2FVlYYFzT1r%2BAHnT5%2BBMaTY%2FBChClPb%2FVRH3I5NOKbBywlarsqZyj0%2FcdZZ7VICNK6NBqIOsy4RFl%2Fd7S1v8AdxpdN3l1h6JCkGPO%2FFCJlowXA0pkIcNjRr%2BI65skt1h4mY0cw0cZe%2BZbXD8%2FMbreJyo%2BDoFlnlOtR%2F4x6E6IsUVljrqeeQPPpKK1Alz51o%2FkNtLm9qPns028aJML717zfNmmbwp8XCQuBZc73GLODSka9bZFYvpPrzMcINxeFA%2FlpFsV5C%2BqNc%2BsHLjNE01qrUTnKb%2F3qjWgCfAyM0TfJyoGPG%2Fpem3ik7%2FhwjAmCYobNPazhRDxRMQknxD0xRbrFiXNVi1ICwy118zw1zhlVsmKi%2B0qjJ%2FiVTPiFewp5C5wxMICYjcwGOqUBVdJOwVh2jacn34vs4QLQf%2BjJ9pu23jhxmsL7lbtsfQsRnrRAyGHoCMxEFR0CiJaWvzoIX5hQ9EOC51LQtHd4VRLJh44RiDTHT%2FxwTO8uNk1z%2FGrYGF5IrSlwU3iiOJh4ZQLn6cizFMI4bWh3Pfc0xKwc0RT13Wh7CDicB6wGH7Ycel6M8foaCCaW%2FxB7YXxM4SN0WJLvmK1lc3ILk4pgmD7%2BFM38&X-Amz-Signature=7b151421f9a6bd7a82bdc6c045d2d5f0ca6980081c57ca9c02936bfa6b068f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPW3WNR5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T135317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCSGPzNDAHU2GTEtUpRSwAxVOkiaJN3595lwSGRvYvSRQIgcOy0QZ0Py2%2Fz9GCWjuvQGzk2lM5ui8SdmXbY2IymOYIq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDPqByY2WauN9Fcxk5SrcAzFtzlpFkxPHUTdCg0DtEpleeJrTtzPN%2Bylcrw9GuPXNuj3nnzGDKZYk934NzaxOLupan9hE7FODsHPeQt2LYQ%2Begq0Jw0r2s%2ByHKzfO%2FKNF77DA1JkEiQDBbVq2XF4qoul27rFe%2FjmyOjkul61U52vlMb8ZJOWunnnOwIKp0UJ%2BMzu7Nu%2FI5vJbdwn3bZ2uNf%2FKjfPn4xsDbfdgeGIC2o0S6ZKIM755CwQFAC%2Fhdw02mj%2FwBS%2B9TwlFvetI2Wxfo55Gpr3BPlSpnbSzecEDuEOcVicMjtcWe7gC3uQJUJDEFTCa6kXNrL0xzZzinqI73eMt5PVvGuKTWefXGBkM0Km%2BcKh%2Bz6ETmMyCVaJ5IFsGUxelMxrjGejRNkHqO3QNHtr18jNCIjZ03%2B7vQyBigziqh0c6S9ew7fPsj%2BTP46NBn9deXNFKN%2FHKxSQ47Z%2BqzELJlvj8tcYjydrfyyplYn6QxdlDRvANQuJiVk%2FP5isVNYv3%2B4CrygL9Z4GJ%2FjlNpxsmIkZPbXTBN14566PkkdQXs1baAD9fEc8SBe0hfMwcfB9m6gtRQ3UK55Kff4BGEjD77vkJYuRceJHItm58w0ZQgl5zHRoyhM0m49FIID%2FINg%2BqbKLLOTuPLq%2FVMK2ZjcwGOqUBMY%2BoqPbACWTEROQe7C2ZnTm545Q9W0i8lyoZibN5pF3%2BvIfgJv%2F%2BM8o7n1sJbHpIuzKinSVtsnIA90XSQbJIJRfACf9vCLWlMysVN5qElPZI9%2FlAtK%2BFM187s8MFtMOfa9Xy1VVN0FvEQScIoWuzsZmhvKUkBSUs%2BbVMqLfEEwGEuXta2aNTOmVtq0eUagkiwSp79j9is1fMJaTCRsbttiBjZa7w&X-Amz-Signature=46f27df9c3add736f4424711bccec1ae9483a5f5cda3d4a95ed3f0d2f152626c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

