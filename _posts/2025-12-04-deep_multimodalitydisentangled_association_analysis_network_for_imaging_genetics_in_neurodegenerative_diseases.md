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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4NZ27MT%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDO%2B8cEohc4AjoMgpOhcJsukgkdgtnTVwEI1Ape5W1S%2BAIhAPKKLnyK0cuXVo8Q%2BxxhwpksC0kV0boyImCbTp9y7ANzKv8DCEEQABoMNjM3NDIzMTgzODA1Igx5pVSokmngo05lxvoq3ANe4IacxDoaJuOaHeS78jtyMto7Z%2BhK%2BswoOszOAcYBxVtwRqLVHwqQDfs40i4Ll%2FclFRfmFuTKuu8R9Plse7ShKx3SM5KiwHkf8nODjlE8Rqz%2BDHMncpoPIFKxGM9MpmbYwuq4OA2v1ZG22HdpNeazb3etS2lTUxLYT8kGCNG1bG0SKrcEicizbJjNNtIvrElamSQN4u6emNIh8p%2Bybv8XWPPYQr7Uv35S8azr7bxhm5kUdI8L5RHYlMzEZz32%2BgoVJFkPxX%2FelmgpTCzPAf3aHcXdiaSuVdYY4hryy4%2F76ZGUR78MMNDDmbxGADKPRk2mVZ%2BJ3XYDubSo21tVZbRGrwZFKbm9H4yGuhu01bSSZkQIttyTPdUL2pfi%2FgwLo6v%2Bkc9fjGblgQWnxFrXSMNJuvtaaqfJ%2F%2F6emw9vKHnYgmD0903e1oKNvT6RBYEOQXYjXwqMP0isNdeciuIrPrzGMavfhDvMpZ2eaPcZokxdbWPNAnFEcp3Iz9FbjGaOJfvEB3PQrw%2FBQlP8D%2F7BJj1JWSvmucvyoFFwoWhrUw%2BO7Nwby%2FHEwBUyQgtdTnc1l1UuUssgoTlbC0V6v9wcxLybDGfLYJZhAFTiAZrVWFYEMSX1l8vlKIxB%2FjdJQjDkzu3KBjqkAZI3gtxDcE%2FcBlB8Q8Ov5ysez7rK0jjEe3OIBEb9a8oI%2Bh6Ng%2BBRONFok6aiXnT3Wtag96vG7asvyTFq5rOHfImo97ZKS2gZOysbC9%2BtdvPXLi0B8OPlRqLhpArpZ5g3Z54aSxYUC1b5qanNOq91HMfczubgvQMd3th46FjY3h%2FC6LVEI4q3SRpEoNFoJ%2BnHAhepo%2FmwMpzvimRUQQ4aE4JldwG1&X-Amz-Signature=536900251861f742798ae4383becff8b7c03faae96d87cd8cd8156a5cd090431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4NZ27MT%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDO%2B8cEohc4AjoMgpOhcJsukgkdgtnTVwEI1Ape5W1S%2BAIhAPKKLnyK0cuXVo8Q%2BxxhwpksC0kV0boyImCbTp9y7ANzKv8DCEEQABoMNjM3NDIzMTgzODA1Igx5pVSokmngo05lxvoq3ANe4IacxDoaJuOaHeS78jtyMto7Z%2BhK%2BswoOszOAcYBxVtwRqLVHwqQDfs40i4Ll%2FclFRfmFuTKuu8R9Plse7ShKx3SM5KiwHkf8nODjlE8Rqz%2BDHMncpoPIFKxGM9MpmbYwuq4OA2v1ZG22HdpNeazb3etS2lTUxLYT8kGCNG1bG0SKrcEicizbJjNNtIvrElamSQN4u6emNIh8p%2Bybv8XWPPYQr7Uv35S8azr7bxhm5kUdI8L5RHYlMzEZz32%2BgoVJFkPxX%2FelmgpTCzPAf3aHcXdiaSuVdYY4hryy4%2F76ZGUR78MMNDDmbxGADKPRk2mVZ%2BJ3XYDubSo21tVZbRGrwZFKbm9H4yGuhu01bSSZkQIttyTPdUL2pfi%2FgwLo6v%2Bkc9fjGblgQWnxFrXSMNJuvtaaqfJ%2F%2F6emw9vKHnYgmD0903e1oKNvT6RBYEOQXYjXwqMP0isNdeciuIrPrzGMavfhDvMpZ2eaPcZokxdbWPNAnFEcp3Iz9FbjGaOJfvEB3PQrw%2FBQlP8D%2F7BJj1JWSvmucvyoFFwoWhrUw%2BO7Nwby%2FHEwBUyQgtdTnc1l1UuUssgoTlbC0V6v9wcxLybDGfLYJZhAFTiAZrVWFYEMSX1l8vlKIxB%2FjdJQjDkzu3KBjqkAZI3gtxDcE%2FcBlB8Q8Ov5ysez7rK0jjEe3OIBEb9a8oI%2Bh6Ng%2BBRONFok6aiXnT3Wtag96vG7asvyTFq5rOHfImo97ZKS2gZOysbC9%2BtdvPXLi0B8OPlRqLhpArpZ5g3Z54aSxYUC1b5qanNOq91HMfczubgvQMd3th46FjY3h%2FC6LVEI4q3SRpEoNFoJ%2BnHAhepo%2FmwMpzvimRUQQ4aE4JldwG1&X-Amz-Signature=536900251861f742798ae4383becff8b7c03faae96d87cd8cd8156a5cd090431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSHHVGXP%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIGeVEukqqGM%2BLgkqL1%2BMvQaku2zBKCP7D%2F8UIy70hx4WAiBiVWtH%2FlQCL8s9pY6ZbHG4JdlMnjpgI4b9vfLDSyjgfyr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMRy%2Byi2VpO7FJKSpMKtwDKg5F6bwyltf0bWzrYfbORSKbxaE5wgUQGH31lpkYy2h8ySXrnV%2FOFQuZC3WOAIbj0fbhpl13ohDYiWAfJ%2FutnpF53psi3vCbqjGYuzYiKZfUibUGSjF0j8pZSDCy4AgJAdPtP29oJhvD5LEhhPqmD2aLhV03M01SDYPbjmTCQIqGPQEXRTWakXXeRUXEXZuSrxK8NT5VOZRC3tddnOBF8ZEGjoqoVZqSQLZzsspFKHp04NMWYvOY3zztMwi47u%2B8cW4nwUfGBvpAVhiT5B%2B1f%2Fgat81g2r%2B35c9IkTaiZnvUwr0%2B70QQ3GBjtit%2B%2Ftt4XogreoDg3ICYjPfrTu3VgGNWYIZ5s7uN3fFFdABjMYo0YBOzM7mYoXymcWZ%2BUag25kTGhVxGoP8plES7xBywwKc4DWP4MYLTzf1y%2Fc8dWBDnf1zxIxQtDVShCYPGCsHjcX1X6sIpc9tkRsO4xTyizt%2FLgcNsSFu%2BiKgRnFPaIFGa32m0uCORssGwAWJ08rJlc924XqrWj7AUEiqqVD8u3koAgxjtOdvOf4MiT7NyVvWSoqp5L%2B4pHRTXFG7445Q8JR3a9ynsx%2BsyusuIVLKy8J45UYBsSyZG%2FHDQ2kDpM%2FtLnd%2BGqJPDFsaT4J8wwtHtygY6pgGzJagfXowT5iARXGaw4wh95ktIzHUasNGrRo1kKBfa%2F0TmPgw9ZYAejCFZJWRfHrRy00Yuhvv8CGbmmwMhUJagQq46ZW8ouk5gJihQ%2Bv4G2jhOWRGUBsagrqKW3Hc9%2BK4mzADJfAjq8u%2BVAazf9t4U5Qs4%2Bp20mxk46Kt3pSct5uJ8Yz5NmKc1RoIyvp4bxYSHuM47gIxcnURWP6H5YG%2BkXkgYBjrv&X-Amz-Signature=628a35d1641c204b987ad246cc715bb3770e8982fb877428b60db85c57cddd4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZUGOESP%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIBr1rphfpfOw60PxPpBZz62PopiiWJPxJDZOx85mQu4DAiEA3RjwpM0CStqBFa%2F6FuOOWhRqrvydDTwVxb%2BCdSXApbkq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDPjC8lkG4pQLHcMFRyrcA4quYKQqJQdWLu6RsW0yANsT4%2Fcwgbl6yXUcY%2F2m8xcOGnGKbUS%2BlmmoezPuQDNmYu60%2F7oMiH4mYRubcjnDfgS%2B5Io%2Bl9Fk0sNr9DEKfHKPQY7Gft3%2BTkLiI7Du6%2FAomaCnoX2xWzQ0iv97rWL6CsEUISNYrkoZjDSQqFKm7rtWPn%2BTSsKQhbeICBqCKqAIxqxKEuO1SUT%2FHrueqpsibfshat9rlBefyFdTmCalidjY3lptEiy0C8xYNIVz5UT35r%2B7Iw73zEAP4cpZCxm4c8Dm3AIDivrGsKUVaYydDixZHkg9k61wAjA3uP%2FikNkxuBPmNajdiw%2FNslIDVO8QcPz8QQ2ooKM%2BE8QOOZqxYoKi85dAdmlBjtTAErr2oP0sLqZBFCAQNoArql9BOd9xUo8oNKvc%2BkKVreSavpIqq9FHH8f7SowDot%2F0EHwjYG%2BkTKe%2FDHMzYYJi3bEBz8045NvQKB%2F%2FDN9Wr4nGic8Q61k5713D3txexq1j6fjiTXm4FBJtVHzii%2F6crlUq6UPvwu6qt%2BciasK9DAJY6hOcw0DT03ixe1mwp%2BHRNQTsifNE8H8m2dCtuIK9vG1cvpZSU47Gjyeld6rYu4Sgq%2Bs4ca6TlltJ82laj55B8o7eMKff7coGOqUBamExjVJTmgO1rxzZ%2Fi0qCK5rZT3Ff6Or5JJk%2FpGP%2FPVS1GQ5Y2U0be5LorY3Djcc7lSuVQjvwTfEWkPHz8F1uISvAowrgA7zWGuC08tRgpd6CkMG3B77Mf9a4U7dt7KRgwFujYZPqHJPtJFPc9pXKVYdxJbhXh3I6Pvg061irsPfBxzSzLrMEksokMpR0DlrsrHEbNTCSih0a7AVlV0Yib%2Fi%2FLgA&X-Amz-Signature=56a81a2bad646dfd111751e9d39b21a8921ae12077f64e79ddaa365e7d93780b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZUGOESP%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIBr1rphfpfOw60PxPpBZz62PopiiWJPxJDZOx85mQu4DAiEA3RjwpM0CStqBFa%2F6FuOOWhRqrvydDTwVxb%2BCdSXApbkq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDPjC8lkG4pQLHcMFRyrcA4quYKQqJQdWLu6RsW0yANsT4%2Fcwgbl6yXUcY%2F2m8xcOGnGKbUS%2BlmmoezPuQDNmYu60%2F7oMiH4mYRubcjnDfgS%2B5Io%2Bl9Fk0sNr9DEKfHKPQY7Gft3%2BTkLiI7Du6%2FAomaCnoX2xWzQ0iv97rWL6CsEUISNYrkoZjDSQqFKm7rtWPn%2BTSsKQhbeICBqCKqAIxqxKEuO1SUT%2FHrueqpsibfshat9rlBefyFdTmCalidjY3lptEiy0C8xYNIVz5UT35r%2B7Iw73zEAP4cpZCxm4c8Dm3AIDivrGsKUVaYydDixZHkg9k61wAjA3uP%2FikNkxuBPmNajdiw%2FNslIDVO8QcPz8QQ2ooKM%2BE8QOOZqxYoKi85dAdmlBjtTAErr2oP0sLqZBFCAQNoArql9BOd9xUo8oNKvc%2BkKVreSavpIqq9FHH8f7SowDot%2F0EHwjYG%2BkTKe%2FDHMzYYJi3bEBz8045NvQKB%2F%2FDN9Wr4nGic8Q61k5713D3txexq1j6fjiTXm4FBJtVHzii%2F6crlUq6UPvwu6qt%2BciasK9DAJY6hOcw0DT03ixe1mwp%2BHRNQTsifNE8H8m2dCtuIK9vG1cvpZSU47Gjyeld6rYu4Sgq%2Bs4ca6TlltJ82laj55B8o7eMKff7coGOqUBamExjVJTmgO1rxzZ%2Fi0qCK5rZT3Ff6Or5JJk%2FpGP%2FPVS1GQ5Y2U0be5LorY3Djcc7lSuVQjvwTfEWkPHz8F1uISvAowrgA7zWGuC08tRgpd6CkMG3B77Mf9a4U7dt7KRgwFujYZPqHJPtJFPc9pXKVYdxJbhXh3I6Pvg061irsPfBxzSzLrMEksokMpR0DlrsrHEbNTCSih0a7AVlV0Yib%2Fi%2FLgA&X-Amz-Signature=a0351c200d5441b1192d865c27081785260ceeb5bc1b5874462d7983e10e1021&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CID7CHE%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDaIbj4WnzRixKfsV5JEw8qhLFsG5IlSFQpnWClB6aPwQIgVJKjTGYY6TEIQZKrLqtF4L78egksFXMyGN1g5SsgXJEq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDNw15eUHDFWLaz5npyrcA9u7N3kQc56CaRSKB4KTm9IFHr1exbYxlQ5TifSa%2BIjQejkP4nU3lqNCizqYYAKAqmQ5w2%2FROI%2F7brmMukntPTJrMb2O8tBftQndrBu93CTe64o7V8GLe6x1Rlzl%2FoIHYHRuU8NAZDU4HnkQKGSiNi62GhkQQqcBJHDoFmjgFYdeLNQ23ZNa1BpOXvFyrHh5aW2LslRjXCvZ1Z%2BhhIBAPqUqPUORy%2BgVqk630yAkMsl0NE7824lXF44J3YkAdjBoQMOCVJz0WqH5XrYYRC2AJx0pQ5S3%2FDoPrmr7Lv42snyTXFPifPfd2oEES92hz8etJqVAo1DSiHylPOTztyk4gqoXXfnRUkRxDzXrVKj33Q4spMAOnXNVQXRZ2bQxgrTrPqVQ44aaJT0FuM77t3JGCjRr56fQS44xDTYAubjvklBcmskzdAgHQknDr57zPLna3Jsrk0pIlwOxC2FVUum63Ti335O%2BrAr8oznDG9rkVxwm%2B%2F82yi2LTgmITZoYNQpwHmc1f2PyKiEHlaFPfnltimZVInjqUHjD8tpYYuTZVs9cV4VvvNMyYelpj44gc1Lt4M8oSger%2BmxaCeS3tAX2EFxqkbH7lk3qFJPyccm%2FLY6GNGhVN2n3nuN9u2v5MLvl7coGOqUByLc50UgRkdzg0la1w%2BUQHXQcIWuTYFYy%2Bx5lzVdhZMN8ahkFuVxEVp6IeFEDnQ7mL%2BQR1rIeGtNIJdtLKEK%2BxR8Q%2FDvuqmLD2afSL6u6UidOCl86IZ0Lz0XHYlscQS2wKEPrqdD2Mt36s0un8YtZ1aybhMEpvQgGebTMpz8MGfeL5L8HrLISWn4p0sYXwch2v74ZcEwbMi0GZiIJojd4yECRH5cg&X-Amz-Signature=b420c1b967db38328f855671000b26e2c4ca3f5799b342ebe5bb753fdde02477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VUQX6EN%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCD4FLk3hxMvem5D%2FwVSsTMlcZM%2FV%2BpCw4XFQh5pFP7BgIgbyT55OSHNcerQnnoQy1WFx8mwUtccJRj2of3vPiEoT0q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDJ2%2F93j%2FsruZEp7PhyrcAw1RarIyWeUUHfyHrLMqhUrqMQZAtPLu900XkNhgrtOVxmJW7Bs7EPhDOiVdgQSzuGan5vYl7LvUJarc%2FW7sgGlbkQ384hZV8KX4mVZyFX%2FTHFn5Qygqngpm3VFbfUZof68toA7yH%2BOIG9YcBkxV1IUOKjiLbFYvbaCDRjJ%2FedgNB3RX3bXyRbtAeITmhR%2BCGSrXbWgELiIoWfS1BHNvTLowB8NdM6gQ6T1qQGbSS9XtOyYFo4IWS4OfaYkPgYeGigx%2B3wlXfPDuDuGjrCZFpzV8Rm4k7Mf8CcXSGsEnrjU8eE8HWRonwbCPyikjn%2B0BUKJKMtPhSjmXR22nSu4YHEzTbo5NiRbaPWyEKIb67aJuXnP%2FWAOrMWiVpfpMjY0JqHn%2FmbrVj2WCHT6h2xddAxGNXqV9fUybGb8qDG6Y%2FxAp6iRO%2Bn7Br72%2Fp%2FmBPigqQRMTl%2BwSjDDM0TI1%2Fx035uKt0fmr3MGYv28jOLNsuSAye4CK9FLtfIeRkuexEe2Vw%2F2Q0YRIinx%2B02Xh%2B7xdZ3NYqZ169IugSEOC%2BUy3HsQopjIkmVGj6niz45KPhIIh%2BmEixkPmJZ777FugL4B8kug2VjHROqjZaued2%2BNivSQZwF8epevytPMYUl1tMI3J7coGOqUBHFumOz3Scb3Ne8NKCfzOcQWT4hNYGS8D947PCyhO5U03nBDadNu9u1SnHs584uffsSwqSC80nc1cIdszTI5HQ43WPEqkK%2FOClKzybuGYydBtNIV4B64ITYSjwMvYO7%2Bb84HYKSTtzX7ubGP4nNxApeEVOGwzRbem6Ztv1ETSGj3PpMdy9czkwbhxm%2FbMfCZjm%2FEv%2BEmkNU5AVILvNQXDdrSR89XA&X-Amz-Signature=c288de245475f09a118190e2093e06a5c2782fc748bba2ef59826b6363a59e1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSJNZRCH%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDwJ6%2Fsjzz6CZ1yxr79eMU6NK2Y1fnY5c3LxsZfPAgMHwIhAO263W57rllX2mtObhfn3%2FhL8eYauGZ9kmo%2Fq20bTmSxKv8DCEEQABoMNjM3NDIzMTgzODA1Igx5lJyNolxoKUtMVr0q3APHQwEDwHCWzKwFoczm6kzg8Ye63oGwOMqXgI9vfR4NNPKWcWN6q6u%2FtGUfLRrLPOTBu3zADP3BZCn0vTQUm7MHn765LziOju%2FnJ3LFkuyXV30JGkYjNTZbPepiJRNgGhO5IuS4q%2F8EtE2tNf9oWMnKZusDTqPRn7AaWsDsGQJXvQsYrShljQxCo%2FDyaxvFKnJjVQvJUWsKoeICSyodChyybqvvkpDP4rm4p0WKC8KxFlmR6nppw2cM7UMJDzY4cMWtFumuxbI0mqf5wbISAMDoEYCowkzPYXoQOcrl2gPCjhkDlkjsmvw1RHeOa%2FgFM%2BjS%2B3Xxui1UYaXoXCiargD%2BQOLpfxcETbkl0lbOdOQNIfB48CejLIbMExWCDyvJH62F0DUQWyjavQZHS3pA1VHaJXQcJi7i3KwhZ0KJQIOIvc33LzBrgFlLzWrhfxs7SnjVHI0QleAeLUZzazWmqkxOlgbOIMDmX9yW3uokhjX3vAgVyHfpzqpdGwUkpyPIG%2F66QgRmciUGvFfXpg7I1SQEYq9lxILULPQRixZlVTLrLpDtFNYpUdX5i4eR35IDHwkPG9p5GBrgsPxDZbduiZB4xmLfmKUBRy7BiowbRh1vMBwfjDkmMKhOQfXDMTDB5e3KBjqkAUoN3BprjdB2%2FfnSo4XdjVKBFgz2ws5IsOUzmZRYVF%2BmHlEXsS5l0xH%2Fw1fH9az0ELlUpCuswIgPRReogPmGD63oXDN1TuNr%2FGZ9cfrf4zaT6hea2k%2F%2FqSan70Ei3h2C0PrsgJoRaT431L2Q1CX81NsVFnCiC5i2Ljxu9EAO1PnjaBstmxIBCF8ks3mJ6Ok2%2FjqoRO5v%2BpANyNw7kjALWABbFRVC&X-Amz-Signature=fa237816cd9333cf6e580fbf9e258c0d87dfe86b237f3f8414e96f500cad5545&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466476S4LCQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCCh1H2QUBZw5qQl9Gu4FbnGBPIK7nayeiXgzCnmOT29wIgM5QC7KF%2FqvEJ0Lh%2FAHcCs1nIBICY7xMeYLxmiiKqNWwq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDKGJnf95v492l8hy0ircA992cjwn7CPZl6KWZf86w0kUFt79Kfeyf1gOJoSifcnTx%2FGGAFSJ9BrxEgx35ydVw5wjF525iGtl74aKWZa8fnPwkUp36GXkKpttwp8CLpBCWpQYiexDJMzsjrAJylZ4koQ5PSCeXMzJHYzf42V9huLUjEhOSojAS%2F1qcSbUT1oCM%2BX7UvDNftWo4qSG2j9Ums953NtNHKBAX1E1g8DD452S9t%2FHwFrMvQxqDiuOXhJXhDxuGKb97ajOB3kd6OjNh15AehRXXbuqe3UxRmJ4bODsKG0reza86PNFpTfJ2J3%2FNp6V26BanIIn9AQLBKiK6udzgULlO4Op2O20CSGgtB66RCAzVlYrEE24FL%2B0gts4pswEVYrTPufguji%2FRv%2FcmBe8emIGPZxkN1X5ANJs%2B7RvukmHIgrwi56gbzAzkCo3UPVQezZoSy2IawR%2B9P4BETe2R5ZlR6fy%2FnN0pZLj%2FMZ6fvwFMHfiEcVH54%2BwcT4GEAJKShhEsB6q69z7EI%2FOD1kPfh%2Fdz5S4oWt7SEusNiNR3SuTm%2Bd10BzsxoPuADpKI7YjLDGdYlQPO2zb%2F5Z9WBA195ZWNC1wuQsZwbqoTUDj7yVqVSIdN4yFCyoAYo5nqEVO5yBslD4AgLsaMLTQ7coGOqUBhaJ%2FOxN6gqd1sDzR9WhejFC%2BC2CHXuMjWtNa6xpGfWbLI5m4ovNnth18Yh5ffNbkINVLywPkAD3l6lo0TB0qtq1CuFEqxwG96E0Scirule1nNpEG7ps8dvTSvKiyKIl7gA2Ob1gTv7QsY1Uca%2BNWVUkNRgA0WFBGxnrDqx3%2BLSA9Bgru8wdN8PZSQuz3HZBpKd31iUPIbXg8rOt0%2FjT%2BzBuBSLX9&X-Amz-Signature=fac9267ec1d3c86652206cb1472e0c72abff9c3435b460bf7c53915b9a8527d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466476S4LCQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCCh1H2QUBZw5qQl9Gu4FbnGBPIK7nayeiXgzCnmOT29wIgM5QC7KF%2FqvEJ0Lh%2FAHcCs1nIBICY7xMeYLxmiiKqNWwq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDKGJnf95v492l8hy0ircA992cjwn7CPZl6KWZf86w0kUFt79Kfeyf1gOJoSifcnTx%2FGGAFSJ9BrxEgx35ydVw5wjF525iGtl74aKWZa8fnPwkUp36GXkKpttwp8CLpBCWpQYiexDJMzsjrAJylZ4koQ5PSCeXMzJHYzf42V9huLUjEhOSojAS%2F1qcSbUT1oCM%2BX7UvDNftWo4qSG2j9Ums953NtNHKBAX1E1g8DD452S9t%2FHwFrMvQxqDiuOXhJXhDxuGKb97ajOB3kd6OjNh15AehRXXbuqe3UxRmJ4bODsKG0reza86PNFpTfJ2J3%2FNp6V26BanIIn9AQLBKiK6udzgULlO4Op2O20CSGgtB66RCAzVlYrEE24FL%2B0gts4pswEVYrTPufguji%2FRv%2FcmBe8emIGPZxkN1X5ANJs%2B7RvukmHIgrwi56gbzAzkCo3UPVQezZoSy2IawR%2B9P4BETe2R5ZlR6fy%2FnN0pZLj%2FMZ6fvwFMHfiEcVH54%2BwcT4GEAJKShhEsB6q69z7EI%2FOD1kPfh%2Fdz5S4oWt7SEusNiNR3SuTm%2Bd10BzsxoPuADpKI7YjLDGdYlQPO2zb%2F5Z9WBA195ZWNC1wuQsZwbqoTUDj7yVqVSIdN4yFCyoAYo5nqEVO5yBslD4AgLsaMLTQ7coGOqUBhaJ%2FOxN6gqd1sDzR9WhejFC%2BC2CHXuMjWtNa6xpGfWbLI5m4ovNnth18Yh5ffNbkINVLywPkAD3l6lo0TB0qtq1CuFEqxwG96E0Scirule1nNpEG7ps8dvTSvKiyKIl7gA2Ob1gTv7QsY1Uca%2BNWVUkNRgA0WFBGxnrDqx3%2BLSA9Bgru8wdN8PZSQuz3HZBpKd31iUPIbXg8rOt0%2FjT%2BzBuBSLX9&X-Amz-Signature=2a7d427158f99d11c23b8bd1b95fe4a9f3a0d017968f0bea0b9a6fb1b9cdc9e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YZA27SK%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQCnEo5BlYK5Re1DWRFjFZvCPoO1kXTgKa91iOFFliLl8AIhANzp78g%2FaSMDZ5Ah7jo9cHvyYLFtviZz0v%2BIzJT9ShRPKv8DCEEQABoMNjM3NDIzMTgzODA1Igz4RcJJTUiZ93nlfbYq3AMPP81f1S6QJg%2FIIcKfRRqEcmvWchf%2FvCVZUXqQlmv8KT1vHcjhlNlEPRhDnE3kw92vF3iFY1D6rbqFZeSIXGb1F%2B0soncOjDr1jfuEMhx974erkrfgBN71a4QXEm0hS0wLemDoJK24rQuyadSqszxQs%2Fs89xVEFYJ3XJ9GAQf1sTjXxbNLdY4A6Z7wCh3HQnBGBq4w%2FFL3POs9bG7LwmqtpD0d6Jy5BIL49jFmbFnTpVUYIy73ruvKby0UC7IDqbHB5BPznjr1qGRNHW6eO49nmbB2B0VBh8S3JOLHyghlYMW50yuAx%2FyX3dB6CoJNhV%2BaTUFCHj13tcMxMZtHr5Y%2F3SrJHJ8OsM86MOasGf9nWjuZii%2BRbeGFNYJeXhIkN%2FPHX8sHGoZGacw2vbOlkXiacLhtpEbzRBGHe47XXoHSgHqGtvF3oJehZTI3XLfpYK3a2QYRBy27qjfTWf8xDOzLnrajs980BXpOmb5t9PocC8KdRykVtAhl7EnrwX15fTPoOUQ5LmTVpuXSLmcgspaLQ8cHpzl8BaAXlW6UmS%2BQ9EmgQl%2FoPKcS%2FkKHR4iOH61LgzHcH5%2BFZiAE6jPGjxUL8EslsB%2BnGeHXK%2Fk5XKyWI%2FvilttbY2BSIjil3DCt0u3KBjqkAQFAz92QaFkpG%2FsWKdTy8teA341uGACsncoGI22jTGWlW9ZL2eegB6C4NEvBmsVbvpfLQERN%2FRszECwqrI63s7r6m9%2F6bqcxvDh6uD0GglggugNLmKWpaXFHQ8JiGq8ObATeWqueydnPHqre0tg%2Fl5Cy3Bkf8FypNUz4C%2Bc8Okh17wJJOzZ4zRj2sx2q0agIlrWmEbvPob3Bl%2Fj2LPXHttawwG9v&X-Amz-Signature=55e8bee0b0c7956933659a83604fb378325b466fc4af9f07f81a3e81c156b010&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWJGPS26%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIEyaIHM8S%2FYA%2BvGvH9AwXXlM%2FP4Wdd6luD9FxxjgVjLfAiAYS2saSjKRXUy2Tq7pgqOSyC2EFsoqGXFyH2wGl17LbSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMkIbyhsIVZdnQzE4FKtwDUD2q9s9mXl3I6Sh4ArVHHxqazakD5G7IgQfsbI2pSFxFY1Xb1DZ1RUnzjXXpgKQ%2BCfPy4Bdvxajw5ctrjGIxwV12pTTnxF1xrWvuLNcrwLyl7TN3w9cmHNLZF1OiDzctvgvhux15XSJHv2zMjlPBnK8cnrY6p1sjUzAT0%2BZk7fGEQlry3BgYg5iWtd8fYlX1Ro3jADXoOFQ76GiZQcK1fwF1zkIFka4Rhn97HHim9U3PQLFKcMEbPmoSTRtUleDJZaPp9q2pGUP2fInEruFF1yzgMYuXEAjnhMt%2BZnkg5IIxC2up1NcdKzV%2BIIz2sYUCVg8rNOZ8GfToFk0jxNUlKgRr5OcTWMoZNocwD0KRjaEWVams61nHAIowtDWWuZuoe4N4rp5oSUAs9%2FmngdCKvgch3lg%2BbqUd8aF2UVVEqVLGBonYwwK1PK65o06l4pQr%2BB%2FUMhQYkgR4exfqPIQuU6vG3w3sMRDZqDtgYN%2FIr4ffvcm2g7Pd3uNuqYBqfyJeA83oDXMNFmg6drcfGTTAkVnCalihfG9GrpgWpqW7e07SGf88fiRKoaZlMDIZISL8Ni2j2KPef0PVdYK%2BbLyr9MyvBgsVg2g1BuxA3pqUvmdWkEbmg9zbU1sPZvkwgcbtygY6pgH8mr03pOCIy3h03okcX%2FPQyW4NimxYBACTl3VP0pADP%2BDpnk8ANXyta%2F1sLurbVPhLQP69IL0%2BqUh%2FVAPH6WVniezUFTMBi%2Bnqzelw%2BuCYtCPMrECvU0KKojwNJIPPXM2h523xLdjKbEyRq3BvG2hLHSK3APULT%2FCE8TmWNagBguwg3p4jM3uJ2J9OnErURrMZZeWimXhDz2SPcVDCgOSr8drVk18k&X-Amz-Signature=9dec13f31962d6586f169a1630394216ef2f9ed8323e43fa76df7ea910b27706&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWJGPS26%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIEyaIHM8S%2FYA%2BvGvH9AwXXlM%2FP4Wdd6luD9FxxjgVjLfAiAYS2saSjKRXUy2Tq7pgqOSyC2EFsoqGXFyH2wGl17LbSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMkIbyhsIVZdnQzE4FKtwDUD2q9s9mXl3I6Sh4ArVHHxqazakD5G7IgQfsbI2pSFxFY1Xb1DZ1RUnzjXXpgKQ%2BCfPy4Bdvxajw5ctrjGIxwV12pTTnxF1xrWvuLNcrwLyl7TN3w9cmHNLZF1OiDzctvgvhux15XSJHv2zMjlPBnK8cnrY6p1sjUzAT0%2BZk7fGEQlry3BgYg5iWtd8fYlX1Ro3jADXoOFQ76GiZQcK1fwF1zkIFka4Rhn97HHim9U3PQLFKcMEbPmoSTRtUleDJZaPp9q2pGUP2fInEruFF1yzgMYuXEAjnhMt%2BZnkg5IIxC2up1NcdKzV%2BIIz2sYUCVg8rNOZ8GfToFk0jxNUlKgRr5OcTWMoZNocwD0KRjaEWVams61nHAIowtDWWuZuoe4N4rp5oSUAs9%2FmngdCKvgch3lg%2BbqUd8aF2UVVEqVLGBonYwwK1PK65o06l4pQr%2BB%2FUMhQYkgR4exfqPIQuU6vG3w3sMRDZqDtgYN%2FIr4ffvcm2g7Pd3uNuqYBqfyJeA83oDXMNFmg6drcfGTTAkVnCalihfG9GrpgWpqW7e07SGf88fiRKoaZlMDIZISL8Ni2j2KPef0PVdYK%2BbLyr9MyvBgsVg2g1BuxA3pqUvmdWkEbmg9zbU1sPZvkwgcbtygY6pgH8mr03pOCIy3h03okcX%2FPQyW4NimxYBACTl3VP0pADP%2BDpnk8ANXyta%2F1sLurbVPhLQP69IL0%2BqUh%2FVAPH6WVniezUFTMBi%2Bnqzelw%2BuCYtCPMrECvU0KKojwNJIPPXM2h523xLdjKbEyRq3BvG2hLHSK3APULT%2FCE8TmWNagBguwg3p4jM3uJ2J9OnErURrMZZeWimXhDz2SPcVDCgOSr8drVk18k&X-Amz-Signature=9dec13f31962d6586f169a1630394216ef2f9ed8323e43fa76df7ea910b27706&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IZICFSQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T101247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDs0BsQ4St9lo8CnpaQwe2NjgEgSk2dmUil%2FBV1y6TVuQIhALip3Bijl9FDE%2BHDFIt3K%2Bc2ijvv7OrX%2BUQp63MHclW9Kv8DCEEQABoMNjM3NDIzMTgzODA1IgxMUi9tHdaXUnrYx%2Bkq3AMUs1Ih9%2FeonAypTFs%2FL7wON8DsMxx3C7Au%2Fvqk88Y35lvK3bObdXyrnNUxrRif3PvzZi%2FAf96NdCkXAYveDPU9YkKrQfc292cmORShjm9ARHsWuq%2BRYh6Avmnd%2BTxQIGnD8pLoYCUTNRy77yiTTguf4KgR5LY1FGrqGfAciayrnxivWfFiSBD%2FbvmpeSRCEBN1Qk7tklbTx8zA9iE5oUWut7rkIbojokHPOibHtq0Tzqfq9R%2F08cslaE659Hf4k3ONYq7C6B7%2FVH45UlU3bXbnoJMZTrBDp396Q6ocAtdNurLaJ7RMErAheL6x1138tgAcVE1OxxdtQrGhcWStw%2FbSOQ7LMYS78An%2FJeyJC3vatB%2B%2FmwCx78xGmLOLqM6HY3sxfxKH8OVEAEF1QOlzM%2BT1lWyHDsiskpa93OGeTW2oCcTRXPKueLKke5kEiEvSqKtPorDMtgkGfVP3i5qVcxm6vV6NU2IkDPMD%2Brn%2Fx45Iq1LI05pP9fUtGk0ElngoynypbrRXsQPsbLBgyTgCKiIQ2%2FFOy7ts%2B6Q9p7gmBK7GrXbZkn4eoFxmnhhT82ydfifJoqOW2%2F%2F55sU%2FGahSY6%2BVHHYwvTq%2Frx0IvJcS165GAZTBfRejmDtt2JHzDDDG2O3KBjqkARkpWVRdCEPEJU%2BfdBuGdEYe3WTnDEP4QA5xgY2Kn3T26UwNhBzKPQ3WCN%2BdI2jBGq8t8Tp2OTxA1y2ldR7jYGQ79y4yqPtI5GCVySF4G9%2F7Gd9jEGLf1oInFemGLFaZEGcpAVqb1tKnKfCPNSKb5514ixPQJehdW9B2oSHb2dixsne%2BankRvavLdoLwEN8YmTRIj0cJtkjM3oXg%2FESHPZknMO6t&X-Amz-Signature=fa95d00dd6407dfceb33f45f9a1a3ca5146e7d5491ca39218afe3ae0c3fc50c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

