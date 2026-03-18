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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B2IHJS6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCnpEZMFV2UsQkFqat73s756QGj84m4NokQZnB0UcmcJgIhAJa13Xdd8%2FPNYrLhPMJ02JzawOtzpSv2B86ToNUWdT7uKv8DCAEQABoMNjM3NDIzMTgzODA1IgwxrvlO2jK0tp0lJdMq3AMQjCB%2FXZvHgyFdXjEVe%2FeGQJIyKEC4Zgya%2F6oJoapV1lMbE2%2FKUEUXpIQWbrpnUatdqzKGHvDLCzTG%2BkpFBDwncoeQkWADJi%2BF5nOK5xtFIkGonSLHTJQ4HpKtklCLyWhXnBjdkOafUQ7KlAxHE%2B%2BYv80zo%2FWT6i1K4dFW7dEmpWkQ%2F06VGbqRSpoqkeBs2u0rrO1BMZj1BRf9BEjqxyeDwEWjcMQu8z8YN4qu%2BVoWJ%2FnAY4OQJBtw6TzvwcZnO8FzPaTjctgbbRPydSpL%2FDPCuBROq8iqDM9xkMDXYJxcq56waFGBiXCC2FL4JWTGT49HAeO4m7zocUajybIaneeUIpugGsWAVqLCdhkhsd5cn5QhT76LyGJPjezGQQzhgiZ%2BfCCrUOso5lCuhSvZuZnBv20caj0HAEJ55O%2FyC3YURgvIL%2B4sIZ9M%2FYbEmzbyQ4iQS3PPkfOopJfDQZJoug8Uw%2FDlJMEdG%2B7BrQ7sbdf1V4QmTbDR5tE2rkN7ypmbyPiIR6HZ0Zk22OsuGc4HmgvN2BX%2BN8p4aJaV7tfTvyZhRVCWm3Ve7W067ltaIOo88d0CLEGlWDyaEJx%2FaAQji6CABH2T%2FNvwAZokv0kHXLGMz2QyFD4%2Fj821cs8BEzDUwenNBjqkAaLY7j8Yu0rBYyiMQwn7cejUYoFXQ%2F4LFd8bZHQg3aQFY1%2F4DHHY8I%2BR6XDOZQjZ%2FQhDVI3GKutzA3%2FY33WrevLcIn7MtarM9%2FfW1dKizM6oNPAEOGNbVgkd%2FmWumKcR7jsUWFFZ9pa7dJNUphC%2FqiATJhz23NeSxbcPlyndHUlsUiMlR5RIo7pxJCA8oyIpAI0GegNXW7gf5LUZa5aSoXnixHhQ&X-Amz-Signature=54ad0447de4175da3c36fffe9b8db76d43e86d4ca5800f966cadf4666af9eb8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B2IHJS6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCnpEZMFV2UsQkFqat73s756QGj84m4NokQZnB0UcmcJgIhAJa13Xdd8%2FPNYrLhPMJ02JzawOtzpSv2B86ToNUWdT7uKv8DCAEQABoMNjM3NDIzMTgzODA1IgwxrvlO2jK0tp0lJdMq3AMQjCB%2FXZvHgyFdXjEVe%2FeGQJIyKEC4Zgya%2F6oJoapV1lMbE2%2FKUEUXpIQWbrpnUatdqzKGHvDLCzTG%2BkpFBDwncoeQkWADJi%2BF5nOK5xtFIkGonSLHTJQ4HpKtklCLyWhXnBjdkOafUQ7KlAxHE%2B%2BYv80zo%2FWT6i1K4dFW7dEmpWkQ%2F06VGbqRSpoqkeBs2u0rrO1BMZj1BRf9BEjqxyeDwEWjcMQu8z8YN4qu%2BVoWJ%2FnAY4OQJBtw6TzvwcZnO8FzPaTjctgbbRPydSpL%2FDPCuBROq8iqDM9xkMDXYJxcq56waFGBiXCC2FL4JWTGT49HAeO4m7zocUajybIaneeUIpugGsWAVqLCdhkhsd5cn5QhT76LyGJPjezGQQzhgiZ%2BfCCrUOso5lCuhSvZuZnBv20caj0HAEJ55O%2FyC3YURgvIL%2B4sIZ9M%2FYbEmzbyQ4iQS3PPkfOopJfDQZJoug8Uw%2FDlJMEdG%2B7BrQ7sbdf1V4QmTbDR5tE2rkN7ypmbyPiIR6HZ0Zk22OsuGc4HmgvN2BX%2BN8p4aJaV7tfTvyZhRVCWm3Ve7W067ltaIOo88d0CLEGlWDyaEJx%2FaAQji6CABH2T%2FNvwAZokv0kHXLGMz2QyFD4%2Fj821cs8BEzDUwenNBjqkAaLY7j8Yu0rBYyiMQwn7cejUYoFXQ%2F4LFd8bZHQg3aQFY1%2F4DHHY8I%2BR6XDOZQjZ%2FQhDVI3GKutzA3%2FY33WrevLcIn7MtarM9%2FfW1dKizM6oNPAEOGNbVgkd%2FmWumKcR7jsUWFFZ9pa7dJNUphC%2FqiATJhz23NeSxbcPlyndHUlsUiMlR5RIo7pxJCA8oyIpAI0GegNXW7gf5LUZa5aSoXnixHhQ&X-Amz-Signature=54ad0447de4175da3c36fffe9b8db76d43e86d4ca5800f966cadf4666af9eb8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CYVZMMY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIBtNpy9SEXsA3tWwhNWvZk0Wb5WqnVZhEaoRgYDGjThTAiEAmwh2Jnk1zWDSr%2B7QtXP2v1q8mg9cH9rz2uIyBUIgDjcq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDGuXts1QgAMbLCqKUCrcA6y5UysPJuEsTAakOrbQ3qzVcT3sLaE%2BpJt74CRn5zLDFYLUKsZ53ShZj0FchIkt3nLRJOgFMq0M2K71y%2FZr6ARK5QsD8lNaMi005%2BdntvtIirTkcSwh6PGlcmk%2FbCPrY7lD%2BTScSk%2F%2FoywnmapsF1YB0QXdM%2FDn06O5szHSuiIFB3ZBGaZ%2BaXPV4vh3DS0OAI64MNbF1dvjblqz0bqZRl9CD6b0c6H2LLW3E131Qzl9hk6By%2B306B3FtXFYndHJ751fhnCesvMRyT6Nth6d87wvPmXs788NkafSFHFRzZ6x80IRdq%2Fuzufm1J03bCDnJ%2FsP1xX%2FE00WNmPa0fEqkBciubdkApXjDmFo%2FHoHupbjgKEjI4c7%2BPvTD1wqZ%2BMlrpHBhpyUQ2e9Tu6NabGBqpiu3cRPzjYUYIebpywrloSMmIZuc7QQVolATkNj8iKRkK%2F1pRbklfhWHXu6so3cH%2FPJQYTmeOLmFT%2FYvmGuwAOtfQ9PV%2F32ZVyuyG7DhGBUV%2FHXGKpdxqWhq6ZmX3oECCqF0%2Fojb3knATBjJiaMg674trPrDdn7Gy2GoQGj7QLpGc5li%2BEq%2BsJ9uLWpmoVzlZ1JHysB%2FufYVOODYL4QJRm0fEO66Oq9MDnnRmBYMJ%2FB6c0GOqUBBIlknwyg6Y3ecwVWvp4Ig03OLCkGjyaiEInFmTDTYnMGlujftHwUTYybDOgL%2BYeQ%2B0TRMWHWyD1AYIxm%2FoHwxYHg%2F4jUYk9Ka7gCFnJrx5y8V%2BXu0hTCJOaXhjWY%2FYm5YTszPny1ZFTx1jQkPeQbfkbQczG1vOm52bab3TxJXIv7MmY%2Bg%2BcY3iIekwGcgB%2FdcjMIWk%2FEnVqFWwkY9WepWrL%2FXCa1&X-Amz-Signature=b5996177276d1c242a99f77bc0090d9dec27372d31e8ca16dae4679aeebd7ec5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4RC5TH4%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCID29OklJZt1sszG9%2B9xkHUz4AoyI3Z4f987p1Yv3xs5pAiBMprA1TJELR5mobYfhJnfvpocnzJvx4zOACkCHjWmJgyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMRXmxPqgiaV5CtNvhKtwDXwXaHpW17OJb9J1l3yADAwzihXjGKUO8383Bf%2F6znwJdt7wqX68W9pf8x5uIdl%2BpHc%2BcFuKe0jVWBNmuDS3CPXz84MSNBEab3FT%2FlFzaNjUNyLcGEZaodhLGU0szXC5%2Fnxd2SDI63WA2YVW1rA4pPC1JdL9lzAsH%2BxzDFa1Jpnlf6P9ujLJuKVVBEn34T%2FordCu3vtNy957KCp3PVdqmctHhGlFMgsctbWezIiZD0gahjgfibGRvaRibZLTtoXXbFt%2BhMOGJkP%2Fzl8uqrnqIAxz6MS0W1XHle26HgRxVRW%2FnwVQ8115UDJxn4WQ4XNQ2YsSWz%2B8vJ0uXMlybm%2FJpXxU9s40%2BWaTyXNhnJrhmIeNON6LUnlmXP8nPnNIUjScZrgpkRJu8Fss%2Fsv%2F6FfHuwp4%2BzDilBxYI9MDANH1co3QMVCJX28kdTbXeag4SRl1xXjGTppecar%2BVScn17LDdsOwGXtdDQ5Qvdf9gfFB%2FG8mIj2SOmyv3VskP7dTvR7QuhwBLQ7bzVv8aBCgtUBd3zcNtKlBmdAy3CAsNH8z%2BLwk72jT3DEM%2F3BH7dL2cbOZ6iotHcAkKVa1nkSc%2Fy%2BQdvHzioTNi3MZ2A2voOJN8s1NI7dyhZfPGcXR49L4w0cHpzQY6pgExMRTFOQ87ijB4%2FHhprv6rMv%2F0HZ5T1aU26%2FlE6J5R0uKN2ZxobaILSXwah66mTAJnVLZWKAuooZMY2D9J1w04Rh81agqXeoIHwmArYtbGuzrYf2lwzq2Jpl3w42WBrt33IkZiuqhUMQx38tOg%2BKsQp7tniMtRsft9wc4glUQhCJbMKVHTpd2gJLFxMy4gGiDxP1A2c6ff1MARrkG3UuiAHXpe30cj&X-Amz-Signature=368c1290e31128b90c08f18315f952876e55ad22caaa4b3cd39b31cb14200874&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4RC5TH4%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCID29OklJZt1sszG9%2B9xkHUz4AoyI3Z4f987p1Yv3xs5pAiBMprA1TJELR5mobYfhJnfvpocnzJvx4zOACkCHjWmJgyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMRXmxPqgiaV5CtNvhKtwDXwXaHpW17OJb9J1l3yADAwzihXjGKUO8383Bf%2F6znwJdt7wqX68W9pf8x5uIdl%2BpHc%2BcFuKe0jVWBNmuDS3CPXz84MSNBEab3FT%2FlFzaNjUNyLcGEZaodhLGU0szXC5%2Fnxd2SDI63WA2YVW1rA4pPC1JdL9lzAsH%2BxzDFa1Jpnlf6P9ujLJuKVVBEn34T%2FordCu3vtNy957KCp3PVdqmctHhGlFMgsctbWezIiZD0gahjgfibGRvaRibZLTtoXXbFt%2BhMOGJkP%2Fzl8uqrnqIAxz6MS0W1XHle26HgRxVRW%2FnwVQ8115UDJxn4WQ4XNQ2YsSWz%2B8vJ0uXMlybm%2FJpXxU9s40%2BWaTyXNhnJrhmIeNON6LUnlmXP8nPnNIUjScZrgpkRJu8Fss%2Fsv%2F6FfHuwp4%2BzDilBxYI9MDANH1co3QMVCJX28kdTbXeag4SRl1xXjGTppecar%2BVScn17LDdsOwGXtdDQ5Qvdf9gfFB%2FG8mIj2SOmyv3VskP7dTvR7QuhwBLQ7bzVv8aBCgtUBd3zcNtKlBmdAy3CAsNH8z%2BLwk72jT3DEM%2F3BH7dL2cbOZ6iotHcAkKVa1nkSc%2Fy%2BQdvHzioTNi3MZ2A2voOJN8s1NI7dyhZfPGcXR49L4w0cHpzQY6pgExMRTFOQ87ijB4%2FHhprv6rMv%2F0HZ5T1aU26%2FlE6J5R0uKN2ZxobaILSXwah66mTAJnVLZWKAuooZMY2D9J1w04Rh81agqXeoIHwmArYtbGuzrYf2lwzq2Jpl3w42WBrt33IkZiuqhUMQx38tOg%2BKsQp7tniMtRsft9wc4glUQhCJbMKVHTpd2gJLFxMy4gGiDxP1A2c6ff1MARrkG3UuiAHXpe30cj&X-Amz-Signature=1ed6b5b44f532ad7041c45a5aa54531f44e5c3f4ff562f8918b12c601d0eac36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UT7YZNUT%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQC75o%2Bi2i5PhtEabmGIezwtPfDZYry%2B2e8ieKLFeGLeAQIhALRVW8qRyLtvxhNAlw87jqSVggdfN90cLoQ%2F1Owl39JTKv8DCAEQABoMNjM3NDIzMTgzODA1Igy5k0BFAhoBXWJXGZYq3APL8%2BG1b4WioVU1YLrhvy%2Fm5PJjWHhxc8pN0umXiPbA7o5km5M3YpEsRfeIVMmwq0mRQwuX3usCW6oAqs9HdLMjqStOdf%2F99whPrfQZOqH9xJMDjmfcXtzgmxefJV4buOMsn71MblMEBgjtOLAenAs%2BD6RoFI0cNHKAQ%2FNhG4OlO892QFia262CTyUfonVoF%2FX6eKmzFxvUVX6JIo0dWQ2fb%2BSkkwqqXGNIAmSWAeK9EOI2H7usLdqY%2BBhL7GZ7kF23uRpxSxHQfezzrNDhDGWiVF4ecoq8M7tdmhKeoGRB7wuPYF3GZrTskHjaxv1Ne%2Fa1X0QEc0AdB1TXFUKpjmbopOG2D7NsgzfkwYcv8PUxyBaj7gx4ZzlLD%2BqayMDv3CfJFz4GhTJktmSrDKNOWZkzK%2BrML3%2Bz8cGcNJNOCZixM3k%2B9Q211Ed9z9nNcvhPu%2BhX2k%2FljR%2BbV3uyQfvW7%2FkWkzPEPKAY2G95QDZ4rAj4wo8Z1DRQY0UnVmY6D1Yo0rJneH5Q2ZnFwPwTVVAo7M9Ow22Ji2NxmRP3I8NacKHRMJ2njHe%2F0xUY7Q21VxGfpMduEZxX66WMbtALkn3yyTkxF2dj34n%2BD148kJNPLPifn4JJjH9Qrp7rmvEzmTCjwenNBjqkAaMLNXd268Y07Adbj6uUznoiMmuhysH1qmTI26YSzVWRXdcarK%2FwtOasZTvSt%2BcQr%2FOUxgMFUAhocVVG8QjbBgaK9u8mLhXds2iQL1th1%2B155Jgjr1a9ipmTVQj9HqShATqdkZskrvut0pM4RKK5%2B7c5wGgJdlEhsnkrTn8%2BVbo0owbi9uXPE8QY85fRJ%2FdFsboAvJII0aaJDN9mgp88LXFy0nlT&X-Amz-Signature=791062c33a7579907e40f97b68d46a14fcb2ad735bab7c949c00b642d29a86b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USM7IDHY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCoWoLXsWjq7H5eqZPmQv72qNq2aeUKvZWDMvizn5YmzwIhAJr4PAGj0LDa%2FbufLlMlEMtnrLvcGd5oaEGuLelZgXaiKv8DCAEQABoMNjM3NDIzMTgzODA1Igx15Nh4COAev70Bz1Yq3AO7rVkePiYH6L7%2BNAXeDyMluQG95fBSA7I53bMW6IFfNibMOk7m8DDQiSKbyzWCmlm5KAkqS5c9V44uEM%2F%2FDtF%2BSYwWgnyLwuOaoRMQN4CXDKsGt2V%2F%2FC3vPpGM%2FptDl%2Fvret9B%2B8rlNx6kJFdVA1mnJKchAfQ5%2F7uFFUYjkoqgvd9AzvqGbp18p%2BIZOeAt3HxoDRUAdA9WmFncgZWi6ToTHWhJOHDkzwkh4528r3dBAv6lPz1KdxqDjMNYxTy2dbNryewbVKx74P5%2F4jLscV4PUdE63Ss9XHKJObX%2FF3usApdGEllQpZeDgFiCwjpTWXCYfIHjA8kh2d6Sy2qt%2Ft9hfVVfw9ZouunZGdL5juAa4ebXOLM1Pkzmmnkd010lETMjPjwJywaGr5soqPrI4%2BDYoDXlaBPkSapx9LEp7oZSZrhiBDCnXPh0oLPpr6k06oqdTYyuwiYeCCGEsiUtYKJvyfa4mktSioLWP31fRuw%2B3xdANIAhiv4q3HUeEQ36NOIflVm%2FljAWQaX%2B3%2FBZL9NHWKjhTCKvfkNYYP67CDLIzYGFN3sycVu%2FR0bQYRbs36w0BtA5GscUv0xOOO9y9H9mrwYOxdTVdQQp80FFn7sifdeVEnXpQdn3nzdpyjCcwenNBjqkAQz1T6Cu4yNMJn53StjvfYjEKgwvGMKSS1pLylcjRV0aTP0MhScoBUXWuXuhHD2mrjXUWeNpD9S2NtWnJJe5tRo%2FVFAyga7NynMZyOK2Z9AYN5Gor2l5RHLNNtCkBKQy4Am1cVTwpUPoKQtkOofuKXxZVQcSvjpNl9CDRu1PMeLD9QMDxuj20Ax3YLSmn5wxg%2BpbQ8lydT2IVGtYKHKYIASNx8yK&X-Amz-Signature=8db82285da1395c7da5e284f0fcfe3ea5865b99814181781f90a30bfd15a4c42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4RC5TH4%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCID29OklJZt1sszG9%2B9xkHUz4AoyI3Z4f987p1Yv3xs5pAiBMprA1TJELR5mobYfhJnfvpocnzJvx4zOACkCHjWmJgyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMRXmxPqgiaV5CtNvhKtwDXwXaHpW17OJb9J1l3yADAwzihXjGKUO8383Bf%2F6znwJdt7wqX68W9pf8x5uIdl%2BpHc%2BcFuKe0jVWBNmuDS3CPXz84MSNBEab3FT%2FlFzaNjUNyLcGEZaodhLGU0szXC5%2Fnxd2SDI63WA2YVW1rA4pPC1JdL9lzAsH%2BxzDFa1Jpnlf6P9ujLJuKVVBEn34T%2FordCu3vtNy957KCp3PVdqmctHhGlFMgsctbWezIiZD0gahjgfibGRvaRibZLTtoXXbFt%2BhMOGJkP%2Fzl8uqrnqIAxz6MS0W1XHle26HgRxVRW%2FnwVQ8115UDJxn4WQ4XNQ2YsSWz%2B8vJ0uXMlybm%2FJpXxU9s40%2BWaTyXNhnJrhmIeNON6LUnlmXP8nPnNIUjScZrgpkRJu8Fss%2Fsv%2F6FfHuwp4%2BzDilBxYI9MDANH1co3QMVCJX28kdTbXeag4SRl1xXjGTppecar%2BVScn17LDdsOwGXtdDQ5Qvdf9gfFB%2FG8mIj2SOmyv3VskP7dTvR7QuhwBLQ7bzVv8aBCgtUBd3zcNtKlBmdAy3CAsNH8z%2BLwk72jT3DEM%2F3BH7dL2cbOZ6iotHcAkKVa1nkSc%2Fy%2BQdvHzioTNi3MZ2A2voOJN8s1NI7dyhZfPGcXR49L4w0cHpzQY6pgExMRTFOQ87ijB4%2FHhprv6rMv%2F0HZ5T1aU26%2FlE6J5R0uKN2ZxobaILSXwah66mTAJnVLZWKAuooZMY2D9J1w04Rh81agqXeoIHwmArYtbGuzrYf2lwzq2Jpl3w42WBrt33IkZiuqhUMQx38tOg%2BKsQp7tniMtRsft9wc4glUQhCJbMKVHTpd2gJLFxMy4gGiDxP1A2c6ff1MARrkG3UuiAHXpe30cj&X-Amz-Signature=a36982effca916a593de511a0ee1a2dada8f8b5d3c877ad38815391473127b0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOC4RF2K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIGfpwXSDsuISvzkM89WwBWGh9A7%2F4Iu6cOJwzm%2FwPNuCAiAoDjwAO9Z5Ij%2FPQbPg8kxi4F4uREKDzhKOn%2BdMq93dzyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM32amwIQoYBOLqhwrKtwD%2F34XUuMAbTjOO%2BkmV5nL10IAOT5%2BkFdO%2ByUwpHFU0mG9qsUm8XnBkQzWfuRa4kvo96CEOhXYFMBf6QgLC%2Bq6hgBHrntTos%2FuYOYj%2BSpi0GessdVi4Ai6VJdJSIwYoSnJWJaKszQBV7qsma7LItYYE9Z8jBCGoD9XKndZufxVQawtobEv6PMDrE2G5jRrEFYJ0%2FApHaSbVPi3kQ4xSL9kbFVDUHb%2BUj1tbAojuFqoCi1NqhD7cMl12jCnJoCB3b3FT9EDLUgFIKSlERQxhkik4N%2FxpWps7%2BWSSFuepVeWQkDbK5%2Bb7YzstCvPkShHzHvM8ZTsnbQcoArJN1dHbPEieadxHnZsQ%2F8HNjtyHshzGl1%2FgC6gvNa1CjYKhqSXzL%2FshW5BuktX1s2UCg2%2B3VOsrSqXjZ0%2FNqaY9naINpEKrLibrUNVJUll00ScBCczyz9gIPLjKTqdyy%2FY1V4PpsIWChQX3PU8GKu8GrVNDrfAFhc1SUFA2inOuL8blkuZyTBFou1N2HM4AXo%2F%2FQyiPWuJ1XRf36AHZmjtrW4L5q9QpfAZCURxSNROeRG%2B63UdmEcrfNyaRRQ3LDlfJvAAIuZkt5kBKaGLE5c7222JHxGd28yHbxL1RPjLEdMZvH0wscDpzQY6pgG0b6Zhh9wWgeCcySNhQ0zC5siaGk%2BeRyK6LlL9mhTCkK1y3TqkMQa28ClJUV2lKC93ev%2FMCOFBX0VVVSW31fcQGWNJAb5NzDDaYRVqSIvX454regjcVUoG7e4EzUQZbQtOdaZuhFiY9l2uhY9nLz91T%2BcAUAaJebfnwRBjmTXldJ8uElDMld%2Bg8zh31x2Ld1HNSY%2FMPi5CNvn%2Fe1iNKdvjamuiN80j&X-Amz-Signature=bf968e2ac828e7f883007f5751ed6f0375fb118bb7b7927c66b150d227213a64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOC4RF2K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIGfpwXSDsuISvzkM89WwBWGh9A7%2F4Iu6cOJwzm%2FwPNuCAiAoDjwAO9Z5Ij%2FPQbPg8kxi4F4uREKDzhKOn%2BdMq93dzyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM32amwIQoYBOLqhwrKtwD%2F34XUuMAbTjOO%2BkmV5nL10IAOT5%2BkFdO%2ByUwpHFU0mG9qsUm8XnBkQzWfuRa4kvo96CEOhXYFMBf6QgLC%2Bq6hgBHrntTos%2FuYOYj%2BSpi0GessdVi4Ai6VJdJSIwYoSnJWJaKszQBV7qsma7LItYYE9Z8jBCGoD9XKndZufxVQawtobEv6PMDrE2G5jRrEFYJ0%2FApHaSbVPi3kQ4xSL9kbFVDUHb%2BUj1tbAojuFqoCi1NqhD7cMl12jCnJoCB3b3FT9EDLUgFIKSlERQxhkik4N%2FxpWps7%2BWSSFuepVeWQkDbK5%2Bb7YzstCvPkShHzHvM8ZTsnbQcoArJN1dHbPEieadxHnZsQ%2F8HNjtyHshzGl1%2FgC6gvNa1CjYKhqSXzL%2FshW5BuktX1s2UCg2%2B3VOsrSqXjZ0%2FNqaY9naINpEKrLibrUNVJUll00ScBCczyz9gIPLjKTqdyy%2FY1V4PpsIWChQX3PU8GKu8GrVNDrfAFhc1SUFA2inOuL8blkuZyTBFou1N2HM4AXo%2F%2FQyiPWuJ1XRf36AHZmjtrW4L5q9QpfAZCURxSNROeRG%2B63UdmEcrfNyaRRQ3LDlfJvAAIuZkt5kBKaGLE5c7222JHxGd28yHbxL1RPjLEdMZvH0wscDpzQY6pgG0b6Zhh9wWgeCcySNhQ0zC5siaGk%2BeRyK6LlL9mhTCkK1y3TqkMQa28ClJUV2lKC93ev%2FMCOFBX0VVVSW31fcQGWNJAb5NzDDaYRVqSIvX454regjcVUoG7e4EzUQZbQtOdaZuhFiY9l2uhY9nLz91T%2BcAUAaJebfnwRBjmTXldJ8uElDMld%2Bg8zh31x2Ld1HNSY%2FMPi5CNvn%2Fe1iNKdvjamuiN80j&X-Amz-Signature=aea716e18221c05e7395f8c8d92ebd0b9452cd67a7b0a44b70f777ef32720193&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VJONUX3%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDrnt%2FsfN6SjBExHfrw2cyy1Iwb7bUywBHxmDQGBQkqPQIgcJIu1Ux27htNG43RCiBi1mCTdK41qctjbm4FLHesC9Mq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDG7S2hG92u1rjI801SrcAxa3t79AgWJDgnSE2NYmFNPWBCtIOv6c0j5QD7OrtTnk5oQQrTJ1RjO1gMKi9ld0XRZs%2FUqIFOB%2BsAEZQfjspHX1RJlgsbgi0Cte7ltwBkX8DClA%2BG4stdziBZO4o7aL%2FFvfJhbMFuSvSYZ%2BNywiHO1prc5OHnnx67cSenrtVAykrvXF5HyU6oeWihLTDXHCn049X27syOvnFIMiXpRSdk1Ru86pUw4dUGRy760u9rSnDJ0HRl0QvRXwYatNRPJD9P9L7ERlrm0Wqe%2FJ%2BJ71Nig6b%2BDoY0%2BRVkov2JhbaHpj5jR00604QkK7EJy9ja%2B8eHpED4rTefM0PiAvWqhX2ICi81o46fFvJZGZfXmpCAuEQqQ%2F2o7HGv0yRSxIMNT7bfk908hj%2BY3F4EEdna5MaIdu4DFn%2FOF0PRfhVyzAnhtskOiRCn92Ykk9EzDk7zw9kMH6jJl6kcmQQZvUVYmt4YV8Qf1g4nW1qe%2B%2F4gssosoNGEaw3WP0BAc5xNeq%2FCY1wbuzKr38V4Zdj18eR%2BUv636SK9OBgFg3hL0KdGfKk6ktCyWtRIvjvTi9JjcffoEKTvRv7cZOCQIkFn2q3nNeimsk2WmGVqTyQz0QpBvJoZ3HN52WjaIjsvv%2F9R4%2FMOvC6c0GOqUBceQW6WiuVo4pZvMNyNp1jgkrOn9uMKOmiBf%2FM40Ue1loXuymjvmNbWivBVdNVLrpCBy3TUvqPJi6iOArT7GLkyrhxYFkQgfQcg2Ld19KBY%2FEfkd1xLMsAOeTIWN8dnTon8m2GTedWNSkhQD7y2NsSHeLrCX8dTSiQmg%2BfSMZloy4o82ZFMXzwAGnsn%2BrJpMPcmDZLQ%2FBFInqKZ22B2J6opsl7Eqx&X-Amz-Signature=38eb37f3d46600ac25a5e05022466bf618c63763721b3938a66e5d29ff8c4cfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RINNDRS%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIGO5vaw%2BvJWh3Fzlxjacqrm7nyJr1ra5Y7Fy0uTfnxFvAiBj39WbaqMQglurThMQ9Tf4JT8FiEgD0mCobF6SdrMo7Sr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMBFWybIrr8ZEM8Q5zKtwDaAdWsMWvILWAZmRgQURLs2YPpRZraVEl3ppiJmxvlfyT3p%2BH92RCE5LCYWBrIx9CL3cJsPX87f%2Fr7aEbUV03SMxr02V0DJ3wONAxqI0%2F0puc0ZcYRiFTlLDntPpob4Hic2cjSST3LrSvkoJu6QNT51bU%2Fx6DXV7ZaSq0auCSchhcSJ9hrAGgFKduuieBwMJ20nGIlRIljMbRqOcZOljiAHWWMpYr2zmRG3jK8zSCKZd5aVcLaBNXsB3zUr%2F73uutQamEe12ValgV9n1KrGO5sQ7d6WjXVjJ46BuqKgGx35IK8CmyS1anWJ9Zzu0kAtDM0BcCa1Wy8YEA3sXY2LT3PnkHHLdh%2BqpTe3fqLe7RXzbdYZgimnsMpj6bIxRHdluM%2BhllYlbcmp6OIUrKWyZii919DduIXOL%2B3%2FwaTiA0NzG9nNmOdIQnekK2sSlsI6umsCm6SuRCnXB6%2FQ2U%2F9hP8U%2BmlIfwVj4ffYAIkF4sM9fsrZJT%2FVteWNk0Ra93XAUiwaihWrhHF0Su1%2FANZOa3gBzt2Wl825QmsjFiTnSUJ6gJugJpYqC6SBrb5YDFNQjLHmrGoS%2B7qlcaYroCaD6EHWfHd54Wx8N1y40xiKQjxcx7%2B%2Bx%2Fc1B7sM8UtQIwocDpzQY6pgHi3X3PaaKXmWZFh3yE4GAPNYnsWMmsIKqLLghdzVjqQH4avoPSNaYPbWNdhb1KNZfbxjtmfh5O%2BB6dfzDyJoAeP2XIdhqLFaoBqZRqvdHOszT26gTM29F6vrm3pVJcpiYBZ2zOj6pdEKcAdS3s%2BJCYlnVb0AtKIcO6sblCvkJD%2B5HsO7x%2BZ%2BWUEGwc5aYitaNFxf61Io2mlMqholSc2dvBRqziLdSe&X-Amz-Signature=e5b9f7305e9cecdf2bdca81300332bdb45d97e97afd548e623ecb521890c0774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RINNDRS%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIGO5vaw%2BvJWh3Fzlxjacqrm7nyJr1ra5Y7Fy0uTfnxFvAiBj39WbaqMQglurThMQ9Tf4JT8FiEgD0mCobF6SdrMo7Sr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMBFWybIrr8ZEM8Q5zKtwDaAdWsMWvILWAZmRgQURLs2YPpRZraVEl3ppiJmxvlfyT3p%2BH92RCE5LCYWBrIx9CL3cJsPX87f%2Fr7aEbUV03SMxr02V0DJ3wONAxqI0%2F0puc0ZcYRiFTlLDntPpob4Hic2cjSST3LrSvkoJu6QNT51bU%2Fx6DXV7ZaSq0auCSchhcSJ9hrAGgFKduuieBwMJ20nGIlRIljMbRqOcZOljiAHWWMpYr2zmRG3jK8zSCKZd5aVcLaBNXsB3zUr%2F73uutQamEe12ValgV9n1KrGO5sQ7d6WjXVjJ46BuqKgGx35IK8CmyS1anWJ9Zzu0kAtDM0BcCa1Wy8YEA3sXY2LT3PnkHHLdh%2BqpTe3fqLe7RXzbdYZgimnsMpj6bIxRHdluM%2BhllYlbcmp6OIUrKWyZii919DduIXOL%2B3%2FwaTiA0NzG9nNmOdIQnekK2sSlsI6umsCm6SuRCnXB6%2FQ2U%2F9hP8U%2BmlIfwVj4ffYAIkF4sM9fsrZJT%2FVteWNk0Ra93XAUiwaihWrhHF0Su1%2FANZOa3gBzt2Wl825QmsjFiTnSUJ6gJugJpYqC6SBrb5YDFNQjLHmrGoS%2B7qlcaYroCaD6EHWfHd54Wx8N1y40xiKQjxcx7%2B%2Bx%2Fc1B7sM8UtQIwocDpzQY6pgHi3X3PaaKXmWZFh3yE4GAPNYnsWMmsIKqLLghdzVjqQH4avoPSNaYPbWNdhb1KNZfbxjtmfh5O%2BB6dfzDyJoAeP2XIdhqLFaoBqZRqvdHOszT26gTM29F6vrm3pVJcpiYBZ2zOj6pdEKcAdS3s%2BJCYlnVb0AtKIcO6sblCvkJD%2B5HsO7x%2BZ%2BWUEGwc5aYitaNFxf61Io2mlMqholSc2dvBRqziLdSe&X-Amz-Signature=e5b9f7305e9cecdf2bdca81300332bdb45d97e97afd548e623ecb521890c0774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCKU54JS%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T083300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDrsBsSlKLrsH4gdnnwlr2oJT6CGK7h2ycSQK0YEvqxkgIgXysupC2P0WoD3tgtwOji3XGB2LC2%2By87eustx8t0jcIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDG3QBKuv8GYHkmpILyrcA5FAwfMMTo3AiE64rvDivlbzjqg4lHRR7d8mDjOSvOecsxO4Y7PA8vtRcxrRvcQaoxGDkNMdPaaF%2F1gU%2ByX3uLQAZ2q2pw99X%2BVAHV8ZZjkDH3pivf2B8ZWlEKjO0wjIMRC%2BkeyhJqNypBblgYOxfpr9aFSKWai%2F5%2FCF0bsEeNzaJdvNNyNLiT%2FI%2BH%2Ft5iDqFrkWn9wg5XyGpxasTKpzBpO2gh3PQRRjR2%2Fkse7ry%2BFURLKD0y%2Bit%2Bo%2B0BhBbMsl7crINH7LC0So3AU2kFFX9LZHhRUDyWXcoVfR00tfn%2Fk%2BGdOr4xtnWZKpE6RxijJLWTwpjRvFuOG7dCsB7hkbfoufbBFI7vs5u785IsOLJSHvTbyuo5%2BKbUD2neGfDEdALtEny6n4435mqwwy%2FMQSvKM7b2Kww6hzpM7Lw8ZBIjvjtols2m%2B2uy%2BE8mGjagAZj%2Fcvd%2FPLWKvwsZqkjcwGSCnseMItPhIAHd9BXbInvtj6ouIglzlSGIpXqX2B4BFh0KxVDLOEZUKNbhnNM88sii9%2BOHk6sye%2BxyzF6R%2BL16bEykapiOPl8fuuy1%2B6sKRCjocqaKwAsJ69VpUUeZP0hkKdKPS2ULmm7w688tETZGz4JzFj%2BXjDWFtJ1PW2MJDB6c0GOqUBEKbi0Xa1pfDxanV0CFiV1PE%2FJK%2B3tVAD4X%2BHzF1uvhgF%2BbzkAPyD%2FurcISjJCHD1yki7%2BfzlPaXhM%2F6B8pgWcAzPe8LuZ%2BOSWxoaQtJxHQtai%2BqbX7yBkejGHav8xjgsbU2nG9Dg97tRQvcB7SrDz3LkLwlghioMMLDL1bkB9ot%2Flb2RAPKsy0PhRprXa8fMldeG%2FsAbfeBBN3wwmh0hhscaalBK&X-Amz-Signature=9671064976cbf89264e8c0906b47bbc46d1842f783ef668cc024b299f3edc151&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

