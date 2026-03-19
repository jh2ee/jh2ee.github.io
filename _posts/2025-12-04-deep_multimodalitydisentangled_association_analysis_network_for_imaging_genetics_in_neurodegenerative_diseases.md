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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646ZTRJDZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCtU88zUsbft8w%2F2DfmJU3%2Fz1arHbgsRP2zokY6SrBg1gIgNq8WFyS6f2oHX%2BHhaKK4jJUi3mKbt3i%2FBercQCIkD%2BAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDBG6%2FoLHvbGYYbVWeircAxnNPM0f%2FiX0tLFdGcFEOm%2B9TE50LEdXqrm%2BKtHA%2FYgbQZwzCwSJS1Nc1b7W802yQwaoHLjQ0LfwUKGwpPf5x7YF02NIUMc0peNpLuSJSDjtZxEkrgt%2BgfXZjcx0whPKYyppfXGcJ%2B0Z25ODHVNKo4peMW27aCtG8DemqEKqnV7owlfwbwh19FmtyqCEJCxJ8kh7HuOIgc3%2F3T3QLalCskiDgTUkz3kC9eEKVv%2FkdN1ZaTy3tC61x4tvpRmdTa52MK3QiAsC4b7sJT3cnw7b3Go36yZwCjFiKR0Na%2BH%2BaCooVWectRlGT2gU8n5ndOyRDNzPtYECj13Ppjy2bnsOYZrgVG7A3KWeTA4ALcsldZtJ7wrRRRRqRE0jubO9jkdwkFMxYxy%2B1UkvEIjaoM2DFpMW6uczahWjL2DfzZU0cXhf4hNiHylW6p5Q5a%2BJCttfbDvXgrN%2FliIzdRqZey4o15r2BOyHDgf8XV3Y6gv2C4FQqkCNCOPc5hJBAfhpLza%2B3b%2BkQG%2FCaTA5y369wJ9ISNj%2Fh8xfBGtyrTKlbemPJtsPCifBvzbbZMpIb8YLTUh%2BmWEmLT2QQMxhT2cgi6YeIaLN%2BIuApFYoY4%2FvCN4%2FMeCu9IliTjgBu3cXX42eMMy%2B7s0GOqUB4OdPnt2jMgjvwzh58SACueKu4PM3AD8Y3WF%2FoTXjLZ7v99cqn%2Fi3dPKVMjljtO2PgWmqiJfesev7NuXniUk2ibQnabsQUSfWYTHDUPEKRxfL%2FeYNqwKoRwIwFX5UWyp1OFo4KuY%2BWWKkCV9Zc7fAKU9%2Be0fihhb41U3Y61d8RsAqkfXA98PaG3JkOlyu7JKYlMwOWmVLhIwVVBGQfl9dgt3PJo5b&X-Amz-Signature=b3aa98405d7df047a69461b722d9fa480894df9160a175942a0481336ea56887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646ZTRJDZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCtU88zUsbft8w%2F2DfmJU3%2Fz1arHbgsRP2zokY6SrBg1gIgNq8WFyS6f2oHX%2BHhaKK4jJUi3mKbt3i%2FBercQCIkD%2BAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDBG6%2FoLHvbGYYbVWeircAxnNPM0f%2FiX0tLFdGcFEOm%2B9TE50LEdXqrm%2BKtHA%2FYgbQZwzCwSJS1Nc1b7W802yQwaoHLjQ0LfwUKGwpPf5x7YF02NIUMc0peNpLuSJSDjtZxEkrgt%2BgfXZjcx0whPKYyppfXGcJ%2B0Z25ODHVNKo4peMW27aCtG8DemqEKqnV7owlfwbwh19FmtyqCEJCxJ8kh7HuOIgc3%2F3T3QLalCskiDgTUkz3kC9eEKVv%2FkdN1ZaTy3tC61x4tvpRmdTa52MK3QiAsC4b7sJT3cnw7b3Go36yZwCjFiKR0Na%2BH%2BaCooVWectRlGT2gU8n5ndOyRDNzPtYECj13Ppjy2bnsOYZrgVG7A3KWeTA4ALcsldZtJ7wrRRRRqRE0jubO9jkdwkFMxYxy%2B1UkvEIjaoM2DFpMW6uczahWjL2DfzZU0cXhf4hNiHylW6p5Q5a%2BJCttfbDvXgrN%2FliIzdRqZey4o15r2BOyHDgf8XV3Y6gv2C4FQqkCNCOPc5hJBAfhpLza%2B3b%2BkQG%2FCaTA5y369wJ9ISNj%2Fh8xfBGtyrTKlbemPJtsPCifBvzbbZMpIb8YLTUh%2BmWEmLT2QQMxhT2cgi6YeIaLN%2BIuApFYoY4%2FvCN4%2FMeCu9IliTjgBu3cXX42eMMy%2B7s0GOqUB4OdPnt2jMgjvwzh58SACueKu4PM3AD8Y3WF%2FoTXjLZ7v99cqn%2Fi3dPKVMjljtO2PgWmqiJfesev7NuXniUk2ibQnabsQUSfWYTHDUPEKRxfL%2FeYNqwKoRwIwFX5UWyp1OFo4KuY%2BWWKkCV9Zc7fAKU9%2Be0fihhb41U3Y61d8RsAqkfXA98PaG3JkOlyu7JKYlMwOWmVLhIwVVBGQfl9dgt3PJo5b&X-Amz-Signature=b3aa98405d7df047a69461b722d9fa480894df9160a175942a0481336ea56887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4Y5IS7S%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQD2EY4ErxZQXrRYLYTpxkDa7wR4220%2BcDOEK5%2BMaZ3FJwIgLwEU%2Bl78O6s0lMiFdvQKxMJHhwNo6iSfuXHDrlW%2FHjEq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCpClBY7aMZnPSPEdyrcA%2FgUPezV%2BqGXpYqQPGRCvxM4mTR%2BcLKOXZBT%2BuYeiYytbOLvCxRrhdEOTAxXnQdTy3bJ87fG2ny6XXhnRyaWlP5FMNDw%2FcQ07k6sSb%2FMF7iIbSROSPPHPw%2FF3%2FB3UdlKMGYK9IYZTpHkRe9I4EGOvrXh%2BxEd%2F%2FreMV7rWIKANgt7kXe9WxUnhy301JpzBDjaYxBScTKAc7TlFOW2RlGb5%2BTLnE%2Bj6wdRfbuq0B6AkOg%2BXy3uxwd8zxUKuXI1cy3UFgp8M%2F2XJ4kasOfVE5MtrUnHuPaxIfklqLg1ylohOBU60mgPNZyoeWNRyvl1cpmCI2pEXGMtY6hjaYAeCmZKNzdnVZsFpeHd3JY0IvzPGRnWavOJJyKEwoJZ1nCbqms8B3EVwX8TDT01NCMxWrcN5I6OnbT0B%2Bptc9LlPgx3E4WqHE88MGbzjbQlvQopsU%2FVoN1%2BaebGw9cUJap96dnnUnPRTiyCVO0mY6C1wroGMNO1rycpsE5TKCWj12AF1svvWtuE9Ab9JvoFg3ETNnFKnDu5FButWM2Z5OcoI86hYQwkyOWua7u89dKr%2FFFXFVDo%2BLbtkVvIgG49BNsM8JLJzXgfSquRNPW8hIRlQfoOG8WRcVqgjcucVdNTAR6OMJK%2B7s0GOqUBzUVdWM8H37nIXFLeBCGl%2FKxsRVY%2Bw8RmI0WM3RdylkhN8FbfEKQmTROoNGe7%2FHcqJRGaTs%2BeJgTmoT50bnLRl4FxmUoW3r8olgDiNsrtLPsWRdu9R%2Bwbt%2B%2B8nqvRLIVWlF4W%2FY8bPGEWTp%2BcG3edlqYZYP5HmABW%2FYe49%2F36Kuq2i2GySQkj3rvxW25HII4NGM2zRu1BSQz3ayEIaIZ1OEF0GvNt&X-Amz-Signature=147d3b855da7d4b240966fc1b54d8c873a621a4accb35e93248e445c42d8b0ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUI26WXG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCSi7LVQem%2F9tKTjsqI2FBsN0DIOZIaGwDmmmB0t8BG4wIhALpMCmEJLZzV%2FXgO1O5fTEgKobtT88xMDwOXaSsONU3TKv8DCBgQABoMNjM3NDIzMTgzODA1IgxmSP2U%2F8Gf%2BT17zfcq3AOm5SZ0nJi%2B9KEzNBEkPQFw17naPO1F4XBZuIPdA04b%2B1uAfpojZO8pWPn7rjCcNm8y8DD3syGclXBySgpdIVCyDzck25CeQ707Y6ADEROtK%2BreUIvS0tp9WqMY9jlOu1lHWP85boRPKsASS7CdgCwfznkGiPcVOpMhEoxvCqh5NPqD0iSk%2BPVNMovOyiI1WaV9ORdK%2Fb0swL7g8ZyqgMTrX4WAzkm4j0G7ptRJejib8CbFopiMyV6YNHtbef3AJSIyAQOG02PyeGU1Loscu1Lmtgt0qSIcAc4%2FHVtOUu8BjuCIEW88qcXxm3rUgE8eo8kv9Ln577FPH5ikbUzJSZAWOlNx1lNiX%2F%2Bzs7uHE6JmWRycbcL8mUPncFsllzapztDBf81TwbjEush4t%2FoVdi5C2zk5DETwCkv9XufxUrWI8hmFQf015%2BVCUxAaDmc%2B07s4EU%2FC%2FIEW8AcDyB6AMU0SnUdnJafZOvyeJP%2BB1rOYtZAGcxyQQ7dogM9%2BB8g6eyJ%2BI%2FC3PWylYQex4hG6IvbHsGc4QT6I5vAeHuGd1n%2BcNsbaW9hHsbPQWRQw2pCGH6yWT8Ufe7P5zKmx2FKedGy0lJazfKmZKzL25drtP%2F3ca%2BxcQyInnbrxXFqc6zCTvu7NBjqkAfQ1URGZWBhdjrpdtYYEzZwT13PgDPLDnIH1GQCuQfFxbXrx2xAjEEKk1kKVTEQvjl5mzppAgKx3fajqfglgyS%2FjEnmJsntBBOV4zQgrnp3IbAut9z%2F00LIl1mv16LLPomlCAe3McK9GePJ64DNgQqeydPnoVj7igITZy8Mi2lDFBjcDKf89Y%2Fc5CGG9yrMkPIS1h0sfrR6JbdtR2C8SerirFh8b&X-Amz-Signature=ba21614ff8f123c0752df6d7fb183b66121e12604f0a6f3d6ba84426c2ee8832&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUI26WXG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCSi7LVQem%2F9tKTjsqI2FBsN0DIOZIaGwDmmmB0t8BG4wIhALpMCmEJLZzV%2FXgO1O5fTEgKobtT88xMDwOXaSsONU3TKv8DCBgQABoMNjM3NDIzMTgzODA1IgxmSP2U%2F8Gf%2BT17zfcq3AOm5SZ0nJi%2B9KEzNBEkPQFw17naPO1F4XBZuIPdA04b%2B1uAfpojZO8pWPn7rjCcNm8y8DD3syGclXBySgpdIVCyDzck25CeQ707Y6ADEROtK%2BreUIvS0tp9WqMY9jlOu1lHWP85boRPKsASS7CdgCwfznkGiPcVOpMhEoxvCqh5NPqD0iSk%2BPVNMovOyiI1WaV9ORdK%2Fb0swL7g8ZyqgMTrX4WAzkm4j0G7ptRJejib8CbFopiMyV6YNHtbef3AJSIyAQOG02PyeGU1Loscu1Lmtgt0qSIcAc4%2FHVtOUu8BjuCIEW88qcXxm3rUgE8eo8kv9Ln577FPH5ikbUzJSZAWOlNx1lNiX%2F%2Bzs7uHE6JmWRycbcL8mUPncFsllzapztDBf81TwbjEush4t%2FoVdi5C2zk5DETwCkv9XufxUrWI8hmFQf015%2BVCUxAaDmc%2B07s4EU%2FC%2FIEW8AcDyB6AMU0SnUdnJafZOvyeJP%2BB1rOYtZAGcxyQQ7dogM9%2BB8g6eyJ%2BI%2FC3PWylYQex4hG6IvbHsGc4QT6I5vAeHuGd1n%2BcNsbaW9hHsbPQWRQw2pCGH6yWT8Ufe7P5zKmx2FKedGy0lJazfKmZKzL25drtP%2F3ca%2BxcQyInnbrxXFqc6zCTvu7NBjqkAfQ1URGZWBhdjrpdtYYEzZwT13PgDPLDnIH1GQCuQfFxbXrx2xAjEEKk1kKVTEQvjl5mzppAgKx3fajqfglgyS%2FjEnmJsntBBOV4zQgrnp3IbAut9z%2F00LIl1mv16LLPomlCAe3McK9GePJ64DNgQqeydPnoVj7igITZy8Mi2lDFBjcDKf89Y%2Fc5CGG9yrMkPIS1h0sfrR6JbdtR2C8SerirFh8b&X-Amz-Signature=6d667d402a03dcf053382d5f56e81a55ca433f8778db6d9bfe085e6cf71a2236&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TW5PT36Z%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIBu9NGZgErEw4sqRwlnBuZoeT4dmMNPXSVPjz26GUZeCAiAeeIorN5x645s2Cm05UMt%2BzYg67O2HEFaDRftLJcAasir%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMaaoXX23phAs2ON5VKtwDtz%2Foai5DgV6A9b2gC1us5AjtAI7UrhDQ5S1Yu4t4ZlqU4Me4aTE08KraNVjiJmm%2BciYJLGFXr%2FWg6CdyxC0Dt%2BmFQ10oa7y0Edj6UTVw7ca04UfdWwXpD9H8KopGq408Mi%2BObk0kcV9q0tfshd9RgKEeyy0xSYRdvmdLxuA4eL3O9W0X1P9YRcVdj9MMuFpKg%2BaxN91TveYsxzmsBvU%2FxUE23X3LdC1iQtW1Korqcnsc%2FWQvuVHLmJR8b0%2B2GarEGehQ3vAq%2BgepaWIhNmd5PReTH6q8v8SgIk9CEChqIzyfuW1h0rB9CYqXJC8OV%2FWw%2BTtGAskxDYVUljLPo2YeXCAoNp9XHd8CN7nvjpsQPu4xAoadgQOIr7dn1ff6zNyKLhkDJwQtYiEqN%2FVnxQF4M%2FpyftS48iUoDVWK1iu4lXfTR%2Bbf6Hge0MY2MatemSglT4mwaDLXfE6Im6LokSYlJbuOPP5zmQNEzFu48j3TdMJkIR%2BCGymzsLAcAtZS2dLALAomGZmXzG36PJvJD%2BPj7N0kQ8xfMABpIc3S5p79vsSnU4q7i1w4V%2FJF%2B9D0X4pz9Dj9k6M82Dn0IKV3UwAqS9YeHcBnwgi8CO6b52iXePSct54LTnQ4UhHC16Ywnb7uzQY6pgGPgJR2%2F1%2BpPxEljiXHc6YvbC2BR1sZ%2FqGkldDTHvUDBu%2BJyxN5E6%2FX1w1tbV5%2Bkv0dnGlm1VNbbDIfFWPP%2BSUwsikKRix%2BR0rm6otvSh94l3UmGbzozUiKgxIHwpCUj4H57Fy%2FJJH5%2Be6w%2FB0%2BXGsvwLjbYFTbR0uCHgSMEQ5OggwBewwJkYbY7h2HaHSEKoh%2FP%2BIUAG94Ysh86w%2F5ZNRjuZUj%2BOLL&X-Amz-Signature=cbf540328abee8dc0f924dfb14acecae3de43fe662ffecb63fc090560bf45720&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZA7FJXVD%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIDPHtoTizdH3C8cjy0ukXjMJmpERoYbf4%2BCIZtLIY8MqAiEAkHu0FIA0O9chwe939ioD0NxGlOfJv8y%2BDAZAfYHSMZsq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDBWw5GiBBImmo45dYSrcA1BIfD2gAcxPWl8jaLpOJAT0NT1SHoVg8NE3dF5DM5DwDg%2Fo%2BCSFwUfiZqk4wL5rS1cEJ%2FvWzV6YhR0N5L7%2FIloODtjiDxzev3girZnw55NOnOiGGCC5328IWZeIhsrI3RRFtlrxl8dCPKijdidrDWltCfEEhMzJbpuhsDRe%2FRXnbdcTh7zbk2SW0z25g7J%2Bw5sFss5GdTmGu8CRCCnH582%2BV40Ob%2B2gutYAF2ZFSStdBPCK42tcY0O2nNa9ur%2B%2B8xdDzYpzfxVI102i9eSH15kLbcY8V2iLkbSIMyGQ%2BkFMGqN6hBGAqLu5HkA7OfGZfTVdeLL0XeoURYO%2FJBaCJc3qEQjk73ppieyEKyPJRjSCkpnxCxjWE4BbBySWbhOd4CkXz%2FxhGRe5ceFLGgzjb3hJsCM3MnQqyCeBGPTtD4bFvFgiv%2FyIevhmY4nxZbAc%2BN8n7zvKaIjLvMsHtXLHYv2IdjgR6nZVHh1yTn6YBjnmx4OnhGFO1ZUSMIsIv2TqwgD9l2vQKgjfC0ijSauK1TeHpXvx62ZdLMg%2FZugXXmiqtqPKt6vxVLUvpHnb%2FdAxiXXKU0xEuxGbyWEmt0go%2FYLQmHoCoJT3mtWcYz7puicq1D%2F9GnmyStsRVSozMNG%2B7s0GOqUBTD9jba0klrmjd5YJba8IFMMqfSTHLVg0p%2FgPbPMJc2V8MAkrMh8AmaofB%2BQcldbjz3aa%2BOnf9BzTIzdN1X2lZOFTNxYrkEopc0PZmezxD8%2BH%2FwHlLlK%2BLZfZY3cT2pzrLLCUqL8sWOIxPrY4acB99eDrQsK8rMA8BD5HOTq4iv8v9ctjPB9Sy77uo2x16jUJ9p6iZvydMTue3BewhtNeRAlw2XP%2B&X-Amz-Signature=b7934f0267bab9ea8016c55eab4cc7a19b2f60e72495f5bb3d3b4de5115057ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QLNHO3K%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIHe3ZT1i82albw%2B7lKSvXBmLmwZBe1VhQ15oJj4q74VdAiAIf7geIL3Q7tuk%2BuoapRE63GEFi55v5FJH6j%2B4FaeuMir%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMNhul3eXymKOqAfI%2FKtwD3ZLv3KyghOOmvA2Bt7OYIdHAUVPDLzMezLrExaSztMXpd6Qz%2BYlEB9XGxdc2%2BywmfgRfLnlcVP4xT3lnPmZ2ffP1PsyBrUFNzCtx5%2BR3e0ymqh%2BYRmdCFHeVtS8mLeCxVyl5ls4VljUwpJsBb7Xg%2BYHkiKHI3XPSjan6UO%2BcJlRC1cHaGgDurcQnt4o08Tbt%2BenEnQXgP9uuTB%2BmIzjpd%2BS466Wud%2FIAcjbMC0mpJaQvqJWhEjxyqEQVbsQ%2FGrlUZ2PIDPmrzd9HsUK%2FMT8bX2yDvdW6QzEILn5ZwgAfIQ9zzvC5zEdFEnt6qNi35140WRyYKTrKitmo13jK3%2Bo1Qeo0O9z6oqtryI9II0q6DDWsMSO436TSYRtyhQ6w9y271tfOsK%2FBO1GfUFB3nI13WDdXaRLtfaNxU1cm8R%2B70lCVaeH6ccGDMlBVZkQvHzpplOVx7KnSOqCfcpBz3EQwijN4UEHTZXkkQLm%2Fm4ArIc1OZ9rhclBv4E3YL2fNkAN5GWvvh53jLtOjoXhFbxMhUZMECE86eXHErQZlOgexyrmrNKoWmxehbDAQHX637%2Fkxv5GfJWPDwy9fAuCzM9TaMlS5NkWmFohtR7hx66gZrHew2oUJyfapYflu79Ewj77uzQY6pgEel3wNDdiAFhkFYtCUGthTaSXq%2FqwwbAGZAm0SgmA56pdL%2FeZTQoQpPg5BDqum8v5wXnAfAieAWa61C4fThthJuqHCF1wlaq1wehgtV9KI0Pz1e%2BddNi7qnASyyLRzZ2k0R6b9wd3JSzy6aSiR9N7kf7pCZfRfck5o3Mhk3OfKGVW5m1L6vcXKyByLyTLia%2FPnXNa0l%2FGqD98O3UoYGaNY00mcAHhu&X-Amz-Signature=6e52a0096f795c3afea996ef0a080ac6d70db22dda93f9887e8135204e12d683&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOLABOOQ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIDWYN3BYH7FbkfVYHrVcA7bxmEOjmJLu8oQj2pIZ5CkSAiBy2mopnFtf5FH9ZbHopQ1Div%2BmW9vrvxTBmpFW46d9iCr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIM4CwXB3jWRLyDeMN2KtwDQ8hk%2FzOHm1V6%2FjzPtpcKdFXA722XxTc1QskoFnEo7RXY%2FQH%2BsvrDY69r%2BZ2zJwHsBJNn2e1bwTGqDN6chdwj%2BZpftk8NdtQ5BoMyHj4f2d%2BT%2BAykqeMlYTqEMe8S1TLXcivN5v11dcbUMDqULMdH%2FvfQYeZ6uK7BI2Ou7IDdDwdR17Ep5F7RJJETFcZBmPdMm6GP0YaxuggGmLcE63sfacTkjZ1izztpOaUcjOsp7XptJAOk6S7TugNG%2Bs9cTbkmcQlJp4G%2BvpIa9hV2Pb7Hn1Uq5VtiBe%2FtGAGxqhLKZSy%2BjkWdXR40kVXz6P2uXqse8IlSa6cQYnNNLrXO%2BxbZSpkrThCRj5PPmIBS3H%2FTQTBg2kzVoKisC826Rd%2BT6dBta8fbdraaCTk5rMWAIcBFKdEupSMkWKBSjRcK94NRL%2Fx5l9%2FIiOMvtwXhuFyPhTwtrvgWmH%2BI%2BHBCysOuBFvbsyHFUay%2BC%2BelnUhcwmyLkbf9BXgzAQCWtXp7E8DH70JLO2gus0YkgyJwEtLaerpSsni3Hj44Sbo39HKj6vCQrcsQfGUW2PVFBzg%2Bu0mr6Wi2CDNzxerQHN%2BlLEBnM6hJkzychOgtruFrgYs7qyy6OkXZ%2Fvgp8kTBFP%2F13Lowu77uzQY6pgHRJtgUNGY6UqiVKsk6y%2BI4%2BohU4PPBQcpB%2BSDQdEiVV%2BvYrTzkJnAAfq191sDR5mQrpoF55U9Ro0MpcRQMPeQndSqYj79qkJcDfwEOzbmPqoyC9OGOA1j%2FvXykzhtoxWuJ%2Fdbw7Ago8x2HHM8i9d0nLLOXrcwYBhfCyM3%2FMqBwF5SWblIX1R2xjeitXzW9VlExnhTE2Ra1XLbsgO3y6nBbDUOAWtRI&X-Amz-Signature=ccea259dcb25bba9b3e62cc44d0017cba4275b5a69fbe836e570ff4680099439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOLABOOQ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIDWYN3BYH7FbkfVYHrVcA7bxmEOjmJLu8oQj2pIZ5CkSAiBy2mopnFtf5FH9ZbHopQ1Div%2BmW9vrvxTBmpFW46d9iCr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIM4CwXB3jWRLyDeMN2KtwDQ8hk%2FzOHm1V6%2FjzPtpcKdFXA722XxTc1QskoFnEo7RXY%2FQH%2BsvrDY69r%2BZ2zJwHsBJNn2e1bwTGqDN6chdwj%2BZpftk8NdtQ5BoMyHj4f2d%2BT%2BAykqeMlYTqEMe8S1TLXcivN5v11dcbUMDqULMdH%2FvfQYeZ6uK7BI2Ou7IDdDwdR17Ep5F7RJJETFcZBmPdMm6GP0YaxuggGmLcE63sfacTkjZ1izztpOaUcjOsp7XptJAOk6S7TugNG%2Bs9cTbkmcQlJp4G%2BvpIa9hV2Pb7Hn1Uq5VtiBe%2FtGAGxqhLKZSy%2BjkWdXR40kVXz6P2uXqse8IlSa6cQYnNNLrXO%2BxbZSpkrThCRj5PPmIBS3H%2FTQTBg2kzVoKisC826Rd%2BT6dBta8fbdraaCTk5rMWAIcBFKdEupSMkWKBSjRcK94NRL%2Fx5l9%2FIiOMvtwXhuFyPhTwtrvgWmH%2BI%2BHBCysOuBFvbsyHFUay%2BC%2BelnUhcwmyLkbf9BXgzAQCWtXp7E8DH70JLO2gus0YkgyJwEtLaerpSsni3Hj44Sbo39HKj6vCQrcsQfGUW2PVFBzg%2Bu0mr6Wi2CDNzxerQHN%2BlLEBnM6hJkzychOgtruFrgYs7qyy6OkXZ%2Fvgp8kTBFP%2F13Lowu77uzQY6pgHRJtgUNGY6UqiVKsk6y%2BI4%2BohU4PPBQcpB%2BSDQdEiVV%2BvYrTzkJnAAfq191sDR5mQrpoF55U9Ro0MpcRQMPeQndSqYj79qkJcDfwEOzbmPqoyC9OGOA1j%2FvXykzhtoxWuJ%2Fdbw7Ago8x2HHM8i9d0nLLOXrcwYBhfCyM3%2FMqBwF5SWblIX1R2xjeitXzW9VlExnhTE2Ra1XLbsgO3y6nBbDUOAWtRI&X-Amz-Signature=505bf288fde83aa2d5b0d886b5bf7b8a6e5650c5a5967967ca8c3a4ce7b1df5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHLMYGN2%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDDTCSxb9u56k1MuWi7KN1ToiwzliG%2BUsD6yKg%2BM17IYwIhAOQLTtkuYOd84tiCVwssVkQlAILLG%2BMvZMOEuBV1SLurKv8DCBgQABoMNjM3NDIzMTgzODA1Igw1A5Cy3wjxFBmnwfsq3AOMPsGhevZP5SrxUIfFa961w1FrNTeHThQ1kumdOx6QDR0FchL%2FCxJ289wpwl6yZJHnGErhV7Ut3OSS3AHy6NWorKvm2ZZ6na52AiLxgxN5LC74cxZVJsPzvL6p4ehCfigJ7Yq93Eh%2BqerrTMrZtbqsQJtzIft5tuZ181zIb0M6CDcCeIEJWFMf3lBCJCe4AeGlsAIWNtNPqiGHOkt03V9jzmP1F0iLMVkw6RgNfiXVds2pCBh%2BjJCABihFf0fymacv5jX1YAiLK1%2F0l8gh0azEVDELHtIV4PQ6MlLgoLzOlzH0eqxBGhPCcTLe3d30CCOIXJEy0TClC2KBl1%2FopFnzrkzHFVAMCADEhu39kUU9No%2BxqeWO8dJR1TwArokzV8rdYZSZLzuj%2FzwdyIbDUpJo5ukvBA%2BSYnKE11J%2F1fYWReQSI%2FxzCeerIZg6LiKCiZ0zX9A3jxfzJzD20pjFMCfe1yv0XtyqKkF6NNBJSd3ZWT7aorHw53pWwblqkVsDcqpXAzEntnIJG8nHorDhHHTGdyEjefEI554Iz53vf705FqX1PjDUQdmY6xq40qQ37Ycbea0daNtAN6kcNTSxDtLf%2FwmHsxNNuZYpsaClFXMthmNynMsYx6IpxVacxjDyve7NBjqkASloKpLJydilleSWl0M1cFgfEuyEjshfTzcCRJ9f1oTFDYwAEABQsXKAtfhZqwDooYigs7BClMhcFKRUeW%2B2JjBUP63Pwvmsp0XFa94blpDpQafCPzUSXNKfYq6e1w9Z2t%2BRhuNRfI%2B4AxNmNcLd%2FBVYMNfMt%2BYNsPhGBjPXojUqBqMjFblsRoy4%2FMXWTlbCC8lLFxHmhvt5pY%2Bk59MTHC%2BwLbWx&X-Amz-Signature=2f85de4b813fb58a8983a2422164a7c5cbeff8a6ef564df47473456d078b8871&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WNM3OCQ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIAdbsikf2h2claB97yuDkzuIEug9BMWixL0lL7psOnZPAiB9frL1JMOg0q4ruPmlroSxTOx%2FWGCDBnGZMafjQvaOnSr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMwEpzNaoqj%2BeQCjueKtwD62in%2Fj8MpEakk2nqHqTju7yJSEjbVELfqZQlRy4Scm%2FaiJFcwo0PeZP%2Fx4cmnSrL1XVtU3RLsfm5xJVfJGXNzaB0Xdqs%2Bgs7ha2h8jTKB6bRFL3Z8FNr3YH3M7nA%2B23%2FVU7g2BZ8NFusEUQF99ccPlQt5i%2FXz8dAsIDsBA4j2vsWEkirKWqgcu1zIx9MYyihlYVVj5XDMvGMhnSJjr0XCOUqNNDN1hff%2BTme2SBbivCnAHPYdg3a0WukTv3LQtXt81SyN9lp9bwABa3zie8mdjclNFA%2FwkP7igW%2BS1aMs%2BgwlNLleE8ieg%2FOMNP4YOvsgaUu9L0Od0k1ZWt6yamwjGEJgew7tJMlQSkmWsmzoi%2FnmDDS%2FndkYOKi%2FG9thZkZXT%2B9tajVeiZUqRMx4VW4vTw%2BrzH4vYbrOS%2BhtwEzv0GiQdyhhGo7SfTHj2UlSbeLASQV96x8DgJwMN47R5CsyxKNgmb2JQuoB0DzswzbLj2rGbATWlRcHQT%2Fjmr%2F3ZipjSDAf1kUPezNl9xOiWg3gB5sXLti7MmIDXloJBGbpC1bsVcVoHY7%2Btm8VRkJqPeYTA%2Bv6Dx4uy9E5njUoB9DFkwuQfkZNL95pN91h8wuK2ByDl0vNLbc41lngwswi7%2FuzQY6pgER3Eay6e8bvAjjZ4zsdPx4teWALQxnK3o4T94DJlA1A6qPLwAPhIu4O6OSdYKA0gUFnAeIvTjMmk%2FazV0IDXEjKz5gVXSzQrv8kv4BrEiHFb9ZInzBDt3lA9tMUTRH55OgOK8nGt4fVC6vkWZ25PtgiBXT6%2BAgRBcOZsYyGrwV8mOqmyR%2B4NzEoKCRDycW%2Byt%2FgoYQqVkQEIR1KYj2vNScJSH5fJcF&X-Amz-Signature=af6687c9aa30a734eef0c77ebabe3f82a594c80e5b8fa05db9b1952c1f47b7ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WNM3OCQ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIAdbsikf2h2claB97yuDkzuIEug9BMWixL0lL7psOnZPAiB9frL1JMOg0q4ruPmlroSxTOx%2FWGCDBnGZMafjQvaOnSr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMwEpzNaoqj%2BeQCjueKtwD62in%2Fj8MpEakk2nqHqTju7yJSEjbVELfqZQlRy4Scm%2FaiJFcwo0PeZP%2Fx4cmnSrL1XVtU3RLsfm5xJVfJGXNzaB0Xdqs%2Bgs7ha2h8jTKB6bRFL3Z8FNr3YH3M7nA%2B23%2FVU7g2BZ8NFusEUQF99ccPlQt5i%2FXz8dAsIDsBA4j2vsWEkirKWqgcu1zIx9MYyihlYVVj5XDMvGMhnSJjr0XCOUqNNDN1hff%2BTme2SBbivCnAHPYdg3a0WukTv3LQtXt81SyN9lp9bwABa3zie8mdjclNFA%2FwkP7igW%2BS1aMs%2BgwlNLleE8ieg%2FOMNP4YOvsgaUu9L0Od0k1ZWt6yamwjGEJgew7tJMlQSkmWsmzoi%2FnmDDS%2FndkYOKi%2FG9thZkZXT%2B9tajVeiZUqRMx4VW4vTw%2BrzH4vYbrOS%2BhtwEzv0GiQdyhhGo7SfTHj2UlSbeLASQV96x8DgJwMN47R5CsyxKNgmb2JQuoB0DzswzbLj2rGbATWlRcHQT%2Fjmr%2F3ZipjSDAf1kUPezNl9xOiWg3gB5sXLti7MmIDXloJBGbpC1bsVcVoHY7%2Btm8VRkJqPeYTA%2Bv6Dx4uy9E5njUoB9DFkwuQfkZNL95pN91h8wuK2ByDl0vNLbc41lngwswi7%2FuzQY6pgER3Eay6e8bvAjjZ4zsdPx4teWALQxnK3o4T94DJlA1A6qPLwAPhIu4O6OSdYKA0gUFnAeIvTjMmk%2FazV0IDXEjKz5gVXSzQrv8kv4BrEiHFb9ZInzBDt3lA9tMUTRH55OgOK8nGt4fVC6vkWZ25PtgiBXT6%2BAgRBcOZsYyGrwV8mOqmyR%2B4NzEoKCRDycW%2Byt%2FgoYQqVkQEIR1KYj2vNScJSH5fJcF&X-Amz-Signature=af6687c9aa30a734eef0c77ebabe3f82a594c80e5b8fa05db9b1952c1f47b7ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U26NLTF3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T082718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIEj%2BGYsLzB2DGuO5tWAjR8l%2FpLrS3p5esh2yilECRRQIAiEAmdu62f02aGKRpFZ3qS2E7LIp7Wn40kr75cI6%2BZeyS9oq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDKv3CFemAb1qQrU3kyrcA1JRgC2XaEP97tHw8iRohgptteeZLxPxu0VHZ1UWTTEvv4VTL7SBRsILBWMEn%2F2Y2I%2FoiMCzJVYvQk9rbblR1shRkMwij1%2BxOYBnj5S%2BYup8tTVYJ5Rtvm1gxSDipbqNEDVt5YVR%2BnTWdlXhrlwqTFpcTxXjkPfvPOEo39K3JxesK%2BsFNx%2BxJ42zVbzg58%2F5fA3WT9cTaZYIh1rbWpSsID%2FeeorvuWM0ZBaPg%2BdmI2Dh56FWmsvaPJaGFT437KfoGc246BlzmXu7hYWLynSGSZsZJZ%2FGBrzPLLvbs3tH7VbUBDizmbZx9qQFZVm%2B0mPX%2BureHq5f7La7TR2JCYTQ5yuR2A0DodLm1DC8W%2BdaLNEhlqJGy9Yb4sU3bsGl6kooFzJFfTohX6bv7fdIsrY%2FhHSH%2Bshl7ih9LbcT3KXmFRqOn1swhNPmrhz4Jr8m9physb5zfZRh6hXZNxzjw%2B26%2Bj61kOiyLHPB2BrWdmiRVOkjRL31G4ZlnBRonbWFSQgJqIJuiK7N2%2B2g%2B5eI%2FJPHr5x50qP5ldwz4NM85jqb2NyqhSCo1d80t1WX5krQy4w1bnymmvIadk8GOttRGDpXpDa55x3erTTwqYXTq4DjfplBB9qW3JaX7Vk%2B8bweMNm%2B7s0GOqUBBhKU%2FOp%2BGyb6DsiK%2FPkw2%2B0%2B4AnfXZx9U%2F3Mkg%2FrT86yY%2Ftocd1Bp4xT1e3fp8E4yydyAH58XHDXFQLsJ3Yq%2BEOQt%2Ff3aIREfxu9wcPUybzi%2FReHWHAivSah5zWr%2FsHD4pUm9dAoQN31gDWBR8O3YQAtvebZVV3ugEXSg6B4aGRUoh1LSXRnQg%2BflQc59fe6lyI1y6FwgBxw0oECM9uZYo0kXKqV&X-Amz-Signature=517e828d1862f99c06bac5c8fc25820dd3548600cebcc5d6b4c4572b88a69021&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

