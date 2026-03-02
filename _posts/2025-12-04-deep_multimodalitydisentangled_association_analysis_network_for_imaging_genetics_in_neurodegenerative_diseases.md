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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTUY73BS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRHWN3FSlODRvE7ua%2BtKDRs3eIBQPOynvoiyhXmNXsEQIhAJww1Y2zfAtQGih8ZDzeVlY3qrsgpiL%2FJ3z7v4l4mVe9KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzYoQunJBM%2BfFOjr6Eq3AOpj%2BgwJbtEgy0wA2zqSf9%2B%2FnUAGhp9JShwvpO0kFy7yBXdsqXXhpkQCRHvm62zUWSgQSFubRAZ1XVgMTKEBIwuZUMRSJdgPLCf%2BtbpZjoxSC%2BjiFfegSw%2FeaqxyGfqMoglQhE0btHnoFceTjtSMVbFM9vWm%2Fj%2BimABm8OsKSOsqbqOWAVchUg8uTxo7QVzH2APJIc%2FggFk1B1NvjspkP6r7DQWsqT1iFmIZoZIgHNKMHzfTggawgzJ0nTrORr3oQ24mNlgHufZgrPR4V4nGF8bi%2Bp8B6JVlGn1R3g9UvSu%2F9eH13HaZ7%2FUDN2GuFMj2DeLxle%2B%2BIY4CvBnV8YuuSWeBjvI%2F2y8vHI91asipgv8egJzHc1mnSsR4%2BO81ibmg0j%2FEaQVO%2Bexsnfm7mKraZNcQL1D5HxA%2BJHALGD9cSPZCHylaz7GCM%2Bek0JYkTiQjN8xpZATvcECN6hNRw7J6xLY2wd4P0dqVZfeXvQNsziYyShXslgvApE1D%2Fe1MKrCl7Y0odbDxEz4iqeVI8KY9SsOm1537G1Y%2BSPrvFTueEqb26WYuXw2RNUPYvKYS8XyjXUi29dA6J3Avjewjml8nPNjM%2Fcox3X4zeNlYKpGrbfMJdE4jVkn8XwnmjL3jDC5%2FJbNBjqkAZ06SdQw1xDoi%2FZhitXSodkM0AnYc%2F7g%2BUgeBfthz8RHMBW0mkxKhxGfViegDohxJRhkruhuT%2FuRT8V5MMezyc37RGRiFD23qQc%2Bvy2EXin00fCQ%2Fr8ui6NMYCexzwYz3GpbhW8MJonACu18RB40mtFYeCeLUCw7Y2nyOV5ZXCa744PWgfMhHlHrVHCDUvU%2BXFgrCuFnu4oinOLpcSdzzdUTbC2A&X-Amz-Signature=1a099786488c7aced99b7741f9797b79670127aec10e50e1000c83a124d8c23b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTUY73BS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRHWN3FSlODRvE7ua%2BtKDRs3eIBQPOynvoiyhXmNXsEQIhAJww1Y2zfAtQGih8ZDzeVlY3qrsgpiL%2FJ3z7v4l4mVe9KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzYoQunJBM%2BfFOjr6Eq3AOpj%2BgwJbtEgy0wA2zqSf9%2B%2FnUAGhp9JShwvpO0kFy7yBXdsqXXhpkQCRHvm62zUWSgQSFubRAZ1XVgMTKEBIwuZUMRSJdgPLCf%2BtbpZjoxSC%2BjiFfegSw%2FeaqxyGfqMoglQhE0btHnoFceTjtSMVbFM9vWm%2Fj%2BimABm8OsKSOsqbqOWAVchUg8uTxo7QVzH2APJIc%2FggFk1B1NvjspkP6r7DQWsqT1iFmIZoZIgHNKMHzfTggawgzJ0nTrORr3oQ24mNlgHufZgrPR4V4nGF8bi%2Bp8B6JVlGn1R3g9UvSu%2F9eH13HaZ7%2FUDN2GuFMj2DeLxle%2B%2BIY4CvBnV8YuuSWeBjvI%2F2y8vHI91asipgv8egJzHc1mnSsR4%2BO81ibmg0j%2FEaQVO%2Bexsnfm7mKraZNcQL1D5HxA%2BJHALGD9cSPZCHylaz7GCM%2Bek0JYkTiQjN8xpZATvcECN6hNRw7J6xLY2wd4P0dqVZfeXvQNsziYyShXslgvApE1D%2Fe1MKrCl7Y0odbDxEz4iqeVI8KY9SsOm1537G1Y%2BSPrvFTueEqb26WYuXw2RNUPYvKYS8XyjXUi29dA6J3Avjewjml8nPNjM%2Fcox3X4zeNlYKpGrbfMJdE4jVkn8XwnmjL3jDC5%2FJbNBjqkAZ06SdQw1xDoi%2FZhitXSodkM0AnYc%2F7g%2BUgeBfthz8RHMBW0mkxKhxGfViegDohxJRhkruhuT%2FuRT8V5MMezyc37RGRiFD23qQc%2Bvy2EXin00fCQ%2Fr8ui6NMYCexzwYz3GpbhW8MJonACu18RB40mtFYeCeLUCw7Y2nyOV5ZXCa744PWgfMhHlHrVHCDUvU%2BXFgrCuFnu4oinOLpcSdzzdUTbC2A&X-Amz-Signature=1a099786488c7aced99b7741f9797b79670127aec10e50e1000c83a124d8c23b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665VUVFYZ%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHYAC%2BtkvE2s8WZyAg0%2BLXQXPpBUsmUMn7zqDs6vbbaCAiBxCg%2Fmn%2FIw%2F6eOLrmNzG%2BMZK6CbHG30kReY0SGtKHa5iqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLBL1R0AzClR47m4nKtwDG7PkwmEj6I%2FvF0VP164x3%2FADrlPYg6SaCdSRUZp%2FG5XoafqQnWRBhBluRegd%2FkeJudqQb%2FX4uJ7hhyqvrCcw5IWfJu8P18zeZF7fWUfqu8BQVUOzTe89k11aq2o9Adf9aL2Mh6XLlaUNbIAgs9ScAEXNU7GbOOgGgg7jFxPmto%2B96sqn06Za3yeXX%2F2oQSEMbpS8wHiXDlXvwumUR2s%2BP%2FF7MqUv5r1vObSUeInTDB02QtkmKajXp5c9VnWu5pDaGvPi%2FwL6x9npEMcSCzSH8RzZ0NnN1KGwF9ObAm0%2BfGPYPwYYMLGnBqeV2ZJsh0UxV5XhkyCmRBD8QX8QdrkLIGxBe1zTeuRpj0FLMamZZWbQW%2FpoTSG8A7dXNsoBqRUbbo4MQ4RJN5bdjdjjxTORRDArgMX5ckKFXqVo%2F24CRmzGDx%2B9A%2FE8jySu%2B18X%2FsYdNQsOxlEmtDkx51qBW3o4KBhU9epr0eLxShKWq%2FrPnSzlXe5uBX19v%2Fxh8177f%2BPkoi98t0pwcNnjkUByWVHapA3dmC5JN3LK%2FurykOFeTIO6ZkY5vGgVFh%2Fyq%2F%2FqQyyz36Gxz2emIUWl42fdrGNciKt9%2Fr3ht6oO91XDxIsKsTGKzzaF0FMFH3HAMmYw7vyWzQY6pgFCEo5m3YwcBChxUT7PeUvWc15edS5JxEGxj6IB4OR%2FPIa0Zr1klY1ScJGbKDzcdOqbEx7eMtCESTeZE74%2BOuW21nw0WPlmwrSHu1kc9FBOM%2F%2BkiztPaB2PplhySXMEjSqye47K9NXaFGN4TbcEgtP3RW2OHc5Yk1aWec%2FgQCdPkFOxq9reOSA%2FS%2Bul%2FO1GlL3KdNE6xmW3gIZXTTFTtzmNC8LAX%2BOw&X-Amz-Signature=76e8c97ebe20d44bc261dc67f8e45374452c00686ccd97a830a6cc584205a175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y62SOCSE%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDDuLATzBhHUk6lJwq53KuveqWU4shy5pfwwaO3c4hiIAiEAvowj8bEzyLQLQdW3jKkfEITYf6YAuG9CN%2BN9kOBwge4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDORxlOsDhMCMfflE8yrcA8K9vf0aKBlPrymolh9kLhnYZ4PHPaocHdQF%2BT%2BqaqIv1KJYYyc6Yj7gS%2FRmydDO1qTMOQJX15h3hQ85g1lDbtHLZe7G6k0x4SNwq4iURoLVstoBo2t31tHi8VC7pOAVRo6%2BnqGZCEHTcqxUJticc9BXVDTLfqvUOUstbZHcuA%2BUk%2FR1cjxje1lEUskPPRIRAONnY9tMRQ1H%2FNWUTSkA48Zqfd61%2BEvKhHHooUgXuyf9MRvd3mYvNwZZYAYnHU0F0hy%2B9YqvHvsQz7XU3WBXU%2FaNQ8CBqP4l9CoW9QLmjqwDyIJ%2F8TFUaGksiMZiJFAMpQiKt7Zl8u0%2F4nSXQACFiBKxDeCvfrNo02ts8T67BqJVtmhm57OcX7bBveml%2B7NA2HBLYEmBooeG%2FDM2R54LqEYP07ExVwIUbRx27zSYJ07UdGlyetfA8%2Fu0ilI%2BOINXN6zg9du%2FAiyRuvkI%2F0iM4i0IzPnDHmF5e1fnrkcrmPk1Y3FtHADgio7vJ7AekJ%2B%2FZOSJX37pTZICxhMRWRUHiA64YOw73NJMNc9z1pCwu8nVF6GdL7XlAi8jEBEjZyTt7Fu%2BHcem234TA%2FNhikqfCjFktlll4HxmjmQPQ13KYg3jXCVUZvjUMeY7pC%2F6MKr9ls0GOqUBwQPJmUDzMk8yfH1c29QV9CfsuELbPoFarW5DstJsckC76AxlsrT0VeqnbbaUjpmfmfZ9%2Bq2YxbHBHmreJuH0DWvi7gof9feb1i0ZeCuWxw%2Bx1Q7asZzKqdO9Ko56Uc3k3vxpdP1j53Az%2FLJOK%2BXPdokDcpNGyJGhboLXQwW0JZG%2Fl2TU0OI6TL6j%2FJkDZHLFed1yKkMxHNOwU0iEAWwCE0jvJUuG&X-Amz-Signature=9d7241acae1db985485e7b87b49b134a4f65d5f8fe5b76c5b153b724bcabc937&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y62SOCSE%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDDuLATzBhHUk6lJwq53KuveqWU4shy5pfwwaO3c4hiIAiEAvowj8bEzyLQLQdW3jKkfEITYf6YAuG9CN%2BN9kOBwge4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDORxlOsDhMCMfflE8yrcA8K9vf0aKBlPrymolh9kLhnYZ4PHPaocHdQF%2BT%2BqaqIv1KJYYyc6Yj7gS%2FRmydDO1qTMOQJX15h3hQ85g1lDbtHLZe7G6k0x4SNwq4iURoLVstoBo2t31tHi8VC7pOAVRo6%2BnqGZCEHTcqxUJticc9BXVDTLfqvUOUstbZHcuA%2BUk%2FR1cjxje1lEUskPPRIRAONnY9tMRQ1H%2FNWUTSkA48Zqfd61%2BEvKhHHooUgXuyf9MRvd3mYvNwZZYAYnHU0F0hy%2B9YqvHvsQz7XU3WBXU%2FaNQ8CBqP4l9CoW9QLmjqwDyIJ%2F8TFUaGksiMZiJFAMpQiKt7Zl8u0%2F4nSXQACFiBKxDeCvfrNo02ts8T67BqJVtmhm57OcX7bBveml%2B7NA2HBLYEmBooeG%2FDM2R54LqEYP07ExVwIUbRx27zSYJ07UdGlyetfA8%2Fu0ilI%2BOINXN6zg9du%2FAiyRuvkI%2F0iM4i0IzPnDHmF5e1fnrkcrmPk1Y3FtHADgio7vJ7AekJ%2B%2FZOSJX37pTZICxhMRWRUHiA64YOw73NJMNc9z1pCwu8nVF6GdL7XlAi8jEBEjZyTt7Fu%2BHcem234TA%2FNhikqfCjFktlll4HxmjmQPQ13KYg3jXCVUZvjUMeY7pC%2F6MKr9ls0GOqUBwQPJmUDzMk8yfH1c29QV9CfsuELbPoFarW5DstJsckC76AxlsrT0VeqnbbaUjpmfmfZ9%2Bq2YxbHBHmreJuH0DWvi7gof9feb1i0ZeCuWxw%2Bx1Q7asZzKqdO9Ko56Uc3k3vxpdP1j53Az%2FLJOK%2BXPdokDcpNGyJGhboLXQwW0JZG%2Fl2TU0OI6TL6j%2FJkDZHLFed1yKkMxHNOwU0iEAWwCE0jvJUuG&X-Amz-Signature=ed742e28afca5b6c1d5b2b97bf0349e40c44abfa13abb5eea6970f6feb0214dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOEHF2QW%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBAbArIAIiXt%2B%2FmjOKBWirtYd7s3tn3i0gzoqU6gv%2FDuAiEA6RIXiiHvublrC1lHwmq9bWeeq1CqdscP9amD6MlkUAsqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGq5d%2BFuLmhRM%2F%2FeIircA3JbxmriIp4dmiwHH%2FvC2T8g5MFglyHXFn%2BvrWCYzBe8WmRcBncjJq36k%2Btu1Z4pAmzOTpRpy2FASJAm1d0bGd%2FC1TDWnScPgS8Mr6KwGPk%2BCC0oxvOgB4hPX81pP%2F2f%2Bo%2F2bP4xWVoFkLehKh1%2FmIs0zenc7Ew3McfY02XKCxNdw%2F8n0emIguFUbxJyj5TQEuBnO1s9qQ%2BajCmCd7S1cwANSlVzslvYQCJCatH%2FHiqdYyIaR%2FxyxEO24bB4jaLIPSxzh%2FPB7tF5s%2F1O%2FSpUP0SWKyuO3d0o2PgPAk7I%2B%2Baj2znSTt4fOXV8zkXdiUPORO%2BOQCpWgaISYMPttvqyjg1Wa%2BMdPvn%2B3pFaWxsmn7g7zcw675cPuPo%2FnsrDa%2BaCRdx2oM8xmq3aV5Jbcv8oMgMM6WkXtIW%2Bl6iavRQAnqnvDBNAFVLh89VStdujvSsZcj6ioa7z4lSTXMKY3arMykNW2Y%2FVgTIg6NynPHF6MzcXfavIlRVB51P8SKCjNZLaHTEoeKiuVUcPbbt7joQL9Pm3uIy%2FZunL8lvUGWdw02IWVQmRGLefuofGtMz08ALYildOgzTR%2FaJ0IL0Ng0pqSAZFHP7IfSIM8%2FV0Jg09r7bf9J0lr8oqAHP%2FqFhLMK79ls0GOqUBEiaRfu9uyPy8t4vbi1wzex0QcDre23L4iC5PWPszhiJkeXnklNVTOJeEFBKs%2F5JDNKHQoB%2FRbtkvE02gamuJju%2BnxjNEf1f%2Bumi8SIsJVHLT8Yoqytxx9%2FJ6T20YPNTVzCGBvK3wXJNKDToaBO0cECzdcjLSU%2FXwed%2FZpju0MfZZ%2F024R136XZyJgnFmaronX6aLJJqK%2BP6NNVQwAKTStuRv1b%2Bw&X-Amz-Signature=8168ee6c4b4531203ca605330bba0a1c40a0a75a8c88c4e97b6fbd5dcafbb181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QP5MHIV4%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFuE7gEeGqr3PK4s3SMEVYYLogPVAUayVxfsSEUBAyNSAiAvOK0ynKQIc7ba956CexIrzbllhCsgi509%2F%2F79MOfFGCqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMt4PkNI2Nbsy22Y6XKtwD1EUNLVTGJep17n513CF21a%2BpLMAnhqYF6zcJltIg4k1ZFAVGebm7d03z4Q2gXrDcR6m4n5O6cEgYUeCJCTv6CIew5zeVQ3fMgEAoDORiNs45uN9FlGYlnsX50d1VRG6eISCRhe3MdPjo18Cr%2Fxvo9B%2Fx2Kq%2BhCP39gUw3fucUpKGgqPb8b225%2BTIf94bpV4X3j%2BnlU%2FsvvLlyDDM4bopT1sk0O44rK5TzQfH0EY1ujkcTSKGdTeYZB%2BIma%2BvlwrTNDX3kERpaipCgQeArPqSHja8kdK%2BpBDUiO49Mz6w5xLStTN2NwqylmVmE%2Bx1WBS7c9SLxa4Wa5ZMJsQ0TB0K9r8QHOGZJBhb%2FlHaJFvgy%2BCid%2BNbeiPm1gbOheisH%2BYRdL1%2FCLV8FBJj910fHxqo8iWuzrq%2FeqGBnMge3fNApbzhdq%2BJRoaGuAkx0C4a3ITNj9H%2FCc11WK1%2BXBKDJsFF4utKyDIen57PHoSIoirmEaYTwz%2Bwen4y9qsV51Z4Skt6Vbgi%2FnqAsRuhKdOWyY0OZ1HmluYisa2iKFGGOkIq5LFLIsr%2BVU6li%2F5SEIS65pnE14Jdja4DEFCceZHRe4Sh5Mk2JKGhXErCe%2BQeThluxlUjGtIE2R%2F3qBxr%2BK8w%2FvyWzQY6pgFoEWYey4X9ZZ0zSFF27c1J9cxlM%2BEgEsrdLxKp8ImGwy3MKjNA4KZFRrA9GAXwBRxe%2Btzo1h%2BAltrXpzf5dMbjRfJPfai9U9ijkDFxqevQvtfVEganvjedzAStseiqgvwnRW6DR3CfYcoQSPeGRMK8%2BuGz3W4GVtxndvyoalxMWGHvpCZblBUASBaE4rCXW1sRzDHAzJr3c%2Fos2U1rcTCYEF%2F1ilHS&X-Amz-Signature=4956a7f718372a2c511268d96ef8bec52ccb20beabc8c5aac4f79d65c44ce2d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REHW3OCE%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3XjK%2F8XwP5Wt8RjcZf5nZfj%2BLGQsjdoJcDEOws5Q2YgIhAMWh2NagZ%2BNhspkOcNCVAdFDKL0j8JpJz8sEftjxbHiQKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwE1d5qpwfJ9W%2BayPEq3AOxykGa42KISIn2E3VsC4mHt0%2F%2F4uURL5aopaDro03UaXujZHkolWpWHDQnpIfm4DVyIicpZZI29hBjvkzrG0zDbffEO4DFp3PbDLUkyBEx%2FrMHnYjJcVIdDt5h%2BBonCtcPP6sx7SQt6yXkCicci7jVBGK%2BRX2uGxw0SXJgpOVdux58q7auIRn2ZbUjZlQCjr9uyd54LbuvgayR5JheW1w0sggcJP3q2btXtHwLU%2FFjQblS%2FTZECMmZo6LJyAb8QgzujJ%2BEANiqTMAwmfUzXlekhlxhq2js0qZrbZfUykRCkgyUsyb78Sj%2BDL0wn0XzXIdwWYj4N51IgyZg92R6C1J5A2RXtUIqP4V2LZTBx59kwcGFxmmmIChRcNBOOJQWztCxa8eEOrzw9xoCAxCn%2BfhdMAVg0NlwerWpd%2BfqDrNa9DJopAg6zV9BmLT%2F0rmw3aH2wocg4tF6Ojwks%2BF%2F81ya7eYTktvAbI4BjYoyUpQYL%2FuuglmpS2bNgJUzsJrxzgG8YC%2FZmbfNHR%2FtbgOPFIZvfCPV2Kh5ylmjfk1w1lxyuXHCecQTogTxUalIWzZ9c4oMhT0rb59lqd8ZpIk%2FLFxo51zwmWJ5LLOBMd7HY6aRt0DKB6sZ%2FanBRGlsuTC9%2FJbNBjqkAdmYLe3Qagbmk1UEPMedWN7bS9Z2HC8lbWHVqxMgMArWe%2BkoSJ5Nzkf3PZPjO09%2B8gr4VXVKcnLmVPYWr02MJOjCJlLFE8wOTGOa%2FatbcpOJssu3I%2F9%2FUSkk02rZ0tQikLxw1l3O0KMB0IchLIcRz9jpAb60nXEJXQQv3PPKUU03lgMO79Fyr%2FY8U3IORTbKVoVuBS6NAIOvBpXmDXrm60wV%2BYmw&X-Amz-Signature=4f90aa6e0d56c818d5a49300274b3f01f849cb7962e0acf18839828c39c8d8cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C3JWVSY%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDSikm4Hxi4hs%2BD5FGsfsnMTWzAPdDIV50AaBknzsjdbAiEArawInJDMMfzm4Z4plKBNh4TfDJlUZ355JqZ9i%2Bi5E%2FEqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF7rj2oZEh3ItG7crSrcA%2BE3amcsbSoah8a3omd%2F43JgF7h%2FQvjHV1RNMRgmtxopBOTnibeWltWJ713nivhX9Mqp6KdYLgzGQ9%2Bj0rjy7grfK%2B7tX55HVjGJZ9a2JnFvz7GvlSO%2BKHlSiwPVBaiEyJiSfxyZMJuFsi%2BUTJ2UAD2lLcLVbg3qGAR5tyo8sUwySDCZEmRyM6VGUK2IhhTtaJRQawrOZ0hhhlZqf9hin47qzj%2FQ5uJDhCGRZfIlPS%2BBJ7QmADsFtPeVDip5uRtbnWoal34pqt811i5%2BRlDZ5gHFg4rATGjWC8u9SRkmRqT5Xdd%2BBuEdofVQ1gIxI0Rr%2FjQnLVYcpMg%2FoGCR%2BonUK3TkgH1el13iHLtUMsgryS7hxc%2B6paK2YzLyecviISJhGGjzptDSpHb8SOtGTXQuQcyfwq%2FCFAYMBkC2FUaJpKeBedQoiXfyt1cS6hTnf27j%2FEXHURT4HmGaF%2FnvZmxqYtHusF71djulEiDTRkLhO3Cl8fSdxg1um6P%2B7Ulna%2FW3ES4lYtXnXSSFFkRva9sFhRKHw77ZpgcZGIycUOCvpTAymgkrNS%2BXjwHCTsV7MsveW1Rgg5Vk4qIYeq2rTNcywzx69dn99PNLnmFZKMKSt9jQr9XfYh2ymgkPUNHdMMj9ls0GOqUBTwmgodTgtUWD4NzrDxkWG1HtVUSjKRq6IcadEM30fg5k0oUp6rXR3etXWH3K%2BfMFGKFdODn1z0N1rVQL5XSb7gBD8cw3J1Txss1zRxqsbpOQZuAEVC3PnsvJE05FBUbJlJDwsQq6%2BPaWNIqHsdTgZLkxetsDpXa%2FG%2BnRgSLRao2SMzqzIAbLboKRdCWTt3EJJa2zYuL%2FdU%2FwloKJbFxYT3R3alzl&X-Amz-Signature=4e59c0d07fa80b1b95bc766ae50e70f5c70fec84368cac433f6b49587082c3dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C3JWVSY%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDSikm4Hxi4hs%2BD5FGsfsnMTWzAPdDIV50AaBknzsjdbAiEArawInJDMMfzm4Z4plKBNh4TfDJlUZ355JqZ9i%2Bi5E%2FEqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF7rj2oZEh3ItG7crSrcA%2BE3amcsbSoah8a3omd%2F43JgF7h%2FQvjHV1RNMRgmtxopBOTnibeWltWJ713nivhX9Mqp6KdYLgzGQ9%2Bj0rjy7grfK%2B7tX55HVjGJZ9a2JnFvz7GvlSO%2BKHlSiwPVBaiEyJiSfxyZMJuFsi%2BUTJ2UAD2lLcLVbg3qGAR5tyo8sUwySDCZEmRyM6VGUK2IhhTtaJRQawrOZ0hhhlZqf9hin47qzj%2FQ5uJDhCGRZfIlPS%2BBJ7QmADsFtPeVDip5uRtbnWoal34pqt811i5%2BRlDZ5gHFg4rATGjWC8u9SRkmRqT5Xdd%2BBuEdofVQ1gIxI0Rr%2FjQnLVYcpMg%2FoGCR%2BonUK3TkgH1el13iHLtUMsgryS7hxc%2B6paK2YzLyecviISJhGGjzptDSpHb8SOtGTXQuQcyfwq%2FCFAYMBkC2FUaJpKeBedQoiXfyt1cS6hTnf27j%2FEXHURT4HmGaF%2FnvZmxqYtHusF71djulEiDTRkLhO3Cl8fSdxg1um6P%2B7Ulna%2FW3ES4lYtXnXSSFFkRva9sFhRKHw77ZpgcZGIycUOCvpTAymgkrNS%2BXjwHCTsV7MsveW1Rgg5Vk4qIYeq2rTNcywzx69dn99PNLnmFZKMKSt9jQr9XfYh2ymgkPUNHdMMj9ls0GOqUBTwmgodTgtUWD4NzrDxkWG1HtVUSjKRq6IcadEM30fg5k0oUp6rXR3etXWH3K%2BfMFGKFdODn1z0N1rVQL5XSb7gBD8cw3J1Txss1zRxqsbpOQZuAEVC3PnsvJE05FBUbJlJDwsQq6%2BPaWNIqHsdTgZLkxetsDpXa%2FG%2BnRgSLRao2SMzqzIAbLboKRdCWTt3EJJa2zYuL%2FdU%2FwloKJbFxYT3R3alzl&X-Amz-Signature=72810939f427ca39b19e3a19e1b474ec3a41b06a378f035e250aafa09fdbdd50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SNKRABC%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID1E3JTmDYAOUJDsLIKJNk9LICVTncho9%2Fl61w%2BlkXl5AiEAiJ4qRFP8%2FhzaSfQbLPD%2FKX4KFpZSnRMxGbqbT8iRiEcqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE9VJnGDueSlusOGxSrcAz%2BctEeMWAUaJkX96FXD3HU8BBdufdm5ENgLEDE334EPd0MsXz0kfwBnQoeyJTX1OdT2GgWXjl2r%2Bq0BWv%2BoZywsHitiz%2FDTSGW9G%2Be0teEdFTrpqeXqz%2F7KgxecY3iJEvnDJfOsVyl656orK4ZQGEVc5fJaBFeP%2B0xxzmbsry%2F9fwVgEdHrwsUY9zXfYAigiOUJnlSv5mKh%2Bbo3fH3RAB2XcG0uWdklYu%2F90xnk3GpCgvCrrZDlOCkMswMD%2BhcTtY01lZpupN68r24R1I0d%2F9N%2BGmJomI%2FGXiYdf5SrtyrI2%2Fc696kDH%2FuSuLXVsPGyaH8q2fPoS6F2Q9P88BKl1v4S4JkUlkXubuNFav%2FyYLm%2BqRYA72NGoEkr3Gm7Q1kVaFrIhAF78SmPuXTiy7N3gIyvscptbo%2FEO1PEkyQaTEQZgerzwTnxO8YL4%2BicHZU43wHwUxoBDZSIubbcuElxT7L9mG0mf3xpwEIeKNHi7GwoX4UNF6VPW0Lhj4N8HvFDsmBSFiMG%2FL4G7%2B6QkstKpkMPPMroL9RRqO%2B%2BWkTm86LGkOYXbDZhhEvns7eXxSLYcaBMXh%2F9gclu7kUGn2Y2OEvp9H18LQDLI4AcxEjd1mwunZ0KhZJOCc8Zhx0AMOP8ls0GOqUBQ6fjjsMjvWz0CcOb9dz8l83ALt8uzU%2FXbe2X91Mb3ddX5SyuXlO%2FNz%2FtF4L6mxCwCWtGXRJ3HCvZrG3NuW9%2FVR1dY2haFTkDwxNlbXqUXJ3UrgYMzZyALGYPJQJk%2FrYXtMxHSyehVY64XGY1N8oeyPq%2BGVWYcABXU%2FdQNNDw2svUeUbGMzUDB2rMnoDSz1Vo7bRXYYGiNfRVDHbszKQeoConbtfA&X-Amz-Signature=86a68036a4787c28b89f41e274dd0cc78a94c020c3258f012199ebe3e5942231&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BTWFIKM%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0k9Xq%2FD33wl942%2Bzq0dtynuZCP6GYt8VfwCTyeFBzTQIgDj0wvX7%2FdyBXKQtt7%2F361dASyvRaDcVJ7fMKGt2fbcAqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFbxEo8ux7448uJiGyrcA1a2D02TsULsfI5H8HGxIUMlAg9OuDi%2Fx54Ik0lJQVE6YkRpx5ZKeRjonN0Oq7UDYbNWDDkNt7Dy9q6VbxHCiC2FBXOmYiMPuNwXHgI9UUo6pkeuICrWxzb6vWghcXMvVE%2FPpYcOEpudKztrZSFxAOHKs0IlROKoABVWl4q7jmc%2B%2BwflU7qDmD2WmaGtEEuIzqCLu4Bu415Lzgqiao0OLl%2B2a6WN6IpYmUy7TBdyHdnSIHDR9xSY1lKZFfUpnt2mge3NnldUTNCuZgb4mz0h9ef6ihH4UAr10b1mowgPBKdwQKQHgrw8P8yEKjs3JptK3vQMMwutsrrmbzZZ1HeeO7TfCvAiZECuKVnZkA1wbGTzPjaF18uTiCiv0TmCgWenzD2CBUCv1m8vhjTDCHTZq%2Fb4Y9tSFCr1khm4PF5a%2BKdk2Sdaz%2BPOCMUnrdrdD0XrZ8v9TIiQoToHvNGzMNP0a0YRE35VKCubOeXURT9yyszp9r0VK79QMZrs5mnMQ9ZpFlhwBLeN5JEj1teYkGwY7KGKvA2yvg6G6dk3fRLSpKjQDqYv6XPvNBF7V6YTp%2Bb2q26Kvb1m3J5PmhoEpgK%2F7Ux9mwCpcw5%2F2ZXUUZ5sL5smfOXb4gZyLu4bO60QMLD9ls0GOqUBEE46WbclO0PrCFV0YZbBY2PTmQ7iaxhA%2B39X9iHXay5HOoB3EK1WhxQUBMwBepuZG%2F1guIFAXVO%2FUAfii%2B%2FI24oHNHnpsLFNQy5q9AtvSYhduEI60t7O4f8WsZJ%2BwOq8vWuh1aL4tmLCOjG4OVP6nDZcUcxc6m5cdfvjVMmgc2zq3WTsQbluiGdgg2jRDV3H1juTfpPwxei9wumlOx4jxYB2jVaL&X-Amz-Signature=ec21956cb9f41d3e5aad035fcbc71dcd700deae1cc5266e0b7c19e15b6eb5bab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BTWFIKM%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0k9Xq%2FD33wl942%2Bzq0dtynuZCP6GYt8VfwCTyeFBzTQIgDj0wvX7%2FdyBXKQtt7%2F361dASyvRaDcVJ7fMKGt2fbcAqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFbxEo8ux7448uJiGyrcA1a2D02TsULsfI5H8HGxIUMlAg9OuDi%2Fx54Ik0lJQVE6YkRpx5ZKeRjonN0Oq7UDYbNWDDkNt7Dy9q6VbxHCiC2FBXOmYiMPuNwXHgI9UUo6pkeuICrWxzb6vWghcXMvVE%2FPpYcOEpudKztrZSFxAOHKs0IlROKoABVWl4q7jmc%2B%2BwflU7qDmD2WmaGtEEuIzqCLu4Bu415Lzgqiao0OLl%2B2a6WN6IpYmUy7TBdyHdnSIHDR9xSY1lKZFfUpnt2mge3NnldUTNCuZgb4mz0h9ef6ihH4UAr10b1mowgPBKdwQKQHgrw8P8yEKjs3JptK3vQMMwutsrrmbzZZ1HeeO7TfCvAiZECuKVnZkA1wbGTzPjaF18uTiCiv0TmCgWenzD2CBUCv1m8vhjTDCHTZq%2Fb4Y9tSFCr1khm4PF5a%2BKdk2Sdaz%2BPOCMUnrdrdD0XrZ8v9TIiQoToHvNGzMNP0a0YRE35VKCubOeXURT9yyszp9r0VK79QMZrs5mnMQ9ZpFlhwBLeN5JEj1teYkGwY7KGKvA2yvg6G6dk3fRLSpKjQDqYv6XPvNBF7V6YTp%2Bb2q26Kvb1m3J5PmhoEpgK%2F7Ux9mwCpcw5%2F2ZXUUZ5sL5smfOXb4gZyLu4bO60QMLD9ls0GOqUBEE46WbclO0PrCFV0YZbBY2PTmQ7iaxhA%2B39X9iHXay5HOoB3EK1WhxQUBMwBepuZG%2F1guIFAXVO%2FUAfii%2B%2FI24oHNHnpsLFNQy5q9AtvSYhduEI60t7O4f8WsZJ%2BwOq8vWuh1aL4tmLCOjG4OVP6nDZcUcxc6m5cdfvjVMmgc2zq3WTsQbluiGdgg2jRDV3H1juTfpPwxei9wumlOx4jxYB2jVaL&X-Amz-Signature=ec21956cb9f41d3e5aad035fcbc71dcd700deae1cc5266e0b7c19e15b6eb5bab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OPWDHNH%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T173409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBsgLDIyLaBm5xZKJN%2BBNmQ6fl8KZ%2F8IREXK4e6gOiFQIgEWlXc%2BzviqkbuOXhEV%2FMEQg3ewTvGXy6aTlyLktZ4mgqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDaG9ZzexTpdY8LnrircAywwZab0nj1yQgw8V1KnKR8hK%2F3stnRFJ7Mtzkw%2Bjq38USYmJ%2BIYr5Sm8TSIMzKTAcmia%2FFUPLoLEFlI5h4O798qIcckMFOQMRVH9hfjjPvtyDqGPloimhUaT8sXZ9riqSLpsnq1vbB4CQFOVoir9mptOPhal8jZsbJLmsCgF3l%2FNZhgomwG5f4d3qQPnGLkjyXO95KzR%2B9vYQv%2FdIQPxn%2FmapI%2BIbH1c0u07sTHvyBEXF%2FXO00dJ%2FctcDW7wb2sihRk%2F5yWR6C8wYc9pj76T1GTKhVQuQli1XuI7647KrAiFBdXaP4wCFr8zM4SX7Dxvj69nohT%2BgBM56EpYfarZqx7Z%2FwcAb0x4jyE%2FqI6VZV5z%2BC1GMzrmgNIqPTRONBb57XhIDbw8MsbaHHWJ3wOh%2BfO6Ztv9dEgij99Z%2F5x5%2BupYjEBa%2FHlK%2BHPGjKIs1jda9o%2FOED6RnFD%2FB15TLhF56HK2rXTV4Pupyb4FkDPvYcnpyLfpuFzkFWxPi2aoxzLA1byCE%2FkUPWYyEi%2BMfPOZhHiZmcNKu0KShzQ5NW%2Fw0SyJTQp8g8Dzo9LNMWFEb5aB%2BMEy8bH2yt20ARyY0QeveYGdiuvBKKAtrKKd9jVGU%2BJwVJCVDog%2BeEBRqVZMLr8ls0GOqUBbrYU4%2B4c8kggNmtTdzE1iITlA8d8c3A1MxrbPDxFMjeKhoCylDqyyUTZXzjEjy8%2BOnU%2BpgPNX8vSr1EZRKGF6jYpMvcceIorqIJHqlWvdT1VCRys5Rl%2Bt299IUgjk9okT8N2PeTTtJQYY8TyaLDlxieb6nV5TJNGRRWgjiRbg0%2FACrG%2Fb3IGcs%2FK%2FChVCcMZUiFHAVfM%2BiOC9MzOZIFe%2BAcd5B4i&X-Amz-Signature=3f9ddd33ca3a70227493e2e1f969538ef3be0651bf6ee784dc7d3811e26ab3c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

