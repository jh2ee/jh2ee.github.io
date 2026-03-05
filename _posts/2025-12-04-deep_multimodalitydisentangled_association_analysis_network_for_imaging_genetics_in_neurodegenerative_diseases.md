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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD24W2EE%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIG9vaq%2FYMOssK2qBmCHLIS3TqBmFVExNwe76c1iIiJ0RAiAr4OVTYfvT99htDFLqFzVnI%2B%2FZ%2FSXcxWYXFYPSt9BZryqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3BYnWfI%2B1peKDc2OKtwDHBnS58ioI9irkmUv02WZ72Be59e3l%2BQOd4aVhkfEK8yxmrW%2BCudcEXtDGLkstv3Sh26aTPUerDNP31rYGrIwpxyaL2ibbFvVVv%2B2aZtnJlKYrRVhticxXg8Bj5wYe%2BsMO2UrG%2F8a7P6ApAvciaOl0gLVJV12lBRx51hKcXRZNbTuPdW%2BZpTIi%2BHxx%2BLccoXRZJqo2oo%2BEpe1kwvxEq6FRuhPIvjiLQ3%2B9jlNenDTNJxfcb%2B4m7Yk2KxxD8W8F4pNN2JK6mzpGltGvq%2B2LiaXXwyIupreYKsTkH5LTGwIgKjo0jVXHImr25zYZKjiJDiPpDMRSkwaQzvzXtmKnjIBO5Fqmt5dRUjnaAACUUkAAq%2B79vY7sUSA8Q6pVWIxYXpHygJJSaPl3m4FN91vnGTMccY9PtO1vzJzVpn64O2tlzQdU0Q9KQbr9E%2BCCqEufU60GLh9Mwse224Jm55yVVveVm2bUbW9Wl2vyKURoHj0N5Bw3aAAsfCtp9VTiGhMC6Qqv27vcMjDOdYjmHSxBJDw%2FIIF2%2BBqsEUu8999vYnyt89J6EdSPv8RSzM1o5uk8kYBx%2BExxFaHAvmbien6ERWs6U2d%2BnGlAEEp0UsIeZjiS1tf%2FwdrXMLXAc6PYj0wq%2F%2BlzQY6pgGP02ItjRc1yk5z0a03vXMlSQ4lXzUD%2FFhFkl2mw6FtF5x3BGTqv7ztAXNkKx%2Bnl7nl9Ok9eUpeE40JW3JfHRj1oQM5Wg51%2FLW2YLt4NTk7OBv4%2Bp9eNCMfbHF4YlCpVcK7P9GobzqpSQNITlxcjis0UF0hEW1ECkKD%2BK2aalQbNXtXqAhgNz96klT5pDz6D7FmyeHdRuCUGX%2Fxa91Gni5VQRgdI%2BO5&X-Amz-Signature=103df60478fccaf438d47a885eae45b86017955cf455389679d5b4635e9de62f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD24W2EE%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIG9vaq%2FYMOssK2qBmCHLIS3TqBmFVExNwe76c1iIiJ0RAiAr4OVTYfvT99htDFLqFzVnI%2B%2FZ%2FSXcxWYXFYPSt9BZryqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3BYnWfI%2B1peKDc2OKtwDHBnS58ioI9irkmUv02WZ72Be59e3l%2BQOd4aVhkfEK8yxmrW%2BCudcEXtDGLkstv3Sh26aTPUerDNP31rYGrIwpxyaL2ibbFvVVv%2B2aZtnJlKYrRVhticxXg8Bj5wYe%2BsMO2UrG%2F8a7P6ApAvciaOl0gLVJV12lBRx51hKcXRZNbTuPdW%2BZpTIi%2BHxx%2BLccoXRZJqo2oo%2BEpe1kwvxEq6FRuhPIvjiLQ3%2B9jlNenDTNJxfcb%2B4m7Yk2KxxD8W8F4pNN2JK6mzpGltGvq%2B2LiaXXwyIupreYKsTkH5LTGwIgKjo0jVXHImr25zYZKjiJDiPpDMRSkwaQzvzXtmKnjIBO5Fqmt5dRUjnaAACUUkAAq%2B79vY7sUSA8Q6pVWIxYXpHygJJSaPl3m4FN91vnGTMccY9PtO1vzJzVpn64O2tlzQdU0Q9KQbr9E%2BCCqEufU60GLh9Mwse224Jm55yVVveVm2bUbW9Wl2vyKURoHj0N5Bw3aAAsfCtp9VTiGhMC6Qqv27vcMjDOdYjmHSxBJDw%2FIIF2%2BBqsEUu8999vYnyt89J6EdSPv8RSzM1o5uk8kYBx%2BExxFaHAvmbien6ERWs6U2d%2BnGlAEEp0UsIeZjiS1tf%2FwdrXMLXAc6PYj0wq%2F%2BlzQY6pgGP02ItjRc1yk5z0a03vXMlSQ4lXzUD%2FFhFkl2mw6FtF5x3BGTqv7ztAXNkKx%2Bnl7nl9Ok9eUpeE40JW3JfHRj1oQM5Wg51%2FLW2YLt4NTk7OBv4%2Bp9eNCMfbHF4YlCpVcK7P9GobzqpSQNITlxcjis0UF0hEW1ECkKD%2BK2aalQbNXtXqAhgNz96klT5pDz6D7FmyeHdRuCUGX%2Fxa91Gni5VQRgdI%2BO5&X-Amz-Signature=103df60478fccaf438d47a885eae45b86017955cf455389679d5b4635e9de62f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZEQKKAT%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQDxIPQ9z4wUPezmPj0x0Ufv5knfKFCFBXSB8Ms9pPdtPwIhAPvLbV2q4ld%2FEycq8V5IPa6acob19c4VapmHB39yJ8ttKogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwmh%2BofEywHFTXueZwq3AOQf148Ra3O9xOikogIXsKPoGL%2BqxPupucU46fMQvRsicKYd1NKodky9MVy9dTu5reuqOSgaT0kiHiWf0csn4T4A5euJbdbwg4RQeXCPayzXXGtDgqguc%2F9Od8EQgHf1WVxMWo8a7%2Bqc9dkNK%2BTGHh8SRakTBKTlvOlF7a%2FoFq9HIc0WuRkoMnj1LsPXRTeOuL1pe9sMDfZausdMxbakKrdvyfTt%2BpG%2FrCNO9eFQCXzCyLwsgL6VFnh8UxIJOxSxRtcQjVQy3cGmOX4rJpUdeZhmNyTTNxqZVSIGevuZ%2BOs9aNntb11Oy10D4%2FuXGkR2EWiPUsC3wURIcuwxqU3%2F2oHSr7TsLpFRqBIlHu1m%2FfiyxXa04kfQk8fx9vNaZbV4V47WOH9XlJI6vSUACXIMWriGlB4fzSj8m%2Bl77%2BwZFK2jVsSBIYEP%2BLXmqMOvmACdE7befdd7GR9PJDk%2FfNxeopmifgJ%2FC1A9PkaMvN%2BV9ud6F%2F1couKCYFyZ8SdPlaeYFKZuwETbZBwkuRmPWgxb4Hmo%2BgfMs3k16LyA%2F04URpPfAAuWOaNdEehvFYJpZBOmOkfeu%2FCZi3nigpWUkf%2FnsT7jAWKZFo9HXMezzQOEafJMDYezGsIOVezoeMspTD6%2FKXNBjqkAfWMtaKUjnhAYqAKBNFC1iWFJAucYRvsx8Sd0F%2F1xUBqTPxHYmSgqbcBrLHtA7tlh25TbE99UNgCy0T%2FRjI8XCw0VqE10hxByjShL4bfCyKWWIBNd0Qk%2BgYMlQgmoNvIaKWQ3N1I%2B2YG8lw12ZQMKqZUn5X8DXmXYMb6JDQu3uhee%2Bo%2FhJ6cfOjg5UVsmda9pKBZjugKLRiEFe8r9bSx2%2BQChfw%2B&X-Amz-Signature=a0231456020ba1a252a0c717b3b651f2bb4d02c5fe4103484e8b7fdecb9314d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGXBCUTM%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQCsFCpR67ut3UDE3LHYVy%2BjTcveuTclzavEHA4hq4rszQIhAOfoyigVTTZ%2FrOIsZ99%2FSl0DPPnjMzKgiUTOoQsYXW96KogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx1tYKU8lOJC4wrQ3Qq3APitW8UDHN%2FFxWjaGbwJNXUTf%2FgKa2LU9NvfvyRwCk42%2FCpDvj6HoVfqlHJUHbdgrC3N8Js4PxgN1p4eidMitsdRshcYY6MOlC0%2FxqdFKe1MVZNH7RaM5XrwY9w9MVUMANYf0IgrjHBHHEX0kzoAeSRpZsykE3snDLbSCf%2F%2F%2Fuhg8c%2Fhy%2B7QLaqx0Up4NmiErJFEN2vTB%2BnJqPjnCU0%2FleRWdj8BhWMDhcbQGs5YEkDWWvLZrKomoPW%2ByQoijIopaUXIlZbNT2kQoKeqstLJ63liNf2KUx8FQJhDe%2FXsh4tFDh%2FYcfjt49nsWm%2Fw9eHJONJc%2BwjlzhQUUzUW%2FHoZXq8GfBexnLHtxcunpBt%2FMhv2ifutQN%2BC5aevU1fnvR%2BqfSLtu1%2BXnWIci7Lvu%2B981zTABhiPb8mSUXWmFWKkCw%2FGFfqTRQiSMpIn%2B1215uDMccszWdupFzJ%2Fjhw%2BruByeop7EmLuyZV6gaCkcxdnuO1LvGpK25lZdTnSG%2BbaQT5OTu83%2ByZL3IqYZnaq0N6He5PSvtgEh0H5SEXL961jbmjFSXCYArZzzjgisosEXhJNJfzjcBAGLYlRvasVk5%2FG%2FwDcJQpde66eNr5TxGSK%2FZZO6MYxRUIxu57w%2BXHGTC6%2FaXNBjqkASvTU7r%2Fmat%2FcbWRiZfDUhAvkvMfKWES2nfy5lJkyCXK38hkW%2BLoSYifH%2BpXekMahSKP5wD6kc%2FGwoz9QDPhrPrpFnAfFQiBlwC8wEIqIsahSoczy9%2Bb146GlHeUvIvd%2F6lN5SoxavPODdYehhyOuCdYfw8J0gsa1I2GoJMZKjOY8aw2fNJJWbKShJzolnoRPUOiWiCebXHhV0zAMicux%2BXgzNEv&X-Amz-Signature=74abdef5ad930b977160fab5d3858e18e497b5b59990cd896604f35891a7f070&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGXBCUTM%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQCsFCpR67ut3UDE3LHYVy%2BjTcveuTclzavEHA4hq4rszQIhAOfoyigVTTZ%2FrOIsZ99%2FSl0DPPnjMzKgiUTOoQsYXW96KogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx1tYKU8lOJC4wrQ3Qq3APitW8UDHN%2FFxWjaGbwJNXUTf%2FgKa2LU9NvfvyRwCk42%2FCpDvj6HoVfqlHJUHbdgrC3N8Js4PxgN1p4eidMitsdRshcYY6MOlC0%2FxqdFKe1MVZNH7RaM5XrwY9w9MVUMANYf0IgrjHBHHEX0kzoAeSRpZsykE3snDLbSCf%2F%2F%2Fuhg8c%2Fhy%2B7QLaqx0Up4NmiErJFEN2vTB%2BnJqPjnCU0%2FleRWdj8BhWMDhcbQGs5YEkDWWvLZrKomoPW%2ByQoijIopaUXIlZbNT2kQoKeqstLJ63liNf2KUx8FQJhDe%2FXsh4tFDh%2FYcfjt49nsWm%2Fw9eHJONJc%2BwjlzhQUUzUW%2FHoZXq8GfBexnLHtxcunpBt%2FMhv2ifutQN%2BC5aevU1fnvR%2BqfSLtu1%2BXnWIci7Lvu%2B981zTABhiPb8mSUXWmFWKkCw%2FGFfqTRQiSMpIn%2B1215uDMccszWdupFzJ%2Fjhw%2BruByeop7EmLuyZV6gaCkcxdnuO1LvGpK25lZdTnSG%2BbaQT5OTu83%2ByZL3IqYZnaq0N6He5PSvtgEh0H5SEXL961jbmjFSXCYArZzzjgisosEXhJNJfzjcBAGLYlRvasVk5%2FG%2FwDcJQpde66eNr5TxGSK%2FZZO6MYxRUIxu57w%2BXHGTC6%2FaXNBjqkASvTU7r%2Fmat%2FcbWRiZfDUhAvkvMfKWES2nfy5lJkyCXK38hkW%2BLoSYifH%2BpXekMahSKP5wD6kc%2FGwoz9QDPhrPrpFnAfFQiBlwC8wEIqIsahSoczy9%2Bb146GlHeUvIvd%2F6lN5SoxavPODdYehhyOuCdYfw8J0gsa1I2GoJMZKjOY8aw2fNJJWbKShJzolnoRPUOiWiCebXHhV0zAMicux%2BXgzNEv&X-Amz-Signature=847d257a5c4ca5fac8b3110683df1f14a2f3cd9f3b4f61e27fff14c9acd11e3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYCYG6Z5%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQDFGOZn5TTxA4GEVOdGRp8FOdwXF00Ha2tls1Hcy3O%2BrwIhALSpB%2FQNpLL4aeq77gv0VZmXo5La5dwnOV9bAo7Ez6ywKogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDUuN653doQIlvT7wq3AOkHZ77ed70rSIW%2B4Xcp%2Fv%2FfOmOyP4fXUko5a93Osrl5bbtMa9VJxr8haKmvFGHOO697YrTDrXcwVUatyXWDuRlt%2FdUsv5mEXBWxE6f9QDIpbb5w%2Fgai504wBzL4OIQtCxITcNVBPMucRxlQ2KyonBP9fTp%2F%2Fc1ZTDzPGcqd7d8kX%2FuTdgZ5KgZH12yPlyOsGGiQUkSfWpRXOqZTVM62MRhfBiK5ZXTM5n%2FRlybgDIQF7o1q%2FsYW2r13TxRaC1tKzxHyy%2FpFZnsbm5VTxfSK3NHVi5r8mR%2FRzh6uWgTqel5bcxTqnxR7mT6AkBJgqD8%2FvF7YetiIhDuyBkfRsOHPF0p2it6%2F5GtTuXaUEOYucxueWkx8QQ5%2FtkNBs6r9f%2FoNgSCQuTQO14R%2F582DaDfoPMYpnDLF27mFNR8rNR0XUqQ1uKypwbIjNFFaDwhoXm24tMYA7hWbAi8fsxvisQWprmlDLjGJkPxy4NY5W0agKy4aXHnyLwNvbedTPTPffEQvjFtbzPuVwxJ2AWZI5PW%2Bwe8FF3YrtaYOvuQvRExUwrD%2BIEHWR5F4JgI2ntFTQJlxzSqyQhXq6fNKoF2tuSrLQHZ61%2BlZyAq4rEBHmyvdioiVJW9Bk3TzkCf%2FzlQOTDV%2FaXNBjqkAc4xhWnBvFLZsYYHTSip9tRicTHC9fwbUlQCOJEkff21mDCu%2FPCS%2B0MWfhJUDRSetMv0kKhnISTpKptNAj2l1kgHRn7FZH89clp2nyeIBfoygMw5aREMLQYIuek588lmR9%2BNR%2FZ462qSSW8QG55cGHq5BmvGHT3GQGuIIQk8VFU9yHF4MaJbWBRb63TqJclRcYSUJ8jkmHjKUNOLg8UtgQ810m1U&X-Amz-Signature=4b167063f98cf340493e19d19812e3cd88a431226a850d68ffb3d5cd4850831c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ML2ATY2%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQCtY5JyVqpgHJaUsJ0EKIfh2wCizrZgFNKGkLDAm%2BFGjwIgJXCtNk6S0uULtRtis1SF%2FMjmUejlnDu4sB9m7conpPkqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGcVBi7Xkfd6GeoBdCrcA3lGiHVzOUJnXevRCZuwXEejv%2BMF1xl4oCxpI7ZiOh1ZL6PKjXEibF9%2BhvVq%2FhJzwTZyn1ric1scYki4%2BiyM74hIHuI0LdzjeJKpEXnFB%2Bl3wQ0Z36yJ%2FbcDJCfSAuT0yCqTuMkYXTMuVwNtJcTHk8uzxWyIvBP2IVJ%2FlhTUJKiBnIXdRSsQ96liAVxqbnz29gaCQ%2FgLoKZa3vOVc%2FJwGv6I9%2F0Fevh5eC9HEGSKre9yfS0d32OMQl%2BFFrO2TWNvABenymMsf9px%2BF2gMi8zA%2Bz0C8h8KGFd19GeVfEPbYAZ1KMK%2Bq%2Be5HIr%2FvmHz3ZUlsZwCyi%2F7c5KTY6HnQVXtYW7kdLLprtBOLLhQOZZlNrPPSqSB10qm5KPjWT5XAu4R96G1ItAoah5s4ABuHeTo8Nhf2g9CNuACxJDeXgx0Gf8%2B0KChWWDBL%2Fx%2FiQOXbd9pBn0G4pQttmRZtA5xh3YWs5IVw%2Fk9aexMAjhfMqgSJQpCRp6%2FSYlClHOQsuOuTesYOiD5NPuFKi1VHQ9mMVxNYq8iaHSikigD6C16S%2FMSB%2FV8zdbzDqy0iOUUUtCltF9s7EWbJmyZLauknpv46L1IiuIY4NvYS66U1i1uz5I%2B1L8YhNLv36A5x6MiNtFMNn8pc0GOqUBIf%2FRjtt5oPfgYv4gEgK0agp%2BJgazF0MI9U6h6cif7noz7TVORtC97zebRUDvtyEqtbgAF0sk6Q41Almlmsxjo%2BjJQPQ6y38d9k2rnlXtM%2B8XpsprR1vXxU5LVtWZRLfxbf10Z6%2FVfKP8JxZ33UbH3Q0neAEgx%2Bdw2RyaIhW63PBYqWeWixvNnAcWW0dQE1kGrw2eSTkwKjhNC2l0Uz0cJTItuh1q&X-Amz-Signature=07cf75d8fee887627d07c9a13aced1b61879c187732d368254045f6820c04926&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLTCKFT6%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCID10YGSTcVWZbqmW3yWGDI0VAvY62T8unSjip7RXX24LAiA8D3v6wPdp7nYmRaASKMhfjdYxwukXouWtwzyR1wffXyqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMphFdVqB6Ccz6F3%2BsKtwDcgnXxG%2BXAs%2BUf7Kb76pRA%2FstApyl9y7HRUQvfqXZrpy0RagR0GZjT4Wylp9232J3SufQ8R8yzOorfIFxLjvWe5puBiLjZkAzEZCiI5E5ib8tLkKtzdDdZ8%2FSLiHeT1iiRWPVrp2xdDrZ%2Ft2L7Jfq7Q%2FdlA%2FPYnAeqw3gVCJH16xeSNm%2F1PxgLct23RJrB8j58fXcVXbLVtNcbOfDZJKlYUlZZ6GCzPResfe8TdC%2Bs%2FML4OqEkM0hDwv7oTTEnXE8FZPmFf4KYLt3D%2B2x5MoU2gor11t3mJp3dYbWZg6oV04jsLEs4W5rIkJNDp%2FkRBZel%2BjvujcmOtDcrCmPg8BkK7ZhsLxAr6hk9FV%2BzxJOrdc17C%2Bse8s37JCqy0C9LHKiAgkPFGPQksXgqtU%2BnLwuqfAhuWrAkANYRTCOtO7XxWWyRnOjs5Nd95nB4U1InPBRk2VlxIXkRf1aK%2FehyJR99IrJX2sGBWGUB7aJx6SpxngTWf64cgkWtVeDJ5XjO3dNO%2BfL%2F5q4rr%2Bj%2BO1CXDj5jy7%2F8jxf8zIkI%2FO9npGQExZweJVgTE78Grv0Eo30uCfaoqq8VGEBwOpKtZcKyZvKlfqLXR7DzruuVpZVFA3bE%2FTEiKYE80aQF2As8yswq%2F%2BlzQY6pgGB2agBwLL7NxquNHEUU%2Bkfa%2FXeRenCDQzScTlQsR48BFAZb0BIip5Gfhv79TBOgVROey%2Ft2qot0TkeSCGkNccqXSlIrY5mM86OGXE0HFZfoLZCw2SFNzWxfwP1ASoQrf3%2FqF1hwEryaS1JzkYZ7CmO2EIzgaw8I0DobJs9F5mIzNoSPgRafWhfEGJe7MxusZ6Yk85%2B88pq8TTNRBtDnRe%2F9Rikv1ko&X-Amz-Signature=89900b5801e732b33265aa6c0ae12ef532be943ad3e630fe5311e81d08cec595&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RM4DFUL%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIBXDUO7LCkLQ4F5hMAoBwmCVKqI%2Bi4iYiTrdjXK1NPQ9AiBqPt6eP5WAnxMxhqW%2B4SvaC4GtbpBfzCk8LKkx4fxasiqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0rd5o1WIH73e3zqAKtwDbtQStYC2CKmaRLk%2BYPXWzVJVCULnsodSEq3%2F6tSqqfbj%2F6RkhpTKhgHStznzQEJwannxlUHZ1THGgTRsAgl0x1EaIDmKTmUhuSPtRIvIuRiTE7TF%2BJUs05Mk7K93aWtgfn77%2FmTK91TrrUYVedrfnnEiRsbRD%2BlBRebSf0e4GdqfYxfLxA3Z9M7Wz9W5eCouv0RhF8soB8RCkdg2sTvOnqZ8SjE1KgPBHXmQkpyW%2BxPND6nuomL35bqiFi7M%2FZCyT0L7HS9RU8DFFSBIOaTXSpX8cEuMBoxlCnYO2zbsodfAzPkzD22Dzge%2BC0anD90K6Q5r38QU8xzsqCLlE4cavsYS20eIkbJaaA6bDUzjYbvKdpkOx3g1%2FTLGQ%2BQsbfh8EUxMzORJNwnrAHVAr9zr%2BHojQir8DhNlKELKj4VOpHpngyG4HvNOWfW9jVxteodhzWffJ1qh%2FCbqXFOCx4lTTkZi6AA60ee4SzK%2BGLcfg%2BvZQBVEfDnG29qFFpC7nb%2BZHVrfMa%2F8Z9d2XO5zFbNFXIlOyw21dgUnkzK0aS%2BM20Oh8FvYBMAZTMFAE7jAR%2FPzunuAUQ002H7zY0Z5%2BqRx5jpZjyDRCnw6oPP44ihRHDcQQdL3Z1CSRitJyCww4vylzQY6pgFQs4Tt2Y2q%2FtibztfoavMpXYPwsoqtCFL04JMgnBU%2FgtGa2JBQfLHQdJvTkLV9wregLTtvOO1ZB5W603D2HbDLJ25dF42RZYPHla8B11MZyxqxfW%2FdIp1XgZFDRx71d1lYdHPnKkzpkvctN8tywCZ77Os4bSJoaopLdJspZxeXgjl6L6JgFxqMlPJm0ZoUpb4f7G4NhpPwBTLGq43EqKrvCq7%2Frhrn&X-Amz-Signature=9719079310cbdb20fb6bff7b4d28831fd6a8b86b961e3fdb90502e482e79f70e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RM4DFUL%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJGMEQCIBXDUO7LCkLQ4F5hMAoBwmCVKqI%2Bi4iYiTrdjXK1NPQ9AiBqPt6eP5WAnxMxhqW%2B4SvaC4GtbpBfzCk8LKkx4fxasiqIBAjO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0rd5o1WIH73e3zqAKtwDbtQStYC2CKmaRLk%2BYPXWzVJVCULnsodSEq3%2F6tSqqfbj%2F6RkhpTKhgHStznzQEJwannxlUHZ1THGgTRsAgl0x1EaIDmKTmUhuSPtRIvIuRiTE7TF%2BJUs05Mk7K93aWtgfn77%2FmTK91TrrUYVedrfnnEiRsbRD%2BlBRebSf0e4GdqfYxfLxA3Z9M7Wz9W5eCouv0RhF8soB8RCkdg2sTvOnqZ8SjE1KgPBHXmQkpyW%2BxPND6nuomL35bqiFi7M%2FZCyT0L7HS9RU8DFFSBIOaTXSpX8cEuMBoxlCnYO2zbsodfAzPkzD22Dzge%2BC0anD90K6Q5r38QU8xzsqCLlE4cavsYS20eIkbJaaA6bDUzjYbvKdpkOx3g1%2FTLGQ%2BQsbfh8EUxMzORJNwnrAHVAr9zr%2BHojQir8DhNlKELKj4VOpHpngyG4HvNOWfW9jVxteodhzWffJ1qh%2FCbqXFOCx4lTTkZi6AA60ee4SzK%2BGLcfg%2BvZQBVEfDnG29qFFpC7nb%2BZHVrfMa%2F8Z9d2XO5zFbNFXIlOyw21dgUnkzK0aS%2BM20Oh8FvYBMAZTMFAE7jAR%2FPzunuAUQ002H7zY0Z5%2BqRx5jpZjyDRCnw6oPP44ihRHDcQQdL3Z1CSRitJyCww4vylzQY6pgFQs4Tt2Y2q%2FtibztfoavMpXYPwsoqtCFL04JMgnBU%2FgtGa2JBQfLHQdJvTkLV9wregLTtvOO1ZB5W603D2HbDLJ25dF42RZYPHla8B11MZyxqxfW%2FdIp1XgZFDRx71d1lYdHPnKkzpkvctN8tywCZ77Os4bSJoaopLdJspZxeXgjl6L6JgFxqMlPJm0ZoUpb4f7G4NhpPwBTLGq43EqKrvCq7%2Frhrn&X-Amz-Signature=d6ee9d9088d8f5eccef0d02250dbd69a55d041ca0f1ad112db02ce61b8978274&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VHODSNS%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQDtfA9A38AnEDO7nf6s%2B%2Bikhjb2D3VLQEXlDhckT2LzAwIgWzs4mMP3rR%2B5U0KYVectRuBVOE5ht%2FqydqbzxKuZjbgqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJToBTmPvyA4A06cWCrcA2QFx9TkR8gm67dvPpdVowiRhKuS7i0j95zMwTrvHo00uwJ4wj%2Fd1zaFnPA3I7fX1fg8lcmmjUXY%2FA2ncy5HgVQx7RNs4YVk%2FNFxkunXR33RIGBMACuqapx5Jmz3XbObAUfkw32c2TbeTExwtbTC%2FiOFUeS%2FjRgvwEmVpVzMN6QylGGXT7OSsvw24PE4zB0yVzkP1BYrIoVfr%2FVfE7tAsbii48f1L2H7UByllHH9I92OIAD%2BEX0upA7YauQ%2Fu4YPQNu%2BI47Vz%2FIIQe4avfGDZgfGl58DwMqFgnboJDYP%2B4bdWj7R4g78md9aQs2YoJ%2FzWbhZFnW0b6n6MJH53LvCrQj2zjlVGMDenBFfA0xjLbmz3Wc8q0LP%2BZGL9crMT%2B4wAmQqLBTmpisynmEVOfnr%2BCe7Jco5tGmaxpGXCDZkEiakzht7Ghzj%2BCRtZWhg6qRouIWvq6XiK7C%2BeYCNR7UoQy%2FDb7fOLNFp%2FR1%2B49gATjgVx6f%2FlgmcO0yDHRaRNkDOhVea8SszUVSKahe61%2FBhwluxNUH8n2pfh%2BDLveHtZpqpWfnzEsJ7vBJAdh%2BRQiD6JMYoPzb2xNew7ddd3egI11hPkLr2WWe9mh9mEAfLbMxadYblT1twq0d8SiKUMMP8pc0GOqUBAt8R2PjEPBhVsDlXiiVJVLv7K5d1pGCD9ZjNmE9dVtdzVaEbV0Bi9dMPXqKtOmb%2BLNb1hGspM9sg%2FkfR5LybmAJFEACEr%2FzGQe7lU6aXVulTK6IsaLijVSVEek6jujlLVH5sweHZBIIxnMJyvH4Ius0zt5d%2BuKsqlJSQqdCgOVDd0QJ%2F5CjGkPlEs4yD4OmZHIWYjIfDlbFgnSuAuqErmB3fYn5P&X-Amz-Signature=db9e2a01e9c19c587bfe87a19220fe000756863a3eb9088b51cb779654321395&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHU3IFHS%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQDB8fbktVk8xndxS6X%2B1bn5EG3BnPhDtZJ6NSnBMHTATgIhAIkb7NXrYjtLinMAN0XVPh7EjOiB5hZLIOIkySTgOmVHKogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igypky2bW%2B2Nub1UPYAq3AMgkBXSpAvatOjnNq%2BVIkZsIa2JyK7elPRT4jgNn7y49a0Oy3NxQ1XJz15vpvgJWueR5REBb5HdKmjy9TDS8V5VfBuVQWIOqJCoLD%2BBmGdFq7m%2BVJTw4foRf4W%2Bf%2BS13vLGaB%2FFTDJC0WTHcAkqS4%2FGRCkWj1ICcPQFPhS%2B1S5L1PZ5hYwsnrMbeUPSKnGUUwWUi9GjXHQyefUU6VaV7EcnAug%2FsYPaoEj023rjW6500VUsOcnSrsmoUmfXBO2pIIsT0XeoJ047sr153EJEldPfa3P0P%2BfzAAh2XJ9kJgLsko4dOBHsSnDGYyImeRAl6s50sSMT6Xz8geM7AGQ0T88bY4rUwY%2BuLZUg3qlQcQsd%2F88WYaxAsdbCVvtkV78levOcD2lmHc9ypx3wmo1cMSj7SIwecUnXzFp47DhPTBkiZCnpK%2Flfpwl4HDfwyTl6RgY7tkrPyMahXVm9lnYgmoVr2Y3BP2he%2BngbK7n1e4yyZsp6vqqO%2BW3mbbWXm2X%2F%2FlqZAqPRo45QJvCkdAR0dONAm7AR3RzMUQ1UMFavYXlOjh2cd7U82zalUXFjWunkU8ItX%2BNrlYXDSWHexpgp5DcGP3bniJZNqoDJgvFYTWX0WuiGJvKq5l%2Fzc%2BBEWzDw%2FKXNBjqkAca4CV%2FrC7rSophQDqzzJLJ94n%2B2ZQtMp9vhkCmfv1stzjUL%2FkhdGNKBJIZwyEimey9NA6IQjcGIxus%2FR4RzwIOMNOFaXip6U3F9YsxuayUpcFtMEsnfJE3LO0MmupJqPuYo2F3qgop5QxRjNnXzoSOiF8MSXFRGHQ2cnv9yX4%2FjMtM5DAzXeytmGMk7w8gZLbMtBxbnltkiidfK6J6Z6%2FMdbsDG&X-Amz-Signature=df8c7c463c7efc6d955dce4ee8a9ab4008955437aaf0e716d9139793987e5ecf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHU3IFHS%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJIMEYCIQDB8fbktVk8xndxS6X%2B1bn5EG3BnPhDtZJ6NSnBMHTATgIhAIkb7NXrYjtLinMAN0XVPh7EjOiB5hZLIOIkySTgOmVHKogECM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igypky2bW%2B2Nub1UPYAq3AMgkBXSpAvatOjnNq%2BVIkZsIa2JyK7elPRT4jgNn7y49a0Oy3NxQ1XJz15vpvgJWueR5REBb5HdKmjy9TDS8V5VfBuVQWIOqJCoLD%2BBmGdFq7m%2BVJTw4foRf4W%2Bf%2BS13vLGaB%2FFTDJC0WTHcAkqS4%2FGRCkWj1ICcPQFPhS%2B1S5L1PZ5hYwsnrMbeUPSKnGUUwWUi9GjXHQyefUU6VaV7EcnAug%2FsYPaoEj023rjW6500VUsOcnSrsmoUmfXBO2pIIsT0XeoJ047sr153EJEldPfa3P0P%2BfzAAh2XJ9kJgLsko4dOBHsSnDGYyImeRAl6s50sSMT6Xz8geM7AGQ0T88bY4rUwY%2BuLZUg3qlQcQsd%2F88WYaxAsdbCVvtkV78levOcD2lmHc9ypx3wmo1cMSj7SIwecUnXzFp47DhPTBkiZCnpK%2Flfpwl4HDfwyTl6RgY7tkrPyMahXVm9lnYgmoVr2Y3BP2he%2BngbK7n1e4yyZsp6vqqO%2BW3mbbWXm2X%2F%2FlqZAqPRo45QJvCkdAR0dONAm7AR3RzMUQ1UMFavYXlOjh2cd7U82zalUXFjWunkU8ItX%2BNrlYXDSWHexpgp5DcGP3bniJZNqoDJgvFYTWX0WuiGJvKq5l%2Fzc%2BBEWzDw%2FKXNBjqkAca4CV%2FrC7rSophQDqzzJLJ94n%2B2ZQtMp9vhkCmfv1stzjUL%2FkhdGNKBJIZwyEimey9NA6IQjcGIxus%2FR4RzwIOMNOFaXip6U3F9YsxuayUpcFtMEsnfJE3LO0MmupJqPuYo2F3qgop5QxRjNnXzoSOiF8MSXFRGHQ2cnv9yX4%2FjMtM5DAzXeytmGMk7w8gZLbMtBxbnltkiidfK6J6Z6%2FMdbsDG&X-Amz-Signature=df8c7c463c7efc6d955dce4ee8a9ab4008955437aaf0e716d9139793987e5ecf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VGI7ETK%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T143505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLXdlc3QtMiJHMEUCIQD3uh2hUy5odGjHcAcOdO1oOaQg5fugXKJlqgSVatCLjwIgEo1hNpqFFukrJ9A%2FPJm2ccnlXAO17j%2Bu5yZJtDYI9aUqiAQIzv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGmzZNivCYBbNHX%2BXyrcA7R2xT8SjmwcOnMYuP9dmNfbnPCxhv1%2Fh1qXTZVLoSxvAqHeozMn5B%2FsBBpcCfFas1vHFMIyy4Cpm7nonJByQt5xmMqogcT7emzF0JaAWjRsTEkWj0xaZnfA6pvdXpJE2ZAfD80tBQQsm8VIRcHkUmbnPZ7hQca2U8Bn367tTMF9wCLtrFw6N%2FgXrJ%2BLLPDycGJHGMw3GY9vcpQHBkGjt5OseLaJi3HLFejlspHDfQMdHqGCe2pZpOD1cu4XOEDQHDZ%2BqLFMFtgoH9LAJxdhIkEh%2FFtg7ASDjltacRVWTYH0tJVqQ4AgFM%2BAjhTo02ABMKlBjJihfBufIwRj3UaQCXOE8PnMGHXx906Hm7Cmvq2xuALFie7MmYzGq%2FawHrplP7SwND%2BCiGC3c9rdaCbCl6pJWg4p%2B69O4BDhUtI9K9urD3ccZG7aJVHxXDZ3lfbirL6c%2BcJH2R9tjXAN%2BhFAKcmHsRBytTWrXBVyDZSivDHyrzTbabcpX9LFC89y%2FuGZ47VxWUTyrdHtiAR3OWiO0qFSlic%2FCV1ATovRfCTJDom8uXDXHO2x83mrxO0EZzjxg%2B94ED6VSh3XfjVbGNZdNJLnE3GE4%2BD%2B1DEeChn8TG%2BC7bm4sbhBc1toIdgqMOf8pc0GOqUBQfToOFCnDpf3OON9HFWy1lyNhK6K4Gb80CYs8gT4uGX5nIrFYnsg0FGihFvj75V2%2F3ulHiOPRwKYszqJVOd5W716kZWb7m3a2EmoXHVNyiIW2uRgF51yjKR9UZJYwbLGHUh3kObHl7%2BUs%2F%2BXPq4FFF0WK5bbcPeY8tTaHEAITGlOAzgFhUIObLUtTlDvUDmli1Ds6wjDUBoUQVJGKwRL1a%2F505bI&X-Amz-Signature=1f468a091f5be0adac3e9433f70fa8bc1e2b6958292d69fe762d20ed1b632559&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

