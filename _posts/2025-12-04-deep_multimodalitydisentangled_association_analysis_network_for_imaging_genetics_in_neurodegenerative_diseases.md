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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUSXYTUE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2F7Rur4eqXr05xWG2W2BFdDkyCg5mIFznXRw8T8IyUfwIgRNk9Ku0dch6wWXfGZv2cEFX8baNu5KYcWPD1S8tSYowqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAN2CQTtkygehWGR3SrcAzY0bNhTAYhikp4ecngeJE8QcUMWk7CTNM6onCpjtbIbIQ%2BNmBzdqs%2BVErPes4n467ze1xlNGAY1Svs9CFVSJl%2BACZNT4vxswoIqr1sqJwNgvF9RzpHb7PlAZ4JsY%2BL1NVaVWWQ6J61lhuAYlbRCOS9Ny8L1PHxVcB6KlOY8utO0OD1Skb70eW1DsLVO%2BHdEmlGlHFA27p1dl3BTi8KBMbBMTfpR9Ke%2BHI0E6YDnYSE03ioJz3R7t92I9Y5jAtybZf%2FGV2J7xjZhDtyF1REjGwvE39HyJWtehwr1dlcajfH2lNlCmy5BIOTmsLCbeG6oX93qbTlMq6teiArnVKl55uPon8Oi%2BArysVebENYMix5d0yOAteHBAySfO0AL42XMLjUNr4kVOD8KA6T82Cpq%2Bflm07F4Y%2FKAuqzf7%2F%2FFVZmDUNYgTXOedca2VpDpw4eKI%2BW9JdolcDuDwr%2FqVQG5V2MTq%2FABeZrtMzPzg5rZeerdI3v4M1HtO%2FmGFm5eu%2B%2BF4XXUE5b8pycdqerSvyAXuuRnYj90ROU5hSa%2BucdWvh48kytuWfzoixj3lO6ZroPKVIC9GhCJx6x3%2F5pko0tojlTHmS%2BlLTeI12a3OB0o2gLExlGZuZH5fqO6SEfnMID4uc8GOqUB1U9PW6yTV0q0kxGFXbO9SsdLQ0Er%2Fix7f43A%2Fyd%2FU%2FHznX7qiNRS6zU%2B4Py60ndDPUTG3xqQRT2QH8AtSkxjWmKX5uxUTqp1LDCIvD49YLnHNF2DT0pUNiMAGABL8Uc2HTHils5D7eUT55V%2BkFnkm5WKVcPK2Wr%2BRQ8FRCCbqfQ5cAqyMcdPBbSxDz2sH6OqnBRIQ8hmyIxB%2FhI65YVPWuwkjr7p&X-Amz-Signature=70ef3386b356e2e849e54c78c6b918f2c2b224e623952e29c6a427e1f8408f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUSXYTUE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2F7Rur4eqXr05xWG2W2BFdDkyCg5mIFznXRw8T8IyUfwIgRNk9Ku0dch6wWXfGZv2cEFX8baNu5KYcWPD1S8tSYowqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAN2CQTtkygehWGR3SrcAzY0bNhTAYhikp4ecngeJE8QcUMWk7CTNM6onCpjtbIbIQ%2BNmBzdqs%2BVErPes4n467ze1xlNGAY1Svs9CFVSJl%2BACZNT4vxswoIqr1sqJwNgvF9RzpHb7PlAZ4JsY%2BL1NVaVWWQ6J61lhuAYlbRCOS9Ny8L1PHxVcB6KlOY8utO0OD1Skb70eW1DsLVO%2BHdEmlGlHFA27p1dl3BTi8KBMbBMTfpR9Ke%2BHI0E6YDnYSE03ioJz3R7t92I9Y5jAtybZf%2FGV2J7xjZhDtyF1REjGwvE39HyJWtehwr1dlcajfH2lNlCmy5BIOTmsLCbeG6oX93qbTlMq6teiArnVKl55uPon8Oi%2BArysVebENYMix5d0yOAteHBAySfO0AL42XMLjUNr4kVOD8KA6T82Cpq%2Bflm07F4Y%2FKAuqzf7%2F%2FFVZmDUNYgTXOedca2VpDpw4eKI%2BW9JdolcDuDwr%2FqVQG5V2MTq%2FABeZrtMzPzg5rZeerdI3v4M1HtO%2FmGFm5eu%2B%2BF4XXUE5b8pycdqerSvyAXuuRnYj90ROU5hSa%2BucdWvh48kytuWfzoixj3lO6ZroPKVIC9GhCJx6x3%2F5pko0tojlTHmS%2BlLTeI12a3OB0o2gLExlGZuZH5fqO6SEfnMID4uc8GOqUB1U9PW6yTV0q0kxGFXbO9SsdLQ0Er%2Fix7f43A%2Fyd%2FU%2FHznX7qiNRS6zU%2B4Py60ndDPUTG3xqQRT2QH8AtSkxjWmKX5uxUTqp1LDCIvD49YLnHNF2DT0pUNiMAGABL8Uc2HTHils5D7eUT55V%2BkFnkm5WKVcPK2Wr%2BRQ8FRCCbqfQ5cAqyMcdPBbSxDz2sH6OqnBRIQ8hmyIxB%2FhI65YVPWuwkjr7p&X-Amz-Signature=70ef3386b356e2e849e54c78c6b918f2c2b224e623952e29c6a427e1f8408f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPXSC2D2%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAs9F%2BVLcjDm0%2FX7y4fF6nMZVuSX9vpfRj1UUIbWWmCrAiEA9ED1VoFnIUuWODukZyIAlsd9hcfd7EFBD5pnqjJ1cT0qiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDGEIMycR%2BgONEJ%2B2ircA0WjruIi4I%2F1C47GJN5fto5%2BIM7p8fb%2BGQWuvNCqrJmKbUw0LEsB8gmb6lLTH%2Fs%2BIakJM%2BMqd73MvNhN8VbmjOwVzEzZpOcYDyvKPAJTrMu9CpeqxoDvKQszInocm0foC1PeNlx0B%2FnSJHugxxNDgsOWsDyXKy8r1FiB77PlY3jD9LgXvQuyKL%2FX5s%2BxEUvvLNSt77%2BFhK4nKpTVuqdCU1omPGKddzIEp330ra%2FxzWbaxmwL79x47VZyv%2FBwHE2nKuZiIMlmVhhEmfYBtwSu5qYv%2BOiHW6lpt4XdU90MoWcEPhtGi91RHvncr9NlY18tV0hLsNm6kKVgs3bBebCtsYWpppbj2JbD8A%2FWu26KJBvi8XdQQmrevLGlNGRl7rQyHrkNM5lBN37ihOtUUTcat06FgSmhdBxhwAac9Sb%2FO3jaIBcHOGIqOSeJneI9F2%2BtKYB4%2FZvKmcRT5wDmuCb60nao%2F%2FTh29S%2BTsU3Umxx2SEy3kKRvRXdJwH%2Bqx4NVUYK3Jws0oApDfbj88iF%2BD87saFhZDLmjErSOALwZ8yugcXO7yfIKE4%2FUWZT7e0FGDP9FrVB2TdWHU%2F2THjCBGVRs3mLb44CP0QPohAiHPGAYVuPshNessnEUMd6n5HYMOL3uc8GOqUBOk76vLRUG9w3CZ%2Bf0x24NDur4Vwl1yHlRqHHCnHtHfp3D2LWXN8Oe4cw5qZNBnXbVRMD1zbPI4UTMnOp9K95T3AKgW%2Fy7cRzoo7X4qXnPC%2FgXT%2FOTFPvXV59F%2FkSrZeif6Mg01qvL0srqhtko9vQ2up2QcjSXZJmWd4e5Alxk1Q1JwikN12lGxtwhiedQ4RUYw4AZ7b1FR4xkdIJ%2F1DIEgTwPqFD&X-Amz-Signature=d3a06b6f74202374275c4ee97e66d641878fc433f39d032fe5555f57fc57a750&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJAADXZ5%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEUY8ydrLYqc3S2RJy4HdN0roI66PIf9vkbjEDirS96uAiA3mlpxsTgE6FGERXL4qVi7SJk3MTdsMT4KeYDa18449iqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMugGHzU1D1Z1hjfg3KtwD%2BAQ1Sb%2FfZ7BHRjmsAoACML4a4%2FF7RqhXB0UYGlC5%2BWE%2B%2F6QWjEJZwybtx8zo%2BaJHPWjJkFb3yzq1kezGqlpF3HL%2BnKKgF2QjsuCXHyY9HhM7oPKZVup99nIxjUFNnPyKOCGOEl8DRPcVO1myrEnC3mB6wU8cbByjcjV7rglHCUVIXRInacx17MZt7gWg3HKH4fcKbEVkuAT9IqHWD%2FAu3i%2BvD1JOeXx62WGtkJn4LnuBShvpovcbM7Hj%2B4r4pav49nsKPVOttPKFiOH53YI7ymjSvn8qk4py5f%2FvsGagsv%2FCKxzZTHZIpMsx38d64Nlyt2FnPgLJpjfaO4l6fIT4HMVTcX9%2F9YeZltOm4NYyVhAZgV3bFHoo00wCEGcdcGlzS0matEkV7UJTazB62ZIgXUSsYKosztNRIL6dUPRFMc%2FkQJ08G1CpyeitMMmGVEO9MgrIrGZ9sHSP2rCZZroXmAN%2FL4zCFWd8rQXTX3BkCqA%2BG%2FzCBtMDQNXgS4Ar5d%2FYe9PTR1sAvcVNbzkvBwrPSdRkuhQqwAo%2BA4Wo5qp2CzpvBEXTOJG3Dh6xmIEEgcHKebLSz1K8Ltdlpk%2FRGMOWEvfRGqJlnGhkYSGKg1WUuD4k65MsQ9N8%2BigMz9YwgPi5zwY6pgFT6cjfjvpgzY%2BNtpOxQ16%2BmCDmhKLwqeHDFya8BxRzo4sWIDetcwleE6%2FdcQvwhBQjvQwmKxOcgnBrwoWSQ%2BH0Y8T1koh4NyJspMMmpTF5POefjnHZVNyfiZqEvwMfKJNC9177qUM40EYW11GHhbbnIEIReHA8Ne8wRh31BRGT6%2BwH6AKAoz2Vg5sFx7Id1djvUZdy4H6pmAJh9urdJ324oE%2BflA8z&X-Amz-Signature=65e3d47feaba66973d15f9106f467ae83932cf7f7b16b9c502b0728498d0859b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJAADXZ5%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEUY8ydrLYqc3S2RJy4HdN0roI66PIf9vkbjEDirS96uAiA3mlpxsTgE6FGERXL4qVi7SJk3MTdsMT4KeYDa18449iqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMugGHzU1D1Z1hjfg3KtwD%2BAQ1Sb%2FfZ7BHRjmsAoACML4a4%2FF7RqhXB0UYGlC5%2BWE%2B%2F6QWjEJZwybtx8zo%2BaJHPWjJkFb3yzq1kezGqlpF3HL%2BnKKgF2QjsuCXHyY9HhM7oPKZVup99nIxjUFNnPyKOCGOEl8DRPcVO1myrEnC3mB6wU8cbByjcjV7rglHCUVIXRInacx17MZt7gWg3HKH4fcKbEVkuAT9IqHWD%2FAu3i%2BvD1JOeXx62WGtkJn4LnuBShvpovcbM7Hj%2B4r4pav49nsKPVOttPKFiOH53YI7ymjSvn8qk4py5f%2FvsGagsv%2FCKxzZTHZIpMsx38d64Nlyt2FnPgLJpjfaO4l6fIT4HMVTcX9%2F9YeZltOm4NYyVhAZgV3bFHoo00wCEGcdcGlzS0matEkV7UJTazB62ZIgXUSsYKosztNRIL6dUPRFMc%2FkQJ08G1CpyeitMMmGVEO9MgrIrGZ9sHSP2rCZZroXmAN%2FL4zCFWd8rQXTX3BkCqA%2BG%2FzCBtMDQNXgS4Ar5d%2FYe9PTR1sAvcVNbzkvBwrPSdRkuhQqwAo%2BA4Wo5qp2CzpvBEXTOJG3Dh6xmIEEgcHKebLSz1K8Ltdlpk%2FRGMOWEvfRGqJlnGhkYSGKg1WUuD4k65MsQ9N8%2BigMz9YwgPi5zwY6pgFT6cjfjvpgzY%2BNtpOxQ16%2BmCDmhKLwqeHDFya8BxRzo4sWIDetcwleE6%2FdcQvwhBQjvQwmKxOcgnBrwoWSQ%2BH0Y8T1koh4NyJspMMmpTF5POefjnHZVNyfiZqEvwMfKJNC9177qUM40EYW11GHhbbnIEIReHA8Ne8wRh31BRGT6%2BwH6AKAoz2Vg5sFx7Id1djvUZdy4H6pmAJh9urdJ324oE%2BflA8z&X-Amz-Signature=a9cc29e169ff4d1cd5c5eaa0bf04a8fc9a52bc8709d667ceca34ffba9c24ff18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TGP2IOY%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD90%2B2k550gDPbJTF004Cd93ACK%2F5tLaAmUbxueU4z%2FygIhALEzOYx1I33Nl%2BmAVHuEktNwanXw1lnwmSL2ZQUFIt8fKogECLb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztG4b%2B8bncf6RTeaEq3ANZFH7qjJgPlLU0nSatCz04pZlgdkrMhr1wfPN%2FPbMpqX5lDrFqvrCENesjg98qeKmoqXdjgjkb%2FxReA43DOIGTbnVs7AzyHEpwQIuLWhOFJbMIxtVwqer8HXaaBpwrzn8gggJuks5bjKUaxiT1JxluRiKLx1pPix08xp5zG%2FcRrM3VBd5uBJzvynJzrxk4T1H%2B%2BpWJKZbz4VxbuuntIep2MuJaCFTcagAWLgoqDXXO3X%2Bjp5RZ1IX%2B1EeN22cXkq9Io8CmqVuTJGFJoGVgyXrIFEwpB6vSiuChKvs2OTPF061bPMeD50PWREEjFbBT3ITA7YVFTZ3SMiMWmhjI4CwoQz17WfXkOh56EXxQrcdoipkmhz13QyKtFyoJuMyQBqAf3aXL2mle9yBy%2FR%2FxAaUexwAp3%2BYvsxbgjjSAds6bqPoPm%2BtfbxW7IrP2utu5peKzcA4qFnUmtKiSjTJW2WBL7%2FgK0NJhNw6PmR0JqZCmhBsn%2Bw5Zs58E%2Bg7uI9doghlCZKgw1rZt4rgmgf1G6YfWvu3gPnSlJ8Xrm%2BNHTv59fFKBTB%2FwTPdljSqtq5l61Twt6LHhNfKZoJwoZIddC46ib2OKfFhCtgWvvygFJKjpx9cHCFrWpsdw2iKrDDDT%2BbnPBjqkAYHZud6BEF%2FdyqNtVoI8WHQ6lMH6%2Bs7iLJtZJ2VRYQCoQbMtA3lVcw56VhGoxwjybs4BvajpF8TBwmP6%2FwB%2FD38Ahm5jQyKhrwFMrlVzLKcqHAeKANfcBPj1bWzt5rAPxmbDirQA2cSfKEP4IaVSb73ylNYGoHUpz7hmnJrYxliU98pgxAaWtWXntKQ%2F3dKd4woR%2BwC9WwwMBd6N5rNHAw33wzkN&X-Amz-Signature=966f571e301df12db3d6c7f4c63be6b4d36dd5747483b354df21634fb40d229a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AECT6MK%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDzU18k%2BuZjP%2BdbXnBGLE%2F%2FHHLi98ysUVS01ehoOY9l4AiEA23dIJYg7PyPcbpfkGieIF0XX1acmvWQVPsxBc91LNncqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK%2F00wB0GSbdBYEMTircAyJfXiLriTQM6rB3%2BcaQcemTfesVnCXNGv0GmpPFjeolz5wwTULjU628Hoob6sasinedlVoRWvmESi6NB%2FZax9%2BMurCzhJg1pJY5JIJjsXiIGFtM1QaDDgm%2B6YEpxEMFcMiPBNCOd%2F4HICy3FDeLU2vAT9avGX8eHskWPr7eoml9rzWIxuhZ%2F7RPMO9dqr4%2FmhCkjLn5L4eLhfLW1gAWSWpUaUPwNkIG6nRCMhFwl%2FPQUo03%2FvZIB6c%2Bh%2BmbNoqvUrMX%2Ba01ExfQz%2FTb1EMnlgvLFcKXuBzRgVaM79OssD9Ljy6XZQ7YgW08wxH%2FoOhhbIlDzWWbVI3ENIRvz%2FGvm2TIHoKmoR6B9RHonrxZ8PMI44nMU5XY5e%2FaIgi2sGN%2BH0b1SXDTTAXBkEQ0KIeI%2BW%2Fku6YrwTDTKJpNNISykz65liNPxovbWiH5CJpZNsKoT5fZj5msNZxr7IInlivMGgPXUl8fQSv80YBOq3a2T9EnOCgbJ%2FBl3R1Kx6YJ2nF2ilW3v0AM8BPP%2FawY7FxNPMNi8rJqDaUk7MXWODk2RVvqO9qxNdndrnXEus6YUbzUgjNN85ppJhJLEA4TLgw8BRYHjvkIPz79K9Loq%2BJa59oSDLCtbBCOQX%2BJTC%2FUMMb6uc8GOqUBgO%2B6688u5sn35%2BhAabS4y4MGcKWm9sbh3J2vUGllzP%2BSHF2%2B%2BOs3iwzefILyKAoVPsRA86druLeuvvnks3y2jojm48ynw4y5pPMIHEkcBmbU%2B6F6vI8qvxdjhi9bgmtNohh4BAo81SiwD9oqgjckoyf3wwPSQXP0dpB%2BEk2VLMZWyp%2FYh8KJaJB8KR7KcwbdW08VVv%2FrHctuVj6WqgJGm%2FLILgcV&X-Amz-Signature=1abf37133909a2349a3d2bd0355f4d61702db59a329fdbca3b2b286c1db4680b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EOBK4LU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGYP2COqHbyyp51onieqSh2qnxWWj3N6I10z02PPn%2FyoAiBQ580uc3aIV7wN%2Bafwfl3GU7Vv%2B0ozb2k5rLijJ%2F492iqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5RQV570R%2F1lqzLZiKtwDgq1ZX20ybnutMVHsnzqQEDLKF8zSzdVKWNO%2Bg2PiZYLGltidPCFggBzQk%2B3THpTkB2FanTCBvCF8C69W85dfeOGwwkZ4MTdGkRwbz4NNW3YxEtYz5TaVmwt11VwsBUA41h%2F%2BAEHvhXZU5sX%2BREJIdorvgYF3gsMKMg6PtVJ5J75NsngwK0Gly7gmWljSDfDdHz%2BTYND0lHz9G7QlZWEPPvgLFERMVZHP9OhkFpVbXAKYS5hiK0kby4uF4KLAhqyVwChHP8Hk632kbWVqwcQUj7eYL2bnq3IXkJpr58AfFYWQD4g5Jg2lI9Ch9WH7a0wYam3KnOjkdn%2F2pF2VP5X%2FmNOButAYK%2F4%2FGXAWXoKTceXAgu%2B6x1yk62Zsrtt4HmPYpSeXDI9PJsAy%2B3macUQ7fp%2BH2ijqW%2FznQyRjSArI1GZdM41QnlTKmrqTYAfH7OvnEpDNh%2FhtmOyjIYpGxtgDw1NH1xpjsoxg39HfwePMwPIMjHzCmGsbARrafz2g%2BiWPl2ii%2BWMhk4ZMk9H7R3FTNpVDb1Kq0mERzSGg2Pun03Hs4jQs5S2HPfQbF%2BbaWORAXwLXIkjcGVqfDHp95ljcJCSzWbrSIaOUK3UtYe5R%2F4yRa6qgeldBikmUtnow1Pi5zwY6pgF6hRyM1rBt3nxZN%2BBkAadYlkkUCFzZhfdyL16Aubnznhu0S14JFtdewzAfEJXjMq1yBJjAMHTJMx43UZ9ImQjGU%2Bb2pKkmzEHtzwTIWuUsiElmA7cUgxD1gDU4dER1z6rOJA59Ty2AhlV%2BfKX9523oJX%2Ffp%2FJUTLL45GVS%2F6nC1hUan3i5uLgHQz8zn4gCmHGKxkCzA%2B969rBsFepZ9q64fgno6l87&X-Amz-Signature=ed327fa565414d41c6f24220e8d123dee58147bd0619811373ae9852c025ac8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QEUP3FL%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBZ1mg71%2F8xJB9AwiAFmoPNzYpzTplzH6byElj6tmhVYAiAmFrbW4WCzB7a1IpsAKkNEXoWumUwehplnsZzHdibxnSqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcJ6EAz4HlVz8wCveKtwD4f0pHuieNbbJbqZcq%2F82Fr4LSZRsUE4smDYsH9YqhNkcwwlISAc2%2BxMBJyKQnxccgmA7LNntNuxUCENPRBdvtrIN5Y6pSjaNnzAGyfDoHNAHsCl%2B39h%2B%2BEOn9m83nKoLb7RcZ1xIt%2FREpNkguXagsQIiXXXOddPdFlaabcSh1%2FbQlxyMFogSsNeXXXeLxUx7CEO9uiT2NiKonPpHWblANiCUqbQ3kTrWFqJODiFbRpHcfr3fG%2Br1Da92oEDWYiJbyZvDG87TgmR5DM7S4hk4R6eZyIa4%2BV04uA01fbrwGsDjiggqz0FYb8f5D84hPeH887uli1Yt9zZ9ZKMbvl%2BnXy3WlAJDoxciLh8ePVTTM7w5kaZcB6DdO%2Bnq0QVEuNXfjB5jler6DXboXjPlj8oOz%2FDZSyXpWrMBhLQTRUZnp8f4tTWLWfejLP5rRmeLINicZLRUt6zz4Utk1yxdklzk5Da1%2FLYzv%2BfL5%2Bdaqb6A7CHmFYljwWrIRml687aVg6dYOnpUQ1P%2FMuKf%2BNs%2Feq1wCP7ZpPZyL3pb02KPMJ4lRf5bk0NZ9tdwJ764UxHi6e040rU3I2Cc8dXvYraGFFGgZqvkqyZW203%2B0VDMDWQuYeZXeB%2B5DiCKShp79Acwofi5zwY6pgEd0cYHrwsWXvYCKxTT3L5Keh7gFYJe9CCwOcGE4dmcKVYmVAjr9SCRaNqq1BDQss%2BO429EweVxWjpWQLiLhpWjSC0QRgvryCC91w61g8C8h%2Fsb4nccMV8e5CDgHwlonfxGCrcZlezQNe5W9AkPjvy9Q16Gj%2FbfcFbHuQD59CEMg2qwYwwchJUYS4ry%2FGaaOKlZrfLEvldt6fpPkxPx6HP8VRhZnGMB&X-Amz-Signature=ed169390e7f733f8cba9e499f638037ee7c1dbc57649db3c35021b44efcba3ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QEUP3FL%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBZ1mg71%2F8xJB9AwiAFmoPNzYpzTplzH6byElj6tmhVYAiAmFrbW4WCzB7a1IpsAKkNEXoWumUwehplnsZzHdibxnSqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcJ6EAz4HlVz8wCveKtwD4f0pHuieNbbJbqZcq%2F82Fr4LSZRsUE4smDYsH9YqhNkcwwlISAc2%2BxMBJyKQnxccgmA7LNntNuxUCENPRBdvtrIN5Y6pSjaNnzAGyfDoHNAHsCl%2B39h%2B%2BEOn9m83nKoLb7RcZ1xIt%2FREpNkguXagsQIiXXXOddPdFlaabcSh1%2FbQlxyMFogSsNeXXXeLxUx7CEO9uiT2NiKonPpHWblANiCUqbQ3kTrWFqJODiFbRpHcfr3fG%2Br1Da92oEDWYiJbyZvDG87TgmR5DM7S4hk4R6eZyIa4%2BV04uA01fbrwGsDjiggqz0FYb8f5D84hPeH887uli1Yt9zZ9ZKMbvl%2BnXy3WlAJDoxciLh8ePVTTM7w5kaZcB6DdO%2Bnq0QVEuNXfjB5jler6DXboXjPlj8oOz%2FDZSyXpWrMBhLQTRUZnp8f4tTWLWfejLP5rRmeLINicZLRUt6zz4Utk1yxdklzk5Da1%2FLYzv%2BfL5%2Bdaqb6A7CHmFYljwWrIRml687aVg6dYOnpUQ1P%2FMuKf%2BNs%2Feq1wCP7ZpPZyL3pb02KPMJ4lRf5bk0NZ9tdwJ764UxHi6e040rU3I2Cc8dXvYraGFFGgZqvkqyZW203%2B0VDMDWQuYeZXeB%2B5DiCKShp79Acwofi5zwY6pgEd0cYHrwsWXvYCKxTT3L5Keh7gFYJe9CCwOcGE4dmcKVYmVAjr9SCRaNqq1BDQss%2BO429EweVxWjpWQLiLhpWjSC0QRgvryCC91w61g8C8h%2Fsb4nccMV8e5CDgHwlonfxGCrcZlezQNe5W9AkPjvy9Q16Gj%2FbfcFbHuQD59CEMg2qwYwwchJUYS4ry%2FGaaOKlZrfLEvldt6fpPkxPx6HP8VRhZnGMB&X-Amz-Signature=a03ed8fb2107c4f8a560a474366bad2efee386432975bee0ab87d083f460fdde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTJG3V6I%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID7qZ8Di2e9jzGXo6lKFVz%2FCv573Fnfnfwu8thRYHibVAiEA5rM1AcWxYBvo9qq8EvQbqrLMX10%2Bv3NcOM0jqw1jecUqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHc9C98IR8TiTOl8NircAxaaD%2FYalFgD9WJStp82qOq0FfTaG8JsP5P2SRhhHjBNeKBcxi6bN%2B9eJBtET06fnrejX%2B%2Fdy6D24IXFKZzjHIR0UfG9wsjkiK6UC%2B%2FlTocGlUp1krlSDBZiFsbMMx98J52T5aKlkHUyV3oV5mCBhxzXHXr7unBFbC8iKQ5IPdJTDNJjHZMdi0REBeVc%2BSVu%2FDIwRPnOi9pllNEqRcZZ5frXK%2BbKTnydWyzqKfLNgE7ARgNpl3kYIKncNCk%2BkjLG7vWayoNMUwBzbINcrGEj9Ap5c8OTettzlatJVqnnwBbt6N8VNv4aJmVHsxa5B3mLnLbDgtg6r%2BANY%2BXnJVsj25QDIxIac3%2F8BW5YV1p13zHO0A4l6QAuHI34FzIDDW6h20UtU2HRhvZCUjbpSz0lWr9ySBn1KwBpaizhEntydIsUzVQu49XL8Xcw19G8fN2%2Fxkwxqsdj6FjDjY9KJ20okHafZSUCjojiPwdIuDX8L%2FccxHMJL%2F3VOjhuCMYfTKEoNJCuVAlwr5WtD7q1mtqEI1m8Cz%2BG0B4fczckvpt8WnC8es9xdH%2BuKx2tiPrcdIGcnha31yKLSD2sx%2F0Q1qMycao9NHdL%2BPIys2EWeu%2BOpYzt9EEjp40SIn9kuxsNMOz4uc8GOqUBdqEEQtIjcBwF%2FYoZwj5udRRF%2BIMcGZ7MwuL34OhbSjaxDkalJ7JOodU%2FcIfLkRcJXnZDzbKZiKn6ZAe%2Fdyd7AaLoYKE5bTlWeZI8mcI%2Ftce7YRpdIjbLUBOXDOHM7JwKPM4KzEGVK4yIJ7Uy1SfTcw1RWYe%2BzaX%2F%2BIGQSNK%2FslOkCR9JfJpJ3F7f69yq0Qmg3MRF4zdhSid%2B2XySjzN1COMKnZeQ&X-Amz-Signature=b8988403592ce1b26fb7316106068b6ed1295ed26b67eced5319b126416979b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VM7MDJR%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIByact9FcxsPILSutpShL0dtET7CZ7z3Oy4uOpqZo7p4AiA%2FNZgbJKxmcoTrL38xlw3pro5DAhmXwsF7taN1wXYiHiqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3S%2FmGA5KP%2B04%2FKFQKtwD5%2BpeCGv%2Fseeyta4mAtRTINciMxXcDd6UwgM%2BxiDbCFh4ACaOalNILHjcwLzrR4oFlYnQ6HtWUOLAhh8X0rYULCPcKZB9HT9bWjoDAz92H4iDgvKodrjKl%2B0REZ63ESsBcKkQmEi6ZVcBa9AaQsYjL8foTw8w8RQ9a8GilF8iOgDEkCmw%2FsRaDmFB7SjUYR1Zs%2B2lZtVtUWfO3m7n1USnMXvPA2qFg5IYZSf5USeBme9p8Z4RArP5Ix61bsR5s54qZif41c44tivPPrWeYZjBSSx38PyglR8b3YePMmnG8v0bejuh1ooGJoPrcBv2w1CIFZqMSXsJcseXDwnVue3boofPJb6w5Umn%2Bw%2BxtPbxhE%2FwdnJTvS643rttj2PCNPvwu%2FJ5oNo62s3JHcNJIsr8qk8ilwpUiP4h4DSpUNZ33gE5JfmXe8yQNnE5oZmX%2BskwL9FMSthNrO3urpMPM%2F4qKE2u8qD8IIOhvL9COXbZNN4l7xhYbvZi5LIZYYP9tAuFGA5LyPNzMPWX%2FyeiUencu0Tj1LAlaUjcueLwiviGccBR2A%2BTULcWUZXT6Ddyk3lKsglnZH4CIjwUkFWn4EOinIZE3t5TwEcUgTAvWdBqfM7pzibKCTqXhK5HEJ4w%2F%2Fm5zwY6pgGQPz%2FBVZ4ZQqfPcgftfAPpnefyFzxIAJj%2FLDCnFaYnzFqp1MJQCjR5ZC8Wq1mdcHiaAvvzGxUhv51RFkdrgrNZme3O4jHK2rTDzgD9D3BtofFbCd2jbnqLFXCvlDkHv5CtyAedswWQxlPjAwXo7YLJuQpzUKcR26HE6CNDfLu80w7wEWskKyOdWn5BY%2FUCydS44OS6Z4rjw5jEslEaUzWOXhnj8J0s&X-Amz-Signature=dc7ab8a286856a872d65cb88e08c321234d5d956468ef1f2943a968034044d1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VM7MDJR%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIByact9FcxsPILSutpShL0dtET7CZ7z3Oy4uOpqZo7p4AiA%2FNZgbJKxmcoTrL38xlw3pro5DAhmXwsF7taN1wXYiHiqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3S%2FmGA5KP%2B04%2FKFQKtwD5%2BpeCGv%2Fseeyta4mAtRTINciMxXcDd6UwgM%2BxiDbCFh4ACaOalNILHjcwLzrR4oFlYnQ6HtWUOLAhh8X0rYULCPcKZB9HT9bWjoDAz92H4iDgvKodrjKl%2B0REZ63ESsBcKkQmEi6ZVcBa9AaQsYjL8foTw8w8RQ9a8GilF8iOgDEkCmw%2FsRaDmFB7SjUYR1Zs%2B2lZtVtUWfO3m7n1USnMXvPA2qFg5IYZSf5USeBme9p8Z4RArP5Ix61bsR5s54qZif41c44tivPPrWeYZjBSSx38PyglR8b3YePMmnG8v0bejuh1ooGJoPrcBv2w1CIFZqMSXsJcseXDwnVue3boofPJb6w5Umn%2Bw%2BxtPbxhE%2FwdnJTvS643rttj2PCNPvwu%2FJ5oNo62s3JHcNJIsr8qk8ilwpUiP4h4DSpUNZ33gE5JfmXe8yQNnE5oZmX%2BskwL9FMSthNrO3urpMPM%2F4qKE2u8qD8IIOhvL9COXbZNN4l7xhYbvZi5LIZYYP9tAuFGA5LyPNzMPWX%2FyeiUencu0Tj1LAlaUjcueLwiviGccBR2A%2BTULcWUZXT6Ddyk3lKsglnZH4CIjwUkFWn4EOinIZE3t5TwEcUgTAvWdBqfM7pzibKCTqXhK5HEJ4w%2F%2Fm5zwY6pgGQPz%2FBVZ4ZQqfPcgftfAPpnefyFzxIAJj%2FLDCnFaYnzFqp1MJQCjR5ZC8Wq1mdcHiaAvvzGxUhv51RFkdrgrNZme3O4jHK2rTDzgD9D3BtofFbCd2jbnqLFXCvlDkHv5CtyAedswWQxlPjAwXo7YLJuQpzUKcR26HE6CNDfLu80w7wEWskKyOdWn5BY%2FUCydS44OS6Z4rjw5jEslEaUzWOXhnj8J0s&X-Amz-Signature=dc7ab8a286856a872d65cb88e08c321234d5d956468ef1f2943a968034044d1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7IEIQ43%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T212453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFCFyFTiqORJ1uSn9E%2FaCrIzVaAyw5jkBIA%2Fw5UBXPaQIgTk2gunxj7bDv%2BX4RBFnklvXUjqRE8E%2FdI2mPknQBDWkqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFufN3nuSbvBjqZZ%2ByrcA%2BWdTAEuGa2Iwlz4eGxjCNfv3H6KxElUsJEyE40xa%2BEmvktGV41taM7J8YToJtIR3KsBje%2B5FhQ8qjiDTpvz4jE14b8jt8PIldSInjKmlxLoozxmP6mSNTHUHuil90iGf20Y6GTCvr%2Bs8rR9iAgzs%2B9vs14Gd%2F4a47GQS5bUyWEySiHdfw9xKc4YOv4I%2FB4vt18n7VQ0xWxIwxyTFpYQ4OKc9gJSED0FdaGu0XKSavgL5%2BWZd5qPJrlqcv%2Bh0MJY7vZttfXoCeZZFRt9kpL58Yf%2BUlldbZAR9j%2FbxMGQj9D0uwNXl1wiQRd4AmE69lpZ0jl00cLMjcbbMuNHOP8cg33sy94rbSXvXzyXcvBH3o3FUC837S%2B7hXee7YxVXdmfOXjovS0LIMBEs4FUaXNdi2JUhj0bO8BGQAOlCzkxvbUOpVp90kppgjK7blXWL6jlTp0KpDeTplZuHc2OLF5%2FtfkTAu9PPj1s3gOrg9AwXhD4ZEKS9z46Zfjgf%2B7%2FA6GnEwgbLGkb%2BLq5kRC8JhPthSHH3DOG6U8jnT%2BVUSA4FgpCg6Y1sksuVhvE8NLR0Z0pPWu98XIX8%2F1yoPlKdP%2BVhsywS0qWx9qSTJkznmRmy1WW%2F6JhVw8kOMscFOhOMPv3uc8GOqUBG6gFFydZdrRaeoVrxRIiYSuDvqotvVtw7tRac%2BA%2BXEaefMt7fpj3JGJf3bM9vOXVLlmCeKw9Rj3PSm3IhrwK9UUUcEL2yVxbqloCGrjqKep7npW%2BHuUmOiWHh0TdR%2FRaLWOg%2FXTALltXHneTccda0gVpm5Y17BSTASskqdijxxjzsmRt6sIffeJmLu6OJdH3IFhUc2pn1pLgIprqh4VAUd0jgWE6&X-Amz-Signature=752474227b9599bdf466c9a68913eff3182d58c43ad2f52bc967a8908d788f4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

