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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2HZICQR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIDOTPLbpMXHlEpodqyw1ll0XCbe2bd6SN0nZq815DuEyAiBXpu9BeDx1IrdzFUUeNOIhGIy7KWC7cBR7oKjO1QHB6Sr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMjyKpv30s1sAgLPECKtwD%2BgZ0OJqeR6uvHgrWMmI0b9l0ZPmpLdMnc%2BJXxf9ss9KYddO%2BLgrTtX47XqP6CY6VYpvTtU4rm56Fz4MlhuTb3fOMa71PQlgZBHC3dVSNTa9MsqOcGj1G2TZC%2FqHygJA514TBxywjA1nuquStOnXAOAL2wVBAqL2vPnexCaOP6erKCMiN%2BEQI94dRSCUVn1pkXYzhzok7LTeGE1kbXj3InmDXBu7y43vNs2daP0zSKrBjSGM3k%2B0PLo%2B6qkQzQaXRblOlqRhDms6zHNs7%2FrhAzUN89LK4mVABEcq7GL5oj6p%2ByU89wd3W6EVkHGtc98aLfg5ISMTluTKd0wQv%2FTcjboU5kdVk8WIh%2BC2AOMpU9EY8tFE5Po2wr29PSI5vdLarZCgzL5DweF6GfUxxnpMMv49xBPCk4Aq8FRPZZztAiogYvL67N4AWEPfPYIJH3A%2B0LqytOH6Al7ZxYvNp1au%2BYJz0Sxnt4E7xWsBiF6WzsHL8YqWH4UyXOy5pZwi16F4CdV4jkAHzHMI%2F5C0zITs%2FhfTRh6n80Rwb%2Fnnk8D7YzzBpAezXo8%2BzG0ZgfANNmatIwQXKCaa%2Fw2lZt1J%2FtZQpaGlBu%2F8192UZ6WtAU7TwVY08mlaVJTcgCogS2YYwkvSKzAY6pgGNYITrTL4DIpQyqrT3s2ahIgPaaLjArYSp1i9jTON2mf1YaXiOZxGDBL8Te4oStyAeE56KTsSqPcyAJKvALvq4fgfy4QgjQBs3o%2F6T3qXBSfrdaO842gup2odfN3fl7jr4WaHFF1z36DcgeZ9INmb8c6puf7BbGixuI%2BBIRTHFwEBHsZdhmkFUSUIZ7dueTwgOc96D7sxXy7VHp6K7RJAgijZO%2B3pY&X-Amz-Signature=40400f02817c018d0fc9378c517a5095e616e88f69c86e93106e1083716191d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2HZICQR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIDOTPLbpMXHlEpodqyw1ll0XCbe2bd6SN0nZq815DuEyAiBXpu9BeDx1IrdzFUUeNOIhGIy7KWC7cBR7oKjO1QHB6Sr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMjyKpv30s1sAgLPECKtwD%2BgZ0OJqeR6uvHgrWMmI0b9l0ZPmpLdMnc%2BJXxf9ss9KYddO%2BLgrTtX47XqP6CY6VYpvTtU4rm56Fz4MlhuTb3fOMa71PQlgZBHC3dVSNTa9MsqOcGj1G2TZC%2FqHygJA514TBxywjA1nuquStOnXAOAL2wVBAqL2vPnexCaOP6erKCMiN%2BEQI94dRSCUVn1pkXYzhzok7LTeGE1kbXj3InmDXBu7y43vNs2daP0zSKrBjSGM3k%2B0PLo%2B6qkQzQaXRblOlqRhDms6zHNs7%2FrhAzUN89LK4mVABEcq7GL5oj6p%2ByU89wd3W6EVkHGtc98aLfg5ISMTluTKd0wQv%2FTcjboU5kdVk8WIh%2BC2AOMpU9EY8tFE5Po2wr29PSI5vdLarZCgzL5DweF6GfUxxnpMMv49xBPCk4Aq8FRPZZztAiogYvL67N4AWEPfPYIJH3A%2B0LqytOH6Al7ZxYvNp1au%2BYJz0Sxnt4E7xWsBiF6WzsHL8YqWH4UyXOy5pZwi16F4CdV4jkAHzHMI%2F5C0zITs%2FhfTRh6n80Rwb%2Fnnk8D7YzzBpAezXo8%2BzG0ZgfANNmatIwQXKCaa%2Fw2lZt1J%2FtZQpaGlBu%2F8192UZ6WtAU7TwVY08mlaVJTcgCogS2YYwkvSKzAY6pgGNYITrTL4DIpQyqrT3s2ahIgPaaLjArYSp1i9jTON2mf1YaXiOZxGDBL8Te4oStyAeE56KTsSqPcyAJKvALvq4fgfy4QgjQBs3o%2F6T3qXBSfrdaO842gup2odfN3fl7jr4WaHFF1z36DcgeZ9INmb8c6puf7BbGixuI%2BBIRTHFwEBHsZdhmkFUSUIZ7dueTwgOc96D7sxXy7VHp6K7RJAgijZO%2B3pY&X-Amz-Signature=40400f02817c018d0fc9378c517a5095e616e88f69c86e93106e1083716191d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JM5MRC6%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIALbqFjDqRdmtymWefc1CmHhIF52%2BsBLtsdUCjxAi5mBAiBbPyLyEz7WdIvebqBnNqELHftpOOtb3I6w7IeLUXDB8Cr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMklyHprxEGGNuwVTSKtwDZHxcWE94hKU8qQjQmakDBWUblsAcbavhgpa5Rs7YiSnPmxceZDwCcvm1XMl6%2Fr36g0qYZF4dIHxPPMKtIyIESA%2B9SY%2FXcNKENXS1F5R%2FHnAk7QUGu9vHdc5e54GWYzFlKBUVX64u2DtOHBa5IVqdXS78BIxAVVpSJj90lbHWlBbbqb%2BuiyhYmAQf1trwiDMBOLI50TRdbErpNE8kXG6mBx0cpqH7q4ETyhnwAM7N3kjW9s6qZ4WRZibaNqeM9yuQjofNpTdAoZn17KAKxmFUSw1nKYlGYDvpLA%2Fz80MrnFK1jxdGKY7ak%2FRVIxNXprMEKL0V4tm%2BVSjUw8%2FuDwliQrJPm4CY8Xc%2FFX1VoRc8c3kHzpa%2FDWE4kALqFjwndltxVGgP0gizTiYmgCtpvb9uOk0JsxopEt6N6npNj6Ot6%2F8V3kphPFwVpoXVa0hUadyb%2F6f3Iappp329Jv7fEydPSpy7J%2FOHVl125Fg0J9dHXDhlrMVOBoTj63l1Z7vAhAiKJHAPucAsjXWemM8A96kGjErn5CYQeFRH4264p4VHcacoNgp4RXfzpZcQEqQg1B19VdPCixqJNNRSX3Vc6o0pkXDbJMrklNhnQck8VgYRnndEnF7DezsdBCdVN3cwnfSKzAY6pgGAlcTjtdnQxWLs%2Fca3Tli%2FTryqxXzQEUWBo7qnj6qqbkmv0FXFqQFdQyLlhCDBt%2BDl9B78Tz3U%2BtCqDKutMcGp2ZtPBrFWUHQnNiTymf5UahCgdqtzC67nIRrVxTFO9LvsFPuXWUXRKmAKQPexrSv5egdTKPraGITCGG%2FEoYjLw4Zk%2BZfGeaK92ojRIqm%2BiRjmjW4UFA2S3osdqIEv8iKDm9OZ%2B9Cl&X-Amz-Signature=b07f496c465b2201077044ed1c18030852c541e59f5244acb6cbbc5580934f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WGCLCX5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBjlKWr1%2B0jfEIjK3XdbWm2rLHITaOKdb%2FsibzX4sTeZAiArbNbS58FkeEfSZuwfVOb1W0kYx7WgeLrkUCJGfQUX7yr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMpD1NHs854dPPALKkKtwDoGvXopR8CbphgGbUGsV6k4hdfQRDX0yaf0tnLM2XIBspyA75%2BklV4dDzeAD8TAg6p%2FzJhZx360%2Bn3W4ppBX%2FbRlTFgFFX8QjppGVw1F7PgK1S6l%2FuT2u%2F4%2B1SqC2wWewVqhsZZ7sQb1TfyswS9IfODx3JSd18R3qwXULJaSJg%2FLDoJy6b35Wj5%2BivoW5AlUyYHSXgHHEozQtKihxWNv1Bgmvih3UtSrwLoA54K2nkiwfHG6p0zKferUscnswMR8O%2BPw7Dv9W95YiKvHyAX8RRF55gnUkjh62STm9gViIg4Q%2FLEPWKPib19A7RjL5KpwtF%2BGFKAmLzhgUl1fEsYgBI2fwBkpKxVabpwskfXSjT9vJ3BFuFrr9xVH9PM2pSe3ZRbc%2F%2F%2F3KQzSIgubqVQm5BXJI5%2FBmiCpbIQsUwu3wKRE8DYraqeNr1MCjl0watREONaGIMXLsX4B6JlfXjvPrb4Q45TK0pLJuGELE6oGL%2FcB7mZz%2FIzdmNvSwjIBM4mHPRzdKWRe0T3xrBH7i%2BHRY%2FfJ3OeyKr2uPQLjOyGukrUvCZ8frngiRy3Jq%2BBMC5XD7UXgpytNoUPk9QBYqVYJIZnXXGwdoOW2ie8ggMJzDqt2MDDFbJfX29YSSnCMw6POKzAY6pgG%2FXCDkPt6v9CO5MBU1zm0VOkXrEjZA0iFKASQfKd0W%2Fou1UZit54s%2F5FIs3cC9IgySkCJRTwa5MC5gOwfdYBiQ94JkTtfL7sN4pFgDt9R8XLV1gHXKteAqihVe82SgeRFg1RBlnTTvO0a4ybFt9myEl%2BwKdI0200rHPHSQzUpLZ1qoK14XcvtzuziNSZnwOlTwWvw82Adut2cSInf33L7REi2Oakd0&X-Amz-Signature=8cdafdb1979b03bb0fc3955508b22c4530380708d80c7bd685657b7ce88b8556&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WGCLCX5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBjlKWr1%2B0jfEIjK3XdbWm2rLHITaOKdb%2FsibzX4sTeZAiArbNbS58FkeEfSZuwfVOb1W0kYx7WgeLrkUCJGfQUX7yr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMpD1NHs854dPPALKkKtwDoGvXopR8CbphgGbUGsV6k4hdfQRDX0yaf0tnLM2XIBspyA75%2BklV4dDzeAD8TAg6p%2FzJhZx360%2Bn3W4ppBX%2FbRlTFgFFX8QjppGVw1F7PgK1S6l%2FuT2u%2F4%2B1SqC2wWewVqhsZZ7sQb1TfyswS9IfODx3JSd18R3qwXULJaSJg%2FLDoJy6b35Wj5%2BivoW5AlUyYHSXgHHEozQtKihxWNv1Bgmvih3UtSrwLoA54K2nkiwfHG6p0zKferUscnswMR8O%2BPw7Dv9W95YiKvHyAX8RRF55gnUkjh62STm9gViIg4Q%2FLEPWKPib19A7RjL5KpwtF%2BGFKAmLzhgUl1fEsYgBI2fwBkpKxVabpwskfXSjT9vJ3BFuFrr9xVH9PM2pSe3ZRbc%2F%2F%2F3KQzSIgubqVQm5BXJI5%2FBmiCpbIQsUwu3wKRE8DYraqeNr1MCjl0watREONaGIMXLsX4B6JlfXjvPrb4Q45TK0pLJuGELE6oGL%2FcB7mZz%2FIzdmNvSwjIBM4mHPRzdKWRe0T3xrBH7i%2BHRY%2FfJ3OeyKr2uPQLjOyGukrUvCZ8frngiRy3Jq%2BBMC5XD7UXgpytNoUPk9QBYqVYJIZnXXGwdoOW2ie8ggMJzDqt2MDDFbJfX29YSSnCMw6POKzAY6pgG%2FXCDkPt6v9CO5MBU1zm0VOkXrEjZA0iFKASQfKd0W%2Fou1UZit54s%2F5FIs3cC9IgySkCJRTwa5MC5gOwfdYBiQ94JkTtfL7sN4pFgDt9R8XLV1gHXKteAqihVe82SgeRFg1RBlnTTvO0a4ybFt9myEl%2BwKdI0200rHPHSQzUpLZ1qoK14XcvtzuziNSZnwOlTwWvw82Adut2cSInf33L7REi2Oakd0&X-Amz-Signature=b41eb5b082efb99c3153a0e50f8aaa4f11bcf6805430b09fb9d731c337d44b10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OQD5MSX%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDALqU9g8qDKXJyxKC9FF9GufL3%2FldfkQJ%2F02sfFsl92AiEA3yuht9PKNUmLdtbbadGYOsgYTBbVQKV3xV0i%2F06vyKoq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDPvQ7w9%2Bz4phE2kY1SrcA3KmSLmXQrVlUu5Vptv6VyWPxZwLRCKyrG0yonc5gBivPTHTgWLEA8oV5h9xxyrzafgHKCIxF3E26xYswMjAV9ep%2B6N3ILr3UsMF4AdHp2ZlPdObjL5ldWTOxu4r7SSEhn%2FF8Mu3eMYgB%2FoodzbXrfK8%2Bw6CpPnUlvojMJ2dssloTUzRrOu%2FmYn9QnjAFXG8Q8cNDu%2Bzw7gf2d93kl099mu3ste4rBqMbtm0hqA4tYCzq%2F%2B1sAOLCzY%2Bpy0PWxhgFcGW1uVSY8mWC9HXEORiTQkHV%2F1tXu1fCWpskU86I9YbhX4R5ln5qhu7N2%2F41cYviI0ucZjevYFEhqDQTS0j%2BlBCTb0AmkOF840v9S2s4bnx7QBCZWYT8E0G3uL7xo298mKYl26Sakh8OLF4fY3SExWdPWMHhFtpMenEyGL7NuB8j4NTCY4cawCLo0oLPuM%2FQzeCCavUM1ksUWySZqehdbyQC56oorCwrAM9F0NnGD7nv2nZjleRo%2Fd2%2ByHkGB1OzZhkWBZp1yGSdK%2B%2FcAJHGKyMssRV7Nzv7p0BHDHZSNLu3KBzQedAzWJv6qCnclJ72dFkkw1jJkRK1wxqExvpSaFGrgP6hgaS6U%2FHEK4%2FnY%2FCJeUVhQ6fUtjs0tY2MNT0iswGOqUB8NY1L6IYE1wH4VDHNNaY4bkOK29YfA3F6wpFOX41jyh2TvzLpsNTnu3NbyrZsdsFcNSVXviRlHSrTrQRDNVG8WqxJgV1nbYR81E%2F%2FUcynxvV%2BKI0d3nz1q96gohDocJGTdthsSWXAsMuXHw94FoLCeRGmn0Z2OXWzqEdX1dMNWvzRlR%2BqUHZyDYp0xbCevBvakiXZzqscPmMjZm31hjoUCvB%2F0sE&X-Amz-Signature=e0c08c22d75350193dce6bade5bc9b8d114812cc83b921371fdbfb2d4ace22b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFBTZBSS%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIHAmgc8o%2Fm1vP9AD9GShB0KW6p0RLZbcpvh6IYeHHfDXAiAUFTKe6pdaxvrVGNRkD%2BXDwRFawbp45AxTsZmyuC%2F6bir%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMFxU7pIWU1xGK3uatKtwDtJ1rUYKnVTYo3bOPmewvu3VfWePCrTKYQxx6NRLrFbh%2FqjR9rMypZ1dyJBHneAmEWmMMEChP225733LN%2FY69NwdMgaeBQEEqnTHUpiH1B%2BELwsDHrkHMMChtIO1hSZwBqtEaZzgjlD%2FntGJBvbkLE7uJ1O%2FRpvD0I0lRRqSh1YPtmibQgZexIK%2BO1a6udFhr2POQPAWNdXoWrBG0WDETweYYHust3f4vV04JiwnEka4oLhpl%2BlLUkJ%2Bf1vguHOWIjcAgoA4TdBJHYwZa3XcSbLVbdl5myBvds8NLmNF12uGkWIT9gshsMjuMPZ9U2zFaPbZrO5%2BVAMedaNiqn2AQG9khCTiN%2BuenPzZIBWaTym6p22c6c8af5rUsPaYvtmE51z%2F9v6WuYGi2acEDiapsbbltRT3MuPlfZuHOZAwPxX4KlhKLhQ2DtjekANm5lvMJ9ZaLxGBvTdoGlrkMBVJ37v6k3ttkQoC%2FQ9MNHzdvZrb5ZNjFdOehKZDjKIBsD1m8BZDaqcTr%2B6ELrbs5nPxcjDC7RogPKuDPNJYp1zZMlF%2Fpz2ZEUZYrUdy8LihufcAGtKDKkLCZ052AYB8JqFZ78T3K51C4S%2BYF1CT3Z9nMUSiqvGo3hBngZYGOjNMwg%2FSKzAY6pgGr0TdIzFrzPi6FHdD0eZcuuSbibyRQ5UHkUCHD3E08YfB9bAh4OmmuT96poBIk6CiLoQflrMt4TysbXyW1fuFKaWQilV%2BSxz9r24LS4xM37iO4e7enWeSu2R%2F1H0PUSwLz7R5OHsRyarXlb%2FbQGde4CbEPudLJsiipNgyvqyEI1TvTsuqsIZVGmP%2B24fSNwbNITarxfwxiIC9yfASgGpWvHpWc3%2FCJ&X-Amz-Signature=489fc8dc27b8208c42ca0d6ab92c29db4f834abfc6c2af7556abcc287c80e0b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2D2MFG3%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQD9qbRzm4A9Ggrrb%2BBRpJ9REm7FCOJGS%2BjkU2K7WjPSTQIgV37NHzSOqle%2B7abIdR6lDo3hQNIuEHGaHlqx6ahx0gIq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDKoX6a%2FtJbyRgo1CDyrcA3YqSq3R2s6fPgX8kTIfubQe4xzNjnPV%2FN32aak8wIJuG%2B8dB%2FSsNndnpzl0qCmG1mVneF25XZFERbHVkkLVHmwKusRaXbPJ3Cbk48hDgxk3jPtW29jjqmaLWa6iLP%2BKS5VvlUI22ZmdStcPOz0%2Fx2IzUo5%2BlS0ytRigYw6tc9zjicvnOp359DyV1AXgz2QtelqwMTrnt2yPAnHSjaI80gk%2FzMEjaJD832aHOPVWPQyRYXkYyAuOEqeWt7CeXydzm6F2QKv6eymi3cCPvvCTzKINF6YVuwlenmG%2BvsHJl5bL4xO35XEiLha9GInk7rzxRXu1TAl3h9KlCKbJ3AY4B8I4Izx1PDHjT85GTUDOQGk02n3VIWvArQXSG7ij0mn8zK5XsjouoypPgRnRV0lSLIm3ixDvR9p%2FSZHEAND%2Bt5Lo7aFBmm6UQdJmbwPvNUi3nHi3KADTsDdQkwZIEsK7t5n0W85W%2BTMf1v%2Fa7ttuilDwHkgY%2FcEjRDvrJDniAguN2hgpraKSApw3XW%2FKvC79ecR9c%2F4zN57WzCRyVwRBFI8q9KiHdgsM2VJc0FivRiG0VRpbJewWy3LDx2bSYaY%2F5isw%2Fg9wmXb6GDIAwI9OitifzQlchdc0oxj5KRmBMLr1iswGOqUBo0nNIxqP%2FUgVdMAi%2FVIZLuOp80TI%2F6WduuV3GBi3guRiIV4YRYpOSeVTOQaqSeeLvW1MeluF4K0bwLsj9mV35%2FOJuwsFJPuiDuCZc7ifbi0ae403Hud2Rh7nTCMssNfRx1cxcCTsXZIbX3SXUedtYSap2xOBp%2BAezOzjqCLX6ElfP7PlZvdGsk0td7%2Bzn%2FyaxUl5lrUV%2BdGK2K2aFqriMxF1O2SF&X-Amz-Signature=23c52e71e39d98a179c622c68082d490166b0985f715d45a18441e2832530f36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFQULIVL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIEYi8UITHlAm6mKikcwunSpUZEXYhiWtWMOXj9zoC5kSAiEAxlmBJl%2BFNmlgjcrq%2FK9F0sb1pi3j4%2B2YKzsQgodfAC4q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDAeioieZrq%2FFgFD7DCrcAwY2X3%2BlZ3iadqZdh4T%2BKCuBa8SEuv7ihmnSSTM2%2FwntMRDR0jmAypJgTZbheNWMg9ZI5njGerbCMAauuMzUlgoVXTuUuH8n4ShgdmfKPw5iXQ5ONCUPa7ADkgNebZczVBqKOBsIQU4KwmZ4E%2B4O2s9Jxaehf8Q0lA1GnAj685E9J62zncASqcPZS1%2FqJcjKWkO4mUXZK2UykgvPUeNy5JyB8WPaZJtVFw9xKgrJzQPWmT6e%2FBiBor82hnIMOxkWIhMw%2FqGCDCbtRMCSO3CodKvEWfQuX%2FDqUYlLv83DQu4ZGmpsTB8ZdF3TywJ8DwiFgXi6OIP8JsNe5a2nzsIBi93XMds3Tn7IorJlTFv7r%2FGZXBPU%2Bk51u8Jp6Ti9UtKnjGbfCtWiHY%2FEIKTylmCboVBKGEx1WlQddTXMQNT%2Bq4P%2BWbiMUFa%2FkQfTyS%2FUhv8oRp1LM7Nd5FdaOpjCyw90P35ay3Hhp0%2BHNa774IYHoLxXobB0Z8RI2sg1%2F9h7WFG6LbAYTDWIYjRDM%2FSvka5EugsPNuTkL7%2Bbdbk9pl6XPh1hICz39A4SJqWbiSya2qS%2FfbInQrhwkbfq3iOv3Y0oCv2BjHvZkUNQ8EL%2FPw4hYAtTEokjN0PEJ8OUi8gsMMf0iswGOqUBQf8tvJDGy4QDD0mw8ngLdJjvg%2Fflz1c3BQxck3tqGPba5G1yPMRY3fK1NmP0NjHnT7fpkUy9qvqfQrjMyiiGI%2FnnOVT6DLVEiLTYUW8m%2F5ykumWEy3JxtgginJyATtBVkVl%2FUZdP16m6trHJV28bzgqJkugZv9gtmFsFGCxmkqXKPncK37Da0WuLvl9htzF9ASPiQ6OGKNf5fj9l4sfK6lOxadWz&X-Amz-Signature=751e28bf39606ee09e5950d64e6fab0ea2cabb8a5a9a3eee65735a20a90599d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFQULIVL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIEYi8UITHlAm6mKikcwunSpUZEXYhiWtWMOXj9zoC5kSAiEAxlmBJl%2BFNmlgjcrq%2FK9F0sb1pi3j4%2B2YKzsQgodfAC4q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDAeioieZrq%2FFgFD7DCrcAwY2X3%2BlZ3iadqZdh4T%2BKCuBa8SEuv7ihmnSSTM2%2FwntMRDR0jmAypJgTZbheNWMg9ZI5njGerbCMAauuMzUlgoVXTuUuH8n4ShgdmfKPw5iXQ5ONCUPa7ADkgNebZczVBqKOBsIQU4KwmZ4E%2B4O2s9Jxaehf8Q0lA1GnAj685E9J62zncASqcPZS1%2FqJcjKWkO4mUXZK2UykgvPUeNy5JyB8WPaZJtVFw9xKgrJzQPWmT6e%2FBiBor82hnIMOxkWIhMw%2FqGCDCbtRMCSO3CodKvEWfQuX%2FDqUYlLv83DQu4ZGmpsTB8ZdF3TywJ8DwiFgXi6OIP8JsNe5a2nzsIBi93XMds3Tn7IorJlTFv7r%2FGZXBPU%2Bk51u8Jp6Ti9UtKnjGbfCtWiHY%2FEIKTylmCboVBKGEx1WlQddTXMQNT%2Bq4P%2BWbiMUFa%2FkQfTyS%2FUhv8oRp1LM7Nd5FdaOpjCyw90P35ay3Hhp0%2BHNa774IYHoLxXobB0Z8RI2sg1%2F9h7WFG6LbAYTDWIYjRDM%2FSvka5EugsPNuTkL7%2Bbdbk9pl6XPh1hICz39A4SJqWbiSya2qS%2FfbInQrhwkbfq3iOv3Y0oCv2BjHvZkUNQ8EL%2FPw4hYAtTEokjN0PEJ8OUi8gsMMf0iswGOqUBQf8tvJDGy4QDD0mw8ngLdJjvg%2Fflz1c3BQxck3tqGPba5G1yPMRY3fK1NmP0NjHnT7fpkUy9qvqfQrjMyiiGI%2FnnOVT6DLVEiLTYUW8m%2F5ykumWEy3JxtgginJyATtBVkVl%2FUZdP16m6trHJV28bzgqJkugZv9gtmFsFGCxmkqXKPncK37Da0WuLvl9htzF9ASPiQ6OGKNf5fj9l4sfK6lOxadWz&X-Amz-Signature=fdf339eeaba23b4e8cee3971ff7880f0d876bfa1b72bc5a36621735b3977a25c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSC3YOAE%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBZQl1hDLt3S2WOjpYsgLYCaZ2RVpxZ5x0GjWKg0n91jAiBquzJxTfx3GM%2Bu5Nhfa9my46sXJtU3MgJrx%2F41dk7OhCr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMUey%2B6tO43ygxnhpbKtwD9fVyC3bBtKJTCpc1XkHlPB%2B0Z1R4y26vUieq7KgSKjuJCRkArDYz0DM8%2BBHbozl67huOWwdKUDr1yzzAeukENQ7QpRLMIx%2BOm1Vrixx15e031YzeJqajKtv91Lue57PufCMsLmv9emFLHyZqlUe0%2B2rvPQu1oi4ZIAEHqmzKkC%2Fv20GCxjdGooW%2BjjZpO7yUwMWhYxqDGPjIc4v%2BGuapa3e6DDtCpKsPwwHdGxJPJLfW1LhtBBjs1DD2BxTvKEZUNSNBqYcr%2BCg645kKfDhzN9xPEvmyZjLPtq4yAnOMk88Okkdxoh7dgFg2JT%2FddMRrPf6Zl2zQMdOb3HNYpR%2Br8rdJSgIwJKlOG6sQbqsRFiKl8LNA09EhdkRq8BwVoKk5VV%2B1Zs6%2Bf5acwfW0dm1s9XnaAzg1UZl5Mt2gIbIITSxeve7DfSrUAMdWy%2BGvYPv3SamIqxI2lYxSD%2FCKmv8GLtEixB6knKRgty3l%2Fdol62lQ30lkNG2%2FaVa0Rc5Co%2BSh9pDepVlod38egX%2F7OXoOo9dICRHAvoPgMgelMfuvZuuuWG%2FcTxkfqd0R8q3rZR%2BFz%2B%2FWY0pvMGbOsQwasPgqT2yWahPhiWG2ELjWHzLMDUyvP4rAIXIwctFDtfow0%2FSKzAY6pgGJLEps%2BYukCGHQ8kZ3HEdPmMA%2Brlp0BdxNR6zCFmTx2pxjZziGRctcaeLKrbQNjgmaTfeksSGEIQw8Ecy1PvzEg9JU4S9JfFFQO09XItSLehIbwWGKUUWFecw5LHLqJCQM%2FGIknzMFkUeYHiTPl1pq%2FC8YbnYpxs8KahVkY0fgUshS7LA7eOkGMZ3vsThUv13wmTNwZyyyZMXeaS9c%2FYQ1rZtzDURf&X-Amz-Signature=d7e9b505ba2c22c9864471f3e20146fe7e81cb6a31522382d4eca509b660d469&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ657AIT%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDSMgKONz23ICPsL0EDupSYhEYES19gYnXBvG9%2BBBkwlgIgf4Too1auzi9aeMUwmGGrjGFwNUTb%2FN15ghb13BtaFrUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDFVMPEz%2Fw7PuIB8kOCrcA6CUBjzj73EmrEPRLWNxy5ErNKIYwvK8t5y%2FjO2mQnKM%2BslwvG%2FSeva4rhnfYq13Vk6jE%2FED9Bg%2FN%2F1SQRQMBL2Z35OqWazG7QrLJcv5UtkNOVz%2FmiUMnSc8xmGr3k8ZqhrKcAvlvHY0OjtxLE9KusHu2Qbv0Imty6ht%2FvPZKh9vaJIBEPBuVks2bJdcGVfMlHzwwu6525Qrr3do8N9ThgBIIXpMClskCMWF85fmbzL1L9%2BL%2BcATFp0%2BgzeGCkwttGvPAKbxfZ8bo0wFJlS14VoZO5ILGLNwsveGeGOVUwRLyMWNE%2Fi%2BOGLeDIDoygcdtwnvY0JTTSlfBuH7J09q5aXFzkJQGYuExDlQ4mv%2BIuIJantlOQjsUbyaLxzAx0fQTNmnYI%2BxNNJWTGcCOd8MoPUQTZW%2FcjfcRRKh7rw6vG%2FyEQFP6K%2Fgk2T7D2K7OtHcJ3TwcBiK3uotRZd2zhY8aphlVnigCRvOjFBdsW89wX7EgJ2l0WL87ugqru%2FXXznwIyOXSdYsx2CxaVMBNUXN8mazCr%2FNnNQYnSSF4HVEERm7GEDXozvRu8u%2BQ4uZEJFjoHCP5abeKDv1xWQidE9QO91gKDXe19N%2BpLHXEGrYIPcH0oqpNFQXrnEiwHEUMKX0iswGOqUBXNiFLCrehTImKAUCGrHZ%2FQHRAAOSznBTQ5uDP0T4KZfWhwiWizzkSSv2mJetVM5s2%2BDMgMaArywLjnN2JFNMEK%2FXK62%2FFRA8rvAYOIAE8iR4inLV3hVK5TWQpTmudg37GHg6octXLbpFQOujvC3zU5S3MqV7TZTkY0eLwMuFKc1r0sSOLfCwJ6YVXJHc2cok5qKp%2FjpHXJSbjmj19eL83OHQtdZU&X-Amz-Signature=a7cdc988cb76c72be19f0590afa65ec70eb216e3880f5254bbe691b1c1d4b1c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ657AIT%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDSMgKONz23ICPsL0EDupSYhEYES19gYnXBvG9%2BBBkwlgIgf4Too1auzi9aeMUwmGGrjGFwNUTb%2FN15ghb13BtaFrUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDFVMPEz%2Fw7PuIB8kOCrcA6CUBjzj73EmrEPRLWNxy5ErNKIYwvK8t5y%2FjO2mQnKM%2BslwvG%2FSeva4rhnfYq13Vk6jE%2FED9Bg%2FN%2F1SQRQMBL2Z35OqWazG7QrLJcv5UtkNOVz%2FmiUMnSc8xmGr3k8ZqhrKcAvlvHY0OjtxLE9KusHu2Qbv0Imty6ht%2FvPZKh9vaJIBEPBuVks2bJdcGVfMlHzwwu6525Qrr3do8N9ThgBIIXpMClskCMWF85fmbzL1L9%2BL%2BcATFp0%2BgzeGCkwttGvPAKbxfZ8bo0wFJlS14VoZO5ILGLNwsveGeGOVUwRLyMWNE%2Fi%2BOGLeDIDoygcdtwnvY0JTTSlfBuH7J09q5aXFzkJQGYuExDlQ4mv%2BIuIJantlOQjsUbyaLxzAx0fQTNmnYI%2BxNNJWTGcCOd8MoPUQTZW%2FcjfcRRKh7rw6vG%2FyEQFP6K%2Fgk2T7D2K7OtHcJ3TwcBiK3uotRZd2zhY8aphlVnigCRvOjFBdsW89wX7EgJ2l0WL87ugqru%2FXXznwIyOXSdYsx2CxaVMBNUXN8mazCr%2FNnNQYnSSF4HVEERm7GEDXozvRu8u%2BQ4uZEJFjoHCP5abeKDv1xWQidE9QO91gKDXe19N%2BpLHXEGrYIPcH0oqpNFQXrnEiwHEUMKX0iswGOqUBXNiFLCrehTImKAUCGrHZ%2FQHRAAOSznBTQ5uDP0T4KZfWhwiWizzkSSv2mJetVM5s2%2BDMgMaArywLjnN2JFNMEK%2FXK62%2FFRA8rvAYOIAE8iR4inLV3hVK5TWQpTmudg37GHg6octXLbpFQOujvC3zU5S3MqV7TZTkY0eLwMuFKc1r0sSOLfCwJ6YVXJHc2cok5qKp%2FjpHXJSbjmj19eL83OHQtdZU&X-Amz-Signature=a7cdc988cb76c72be19f0590afa65ec70eb216e3880f5254bbe691b1c1d4b1c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNJUTQLA%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T032413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIGV7%2Fi04KesTeqgD%2Bim2W4D83eYE8eGmZnrn4KdS4y4aAiEAq29aIJCtaIsg20pa9%2FbJYsjfG0lF8W%2FI9dXQyvIFI8sq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDHXl938CbTg%2Bg9UOUyrcAxVFa0FjHl4lOheCGOSy4%2BcADswvg7ahEc1Lh8Jr7HILk05oYo2BfPUUO7ehaw5FJYxbbnckBAWvnX%2FtaQ4ZjM59hMiVH0ViLCYUa5O3SgbtmGUC4nFHxM7LYo0eHdhW41kJ%2Bfa%2FGpXiWFDWtNGt8UqiqmhY1K%2BPOUPCjnRAxMhCgQN8DVN2rIVMEB%2BDzna92Isskc%2FITNxuNsjRDRtTvYs2q1LMrgP15LKmWlHeDHcYcDredET8mgRVnWq4Gi495JtabFicMSafN9HiNHYoKQ5BV9I6pnZVL%2BkxSKBrHNnIHTwhGlX4QmUiR9VPvMPPl2kZfSNvJDqf5bG485QX8IIQ9sE5AmLp7eno3nD3gNAjhhxdZuSg%2FJifLXRImfyzNKu8dWJiBVkgkWnd9O9fLIRAJncFQnj%2Fo1lgNZ%2BNb6D2MwJWIgptUEYXWw5N4tCbN9kpNdpR2K5quLaQQtl2IE%2FR6AAApmjqLRzNOj40Z3izqxhDo2ZDalJ3GPh0QSIeAbU0Wme6tpBO1XXUkGl4fUQrsVUVp3J%2B%2B9BFHicU75tFmFm%2B49uSxikx2zPC1GjAmuMO%2FPIlgoYx6iBL2o%2F195muX0WD3Keyuy5BSSXIib6XQfPp9tGljX5GQ78vMMP0iswGOqUB2oxPkyE0qmYN3%2FFLnfYlrENj7e5GsJkvXQPATA%2FS62oPlr7yptTzXCIhNoNxMRXsmfPGeIRbCxbFHDaOt1eJQK2UAQvMzNQ2c1vBxBRf3TBy61XL0U2oncmjejEUTwaAl7U1NINTmVyK4aKSLTg8qH8cc3K4R2LrCYhdlnyo89FLRRkeX6fYjUF8zQwsO7MIhAATiQIwUHQwP59taw0AVmXG3deH&X-Amz-Signature=eb3bdc63102ab8c865da8882336aef0564ac6350acb09a2780c59fd9626de399&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

