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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDO252DX%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIERaop%2BdwKTIZnOeAIyvjnt9rh4uIvG0cVGj8%2F9%2FV1UfAiEA5oEKRakwpXCj9PURlYprvS%2Bw61F41ZVKOMbtYW6B7xoqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAVbzREpwChjKKLJzircA3q1SlXz24barVPsx%2FIKAXqC0B2rG%2FfTDzC8wvrLd6csKv%2Fj82ObrsLWoNBq6w4RApc8YQQkPFbOkImsYJuI3b59va0bRkpSo%2F2tfOCS6xkNZvvEhpULsEgVElghEEgaBfZ7wBibwtWUS6f%2BQHbppGwUWjzUMm2saCktCIA04AY68S54ruTyJ96OHrdrn4ULl8JyFjvx5mIlL1T3uaZ54TybH9evhS54Ar8YrAhaYeglWJadGvyigu2iccWYnI4avRu6KWbuva7MxoSLnU2Cff4Pu%2BlbmdxE4iPAdxfkgpWUW7lbbllYW%2B6YGNlwiz5NBk9YbPFPCu5GVfaSX3zPoTXH1qIRo3KM8dsLxekXwdNNhiGL%2FD%2Fsr7iZOn%2Fjm6426mDr15XMdUK8lFTbg7sS4JZUxwMW%2BfcOjmwLuD1im%2FDtQsBEP76jDsieukmIJry%2FFJIkCjMp5JAkZjCJwgmFf%2BEpKCzCJOpKZOhwOdmjPQWEdBpjcFT2s8FRkv2vrDcXWUtRWlCCtOCk7P504rl42%2FhVkQSgBgkoVZ5dZfcxLZdnYDom0A2HW3CORLj7lvcQnnC58eKA%2F2SZTxuNSZoiCYR6FJNb%2Bb7qh81sXOAxykPEQVG9MEQ9Ep0wlXNoMI%2F5%2Fs4GOqUBGx7iBkjonhaIo%2BFoO1EThFpH4xugmHJ55gLw7gHADum0txPn8TN5Y%2FOSC5hugUwwNgFUTxNd2PdSyoCGfVK%2FaE%2BJfM9ebjI72uenKCou%2BvA1OQ1VHjFdSFRoGKtMQ%2F7xtCHnCWrBzYSmnx5hj1LxjusVtsSMOHewug2C8JEzZEj22oST09ivxHz9C5GCQADChAgrpdvEyx%2B9IYOiHKsMQLvC%2BhuQ&X-Amz-Signature=ca044d22ddf327920c66c274256e68e1ad0c0b9ee9a83e6bb14b4ea66c2b4838&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDO252DX%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIERaop%2BdwKTIZnOeAIyvjnt9rh4uIvG0cVGj8%2F9%2FV1UfAiEA5oEKRakwpXCj9PURlYprvS%2Bw61F41ZVKOMbtYW6B7xoqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAVbzREpwChjKKLJzircA3q1SlXz24barVPsx%2FIKAXqC0B2rG%2FfTDzC8wvrLd6csKv%2Fj82ObrsLWoNBq6w4RApc8YQQkPFbOkImsYJuI3b59va0bRkpSo%2F2tfOCS6xkNZvvEhpULsEgVElghEEgaBfZ7wBibwtWUS6f%2BQHbppGwUWjzUMm2saCktCIA04AY68S54ruTyJ96OHrdrn4ULl8JyFjvx5mIlL1T3uaZ54TybH9evhS54Ar8YrAhaYeglWJadGvyigu2iccWYnI4avRu6KWbuva7MxoSLnU2Cff4Pu%2BlbmdxE4iPAdxfkgpWUW7lbbllYW%2B6YGNlwiz5NBk9YbPFPCu5GVfaSX3zPoTXH1qIRo3KM8dsLxekXwdNNhiGL%2FD%2Fsr7iZOn%2Fjm6426mDr15XMdUK8lFTbg7sS4JZUxwMW%2BfcOjmwLuD1im%2FDtQsBEP76jDsieukmIJry%2FFJIkCjMp5JAkZjCJwgmFf%2BEpKCzCJOpKZOhwOdmjPQWEdBpjcFT2s8FRkv2vrDcXWUtRWlCCtOCk7P504rl42%2FhVkQSgBgkoVZ5dZfcxLZdnYDom0A2HW3CORLj7lvcQnnC58eKA%2F2SZTxuNSZoiCYR6FJNb%2Bb7qh81sXOAxykPEQVG9MEQ9Ep0wlXNoMI%2F5%2Fs4GOqUBGx7iBkjonhaIo%2BFoO1EThFpH4xugmHJ55gLw7gHADum0txPn8TN5Y%2FOSC5hugUwwNgFUTxNd2PdSyoCGfVK%2FaE%2BJfM9ebjI72uenKCou%2BvA1OQ1VHjFdSFRoGKtMQ%2F7xtCHnCWrBzYSmnx5hj1LxjusVtsSMOHewug2C8JEzZEj22oST09ivxHz9C5GCQADChAgrpdvEyx%2B9IYOiHKsMQLvC%2BhuQ&X-Amz-Signature=ca044d22ddf327920c66c274256e68e1ad0c0b9ee9a83e6bb14b4ea66c2b4838&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5ZUVMDA%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD7bbmHNVa3%2BjVa9HG8LcsrEa0Bio8eEzx1bF05XUcZSAIhAIzyYcK3FjIWsfvtpKgBRbVuQlZ7UfNIJCC2w7Hu2%2BzkKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igze2%2BdSQq7yk6WTfmwq3APlRcKLRBC%2Bt1IpWXhxuEGMS3tyVZ8kz2GA%2BpyOH9yQI3bIFY31PZqtHQLwGUBT3HRmwjPP0DJc5Uq%2FZj%2Fm%2BWG84ZMKmowdCuGhgC0CHZ55nDLFx8jJ5Z4AfkaTg5Rwa6dBQ0HDUtJtAuZlShQ0HFVe7sSCdDMV0UE%2Bhvw13%2BBbbrP0I7EDqQCb5%2BG7Uxi%2F76gWb5XkWQuvSo1DOy%2FicSqHmEDPZSpJqEkwodzcwfaVDkfCMhyzTBg5ZBX34CNHQY8EpPve7pENW%2BRImHMQph8rmdreCzzWCCw0RfbyQoKlL2Vy32Afp89U2nvRrHVGvcjs60gIstNS9l%2FJ%2BlCeIfN9%2FusRcrkEIXNWHZzfUa19Om4ldaHeCONxhi3ZdXUi8eaIqc89BjoJvRZfLSt6YxhRs5JcSc6bDIz1Jt%2FpHoKrj6HWUZSyjeSZI7TDGN%2FjDX93nx3J08JawjubBGzRrsxec%2FF0ccBH9UrdtkaMC8ugSBOtKhq3YPMBxo57CAK5umS73LET0qxG%2Frhh%2BUQcDOF1O9ZvZ9zkvZJdFETw4fSlDaa9AEsXKzMWB2IPBIkb00hqQHLyk5r9Dp9A%2FFd8dZNMsCOS5aA%2BcR5h1%2FByD6DPVJSF0P%2FB3oMC5XF0hTDv%2Bf7OBjqkATscQjztRoGi4kLOXo20%2FI8biN4p7hR%2By4feG9xYh093Loar2HQi33kD4w7lFA%2FklaeqR0NiklBjAp%2FRhu8KyTOb%2Fr923y9utgcyJ8xOPoSD9ARCjyOkmRdRpQ4tOW9z861CkcMrOG6pWYEDsZ5z3G81IInJK%2FkARiA%2BQ35ao7AMCwGnc5eAf1BYTXpn8c1uWhJwQJsF%2F0ae8UppDt6Ydcel2RT2&X-Amz-Signature=79bfe2fb13a200656f7745eb08f64f3998eb2e65d809983dbf22b69fd8c83a01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y6NDC6N%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrkWKVO6JpKOGGw5l%2FPCuv06%2F66YrGaEQoJzVAfkOxxQIhAJ85syyUxHbxfgIHakV8%2F5dRUkCC%2BPBCq%2FZBSFIO%2FPtQKogECKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHKcNffhgre8%2BciRUq3AP1ZgP%2BjIxXVSShvXoU9JLMwE8RBytF6jOrkIILl3wZoiUENUXqUEavhmUhr%2BlFyxfcwv6afbrRQ0pSp5q8WyPsev6Uu0vvE0GuCRw6%2B4p9DrQewERj5mDF3Ev85bFzRjobgYbIFOyRaNhSz%2FmqMpaurp%2F%2BQCzMBjibefRB%2FciFkvHJwcxcpjpXEFUOBDQHJhy04LKLqAKM6fvvQNe0%2Bf7aRk9%2BhlwOJS26nc%2FD7eiWeVZWWchLJjrsBTwgVgiHGVINNrTWsZFupEqGe8GrbcWJsoHGsCtpToZh98qheaCO2SFcNpthxsd1%2F%2B%2F1K39NSaToaEvpxOA8smbbwqEbe5ntmdTpQzD6Z0%2BDg9M1uK4vHuallk2J3q8GgDK9BSvxYe1F5DZ8vGTVYTFpyDVZdu9w6U76C5FVGIU%2BSMAEYsiJwn1wFp%2BqtxKhWs%2B4kwhk5oB%2F9HBOgNeSPE%2FyHsV35l61ckhldiEvM%2FVzGWZJd8k99cB6CJEeJdhkZsnXJJNOZcRwUhOIrZRxQm9DqRGjl%2BPh%2BPP1EamYHqs%2BRTiZr0Rx8O%2F9d35juWzoQ4%2FkrsQ8puaRTP5ejT0P5Z6CToxQJ5ap8nEGKsGhmivsPoukYXtCpLVHYaOgN0r9jRklVDDr9%2F7OBjqkAcsWhSzTVx%2BxaTvRcyjF8hXozj5cJSqJ2mjmJAXwGLKCJeQYlyfWnl7iUzFxIXtP%2BU2q39rJO5L%2BT52FttSrfmnEAE0R0Fp2RVy%2BDz8K%2FoKNx4BB7afT%2FUJ3nsSQcq5xByHGdehOeLLHYfSHI7QBZHS43yLLG1J5r5d1tmCptx2oaN%2B00ZihPcpUoaHDAxhjMdRdqXLHHFibkCBqGBxwRS%2FQwAr%2B&X-Amz-Signature=bedf026420338535ed7a7ee1c872d9ad2ba28ec7b819e226ee517d9b35af9eef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Y6NDC6N%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrkWKVO6JpKOGGw5l%2FPCuv06%2F66YrGaEQoJzVAfkOxxQIhAJ85syyUxHbxfgIHakV8%2F5dRUkCC%2BPBCq%2FZBSFIO%2FPtQKogECKn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHKcNffhgre8%2BciRUq3AP1ZgP%2BjIxXVSShvXoU9JLMwE8RBytF6jOrkIILl3wZoiUENUXqUEavhmUhr%2BlFyxfcwv6afbrRQ0pSp5q8WyPsev6Uu0vvE0GuCRw6%2B4p9DrQewERj5mDF3Ev85bFzRjobgYbIFOyRaNhSz%2FmqMpaurp%2F%2BQCzMBjibefRB%2FciFkvHJwcxcpjpXEFUOBDQHJhy04LKLqAKM6fvvQNe0%2Bf7aRk9%2BhlwOJS26nc%2FD7eiWeVZWWchLJjrsBTwgVgiHGVINNrTWsZFupEqGe8GrbcWJsoHGsCtpToZh98qheaCO2SFcNpthxsd1%2F%2B%2F1K39NSaToaEvpxOA8smbbwqEbe5ntmdTpQzD6Z0%2BDg9M1uK4vHuallk2J3q8GgDK9BSvxYe1F5DZ8vGTVYTFpyDVZdu9w6U76C5FVGIU%2BSMAEYsiJwn1wFp%2BqtxKhWs%2B4kwhk5oB%2F9HBOgNeSPE%2FyHsV35l61ckhldiEvM%2FVzGWZJd8k99cB6CJEeJdhkZsnXJJNOZcRwUhOIrZRxQm9DqRGjl%2BPh%2BPP1EamYHqs%2BRTiZr0Rx8O%2F9d35juWzoQ4%2FkrsQ8puaRTP5ejT0P5Z6CToxQJ5ap8nEGKsGhmivsPoukYXtCpLVHYaOgN0r9jRklVDDr9%2F7OBjqkAcsWhSzTVx%2BxaTvRcyjF8hXozj5cJSqJ2mjmJAXwGLKCJeQYlyfWnl7iUzFxIXtP%2BU2q39rJO5L%2BT52FttSrfmnEAE0R0Fp2RVy%2BDz8K%2FoKNx4BB7afT%2FUJ3nsSQcq5xByHGdehOeLLHYfSHI7QBZHS43yLLG1J5r5d1tmCptx2oaN%2B00ZihPcpUoaHDAxhjMdRdqXLHHFibkCBqGBxwRS%2FQwAr%2B&X-Amz-Signature=f8035b5af523779624118745e68750f23fe3d49fbdf68c097514bcee0048a056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJHQSVUK%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWNIm3xKLKj%2BH5mGrMV7%2FlBKANbhFJbNSj%2Befm6tVbRgIhAOw9DsedBxegVAgM37ZbuLdtYANdwxPJyXTYR4j8Ow8LKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHPeAdMiylTCE9CeQq3AO9ggaHopF%2BbRIXPA6aghpIziz%2FLKClFfNnX31Bg4p6W79b7wzi7SR%2F0UZmbvXABnTR3kC5lleDb3z48zTMc1Ig7WCxSFDxmdP5qG9KYimJDzskOYm7j%2B550TJOymvEWAKXk2fJF3UVJCYiAIi3FILP2En%2BN338gJ5qlxViYFdseYSrYT0g6EcHuGTNzzMTrZES70hLZhZ0HcLULSKcDC7hEeCUIhwPQe1W7aoq3N9pW9UxNQidjaYe2pCIxGeKow3O7CrieS9HUh8lj48tqA8hUW6AiUQNHZFkDGyZ6JnslRZFNl4WL3eCgKE1YlCmfzBH4Ug%2BWZXS0w9D8%2FgLzMZIWwrHoMnwJ0rT69YsDn63bUHdSNa%2FuST846%2BxbXCYCQnmpi4WOeR5j7jAy1EIKhUz%2FiY4Brp7jMrhd%2B4g8MzQNkMn6AA1ym6VUdaASQwo1E3fT2zC2Y3QP5wMWETji%2Bg3%2Bp7HWspTEtU943dGO3AVU4ocjKMwWN3EB2GldKOc2qn8Xy4VUggv%2FhpBj7ibbIDuG%2FUlGm2t9Sf5EfYaZ7i4nVoyqx5l%2Bpvidij7mfPDGTlrkXP2b9QtQW52PLnhwdC89hiraUckEMgv%2BT3o%2B1nv0DkDQp9vpIBEvFlLpzCnm%2F%2FOBjqkAZSqpm5bu0k3bVpFRFYoev3UzX9fPaxLHFxa8PvitHVWoLDf2GUiYxkpdK86U%2FRn9rWGB%2BLWl3TIHUazNrfmDK2tJJbJENDK%2FfwKPxkh%2B3xaU3CoQL11jSzMpVpBKHDvyWQkb2OgiKzqS5%2FowPIeoKYOQdgjUaO7448HaxOuLIBfN8evDk8hQ6i5dR1TnCtV4LRl4mnShDimFegYxlLDR0abKB1f&X-Amz-Signature=deec9d6be408609896b105ad61e0b1adef115141273ca7837bc84eca554a59db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPA4ODR2%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID%2FHqZhiHHvQABFTEo3lRCB%2BDx5R7IOHKJw96yX3TUd3AiBYPDDY0cEPcft97ePwVQIBm3aYtrNZJcci0ODP2fF7fCqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAc6Zc8rflUskCnE3KtwDiJJT%2Fuezdm1CprC5dvT8QkLFCzMW8lM2irX0rFBEQC%2BhVZ8e5jAuP4pt7EW2GMPBQUSXrYSqoIEXH60ov%2BpSeeBNfFJeg6tERYFUoJgbKhfOaQgMOiZ2veRHSx0M7dkSAiOvkCg0wHyuoC1%2F7nATRJ4DMSayx9VCMCibE1ojowNQCO1kO%2BqnmnNy%2B7SARhWEqPOg5h%2F97cbtslHpavPD8ZaHKpkt9Jb5LwBeyZoFczz764SGC%2BhXNv%2F%2Bi4mYi4vrqgQPVACyerkwRayRDOQAI%2FaUswmk7PaL80feRsoZMKq%2BcD7amsoguzUCvhvcfQJa9QyHfDRYrof6M1Lh4%2B4eSvd%2FLd5v8%2FVMra7r0SdHPsjgJRxbxsF1qkg07462PCx3GgdkQvUk6O3u3Be9IK5AF6j4cZW4sX4d2KQTcB42TgMfx0T2E3Zvd0x9r7jDQbGTnMJYQm7wE7at8XxarRCOfMVZySM8ECv5ZfKT3XBOvlHVvNZJM16E7Zz8gtd7VIYKIFO4zpdBYJIFHKZTXIg%2FzunuThazplrbG%2FUQg6uycSdRgqXU6D1MAef9nW%2BJlbiRUA8%2BGoxLmjxjaCPnOnWQy%2B4nnCQQ97UjobNVCPKcsu51YeKuYiuUWLowp5Aw8Pf%2BzgY6pgF4R1IgP7e3j9wg8xqHQ4z6cEHFNoFX%2BFcUNGNqrYtWwTBLGu78jwyKmeNLz3Uv%2Bl7agOTTiOyDgPlACUHJRxKF0Nqac1d4BAeNiIeLUNy2tdPIzcZC5FDeEGTlUFM6P%2FRiB9MFfpcSjCSD73k%2F%2BEnbjCM07JctfLae8Aplcl7PDgxqWxLuYlE6BOV7K3hExetd3ywFWxxVWQLGpeC%2Bi1kRlybCl21d&X-Amz-Signature=610bf27bfbfbd59e263778d7d5753fc64c4acef36019b2124b5e55639c39961e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TUMGQ5P%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEaG8hOqJMn5SAJTW%2BBpydwnZRmqZvdYA7gQxn%2BFOmIIAiEArHQxZFnNlAWXX7lKtyaxpwa52Ys4P2lPLSIwZuIODv0qiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG6NmPwA15PC8N5UHCrcAyLgsuCZvVhb8%2BUlu3Ba%2Fse%2FKNUyd6ha%2BH4A76s9a1jP9gYPgxYI%2FImmH6ljxCQInMZ3BrMUSrRitYYT4rZHg8QuLzxw7hZq1mOsTMyo249gHp17h7KjqKL5%2B9604Hojgy83rCkNAN74ooif9p3HhnuvmS4tkCYj6zdOaZWj%2B%2FD6ghmsEkdLto9EdTaUMgt5v42GfqLMwy3JW3UsR5NMXKt5l%2BN%2BGgIp39bdaQZNiAi946Yp0tEiu3YBAOl0xsk9ztRd3NmKUvC5ktvfcBm7B9%2F6LFTcbF1NnoAKwc2bVLv1jbQlDW0bDnL9DBKoo7JX%2BQKehc%2BDaJZicgjWf3XW3wnkWZ9c%2BfKdovPm4ZfUx0ZodFGKvbipcQZYpLSHWfbHvX0T555JXwBKGzk7hYzgSyFJV5qlUXlVOb5NKIpme81eIFnpEGX9Xg1koC7DxiMxSvnb3vCmqlBphuI%2Fgub%2ByM0hJHSwifCEXbRAQelAu7hnwV4wsvz66cjknw9JyJXaUV%2FDax5KfX2V4XYD7gQJeXq3KIjAnQXJxUd9hpsuq6M2aWTb1cx7Q4krLmpM2iecWM2dtc%2FWbps5Q6%2BI4fcyRJ7Zw%2BwxDCl4FftrmHjhcedohm8xkCB7QqOKeO%2FGMMD5%2Fs4GOqUBuQnDk30yQY1FeuiYImSYruUgwsBRdOgoHisPvdIt%2BdOMaSyPj6kAhYONyzb4VilKDr1IwnZpd0xi1ceZEyJ%2Ff%2B82ZwFUQ4yypH92Ov3rRWZCA2uY%2BFshCjTZVSJgPreNgxL96bzeJc9Hj84fgz7HmuWumC7a0V4lMhclvRMgZ9TQtrYQ1H6e40piGym2WTkIxKslv36H3CjNnfawZ5aQCL09bQ14&X-Amz-Signature=ac5ea9e039f1e70a51d821225e6731898d19bea9bfdffeb65def751437caedb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBBDY23O%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDsHArfG3T%2FqQVR%2FryJcwbCXQUNeqk1NT26jKWDFpjMWAIhAMWAqeTElcAK6f2oYVcyKzRGyV8U88Riv2nroc34zbtAKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtPGXJykH4yhyAylgq3ANHBIr%2B8F9OzTLZgxPXZvRQgJJcrVIbNFgRJ%2BwRQ0zX5mDpjsuz%2Bi9h7OvKWGQ2UzcOL0UQk%2FEF1HGauo9VHEnFw11ki0DDKaeFykTTNhzn2KEP3A5QDMK%2FTjhylIULJ4%2FMH1po5BxweT6XqPDf6slyIzlFO6UG5JUaq7BSvQxAu%2FoRzOBtT80Nz3qle9%2Fz4e845CS781XJJyzXQSBsmddqEk1ajUysFC8tl2o0tGeT5BpC1txeu696uh7imffPj0V1CVlpkb7pnXz2HjBqyFJclMikOx2HgNMzH87a2wxwEuvUoiOVVKckFP%2BjKPFMGZxLxNY78tYDqcfgbKUQU4FY4%2FKA%2FMzIHjb%2FH%2Bw58ZOEgrfqPd%2FnS2FVI%2Fe%2FhzEiayzCWwBSILbB0pkt3dGr5FnHNFREiOKLSoGYlQJbzZitKC4C8FUkfiuRZJx39d%2FfP7X3cPivflyHPNQ9XlxUVMoDyO1QQVBDCGb5YIyOG6%2FAxl1yTjBkfNq7BcD%2BvEC2yc%2FxiGQeZ1iGzSmCPymCKpXgn04n9ZxhpqbVf8AXgUlyKuzwNmyqpkgxVkwyJ%2Fehl3DX6lsGGJuX9RIs1vXMsnqLUwINMvOBnYhSi2wtn83SG56nKqnL6w%2FvtXG36jCk9%2F7OBjqkAf5huvy%2B7zb%2BnsEnYqUCIxRFvlMErCdtIk%2FpsfbkUYBDOP7JMTzLt026xL6sMxDim57XAyjJiIAxITROTNasQAJZ4ZhsTwgVAcy8poafmO2xBEgysbPuW9tUed%2BYwC%2BZ%2FpN11fPuA5anZPWJtkY0WkM5dbt8YtdppznmUtUbsY2%2BJjf7UTZ6TYHqdRIDm%2Fv09MwQlIkf7Y75AhEYBLM2eMj7UOc%2F&X-Amz-Signature=80195ecb5d61ca75f370ba2eab5fb4c5d31f9486491a5dfb83874137101e9933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBBDY23O%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDsHArfG3T%2FqQVR%2FryJcwbCXQUNeqk1NT26jKWDFpjMWAIhAMWAqeTElcAK6f2oYVcyKzRGyV8U88Riv2nroc34zbtAKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtPGXJykH4yhyAylgq3ANHBIr%2B8F9OzTLZgxPXZvRQgJJcrVIbNFgRJ%2BwRQ0zX5mDpjsuz%2Bi9h7OvKWGQ2UzcOL0UQk%2FEF1HGauo9VHEnFw11ki0DDKaeFykTTNhzn2KEP3A5QDMK%2FTjhylIULJ4%2FMH1po5BxweT6XqPDf6slyIzlFO6UG5JUaq7BSvQxAu%2FoRzOBtT80Nz3qle9%2Fz4e845CS781XJJyzXQSBsmddqEk1ajUysFC8tl2o0tGeT5BpC1txeu696uh7imffPj0V1CVlpkb7pnXz2HjBqyFJclMikOx2HgNMzH87a2wxwEuvUoiOVVKckFP%2BjKPFMGZxLxNY78tYDqcfgbKUQU4FY4%2FKA%2FMzIHjb%2FH%2Bw58ZOEgrfqPd%2FnS2FVI%2Fe%2FhzEiayzCWwBSILbB0pkt3dGr5FnHNFREiOKLSoGYlQJbzZitKC4C8FUkfiuRZJx39d%2FfP7X3cPivflyHPNQ9XlxUVMoDyO1QQVBDCGb5YIyOG6%2FAxl1yTjBkfNq7BcD%2BvEC2yc%2FxiGQeZ1iGzSmCPymCKpXgn04n9ZxhpqbVf8AXgUlyKuzwNmyqpkgxVkwyJ%2Fehl3DX6lsGGJuX9RIs1vXMsnqLUwINMvOBnYhSi2wtn83SG56nKqnL6w%2FvtXG36jCk9%2F7OBjqkAf5huvy%2B7zb%2BnsEnYqUCIxRFvlMErCdtIk%2FpsfbkUYBDOP7JMTzLt026xL6sMxDim57XAyjJiIAxITROTNasQAJZ4ZhsTwgVAcy8poafmO2xBEgysbPuW9tUed%2BYwC%2BZ%2FpN11fPuA5anZPWJtkY0WkM5dbt8YtdppznmUtUbsY2%2BJjf7UTZ6TYHqdRIDm%2Fv09MwQlIkf7Y75AhEYBLM2eMj7UOc%2F&X-Amz-Signature=476a7aec445ccf17a41a869c9a8d215e7f49e824e08b919a090ae6e9b36851cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4SSXQUW%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJgJGH12s8owmh0YOqcKsYeCDLTvA6qNqZr7i2iLTDWAiB%2FplqWKLiPpFYHzoll8sbI0X8DS13Of4RjLkdXfexHqSqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXfmnNnQd6eRd4AN9KtwDJiRa2b0ocRXkRXWPvelgPuAAbPQX0Mk2Q2BDT6iu3rEUF0TOL4q2v8khQHIqGei6jNgDCg3EOlx%2FfdE78q5XRElhg2JjH2KZOvuOhBhXx1Nv3Xt%2BMzfBREtFcbIBB0hmxNzQN9K014EoItMJsfXdiJ3SJVdqJfUZD8L%2FHBhtvbewNFu6QGf9dFAjRAkX4XS6A6G%2FJK7zOKB6OuyjFu91H1Ns3QzZdsEs3o3mYT0qN5ybBrhbDIRSZI2mkqS%2FY4wQV%2FRy3MIvUgOIu1QeSJWnPlAvxvABh1IwtitXMv4GtbbfWN3R6rntD5IqAwsJfCKG14RpNbo6huiTV6timmTfIB5MKrLhnB%2BXDQLaMg1zKs5l6xX0Xqr162VsjEsS0J03AB37%2FRxZVOiuQkzGOBwhDBrH87z%2BY6MCy8FzwfSV5%2B%2Fw%2FJB48pfo3%2F4wMBYzadCkQ%2FlTkURV2nOYF57OeYawFGqgv1LEwEjkRmpv3nj6chOWsqmH0CY3mdRRww2Q49e5G7tfMRTXE2GK9RWz5%2B72U%2BCkWGZCnIM96BwwbeLuoia6pP7DaVd3bdu4%2FfX6LjbrvRdNz%2BTDKqArzkS0cHieWZjpbJQ3wcwmGSD7XMugocBbznDDaRt%2BxuGVqXEwyvf%2BzgY6pgH%2F72xNgurFP5vkO6kd3onVYr7mVIFtSyBxyCzc%2FSaqxojnEB8LcJZnnnLJj35bvbAZs2vXH9W3mzxhDxs4H0b91vOrYB1tSSwRlRHFUiXLbiTlIFSM4aLq7m6mszj0Bfb3bXUPGRJOXEfY0uWr%2BQVC1VxT3%2BQOriTjM1bU5oNsU4mm3So8tAznr1ixRPqlPcMr%2BvxZW%2FwGmGVJy0TfIYWcPrORdJ0e&X-Amz-Signature=79218c6c4fbb73cf3f74b244624cad6f30d26dce2b665ba2b2d29f3c0c39a4d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKX5OXVC%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZHC0TUXvQJSykMm4ICAHs%2BZXNaq3Be2lJQaB2WpRQkgIgPk%2FcTqMH2nR6uKkyV2v3xjJgviKri86h%2B1fsw0gpzxkqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIaLzT%2BwZf%2BgvPrD%2ByrcAyvywBvttJAORteY36To4NkMap457crbQVKz86A9UY2GRWFWfCM7GajFlZiwaffgV1%2Fau61GFuqQ1XoUGogXScwKdA3D10mdrXONfNnk8MjHE0LkQcE8FdnLmOJ3Tcl1%2BQdbxUYGx0r29PSkjj1bBmn54rDs6pOXmbak2T1uUclf72bCPERi4L0l58zZrJnao88xc5FxkU2X9iItnITrjhvkpRIwv7%2F28r4A6XZe4rfR58%2FlpRQN6ZGFJDug5OOXZP6HPxiINRkLXcfJZ%2BVWsKT1DaHgZfBKabNob2VufFxSuWmd8LnuEy%2FcY%2BOVS6mI1CqROU8fpgaCHwtKGNrbBoqkCfRWNc5CXaPjTBfw0J1YwwG4%2F8WivcohAXaM6G6sPSfmWasSMY5U4xjAd0xvonBXC0YIGTfNralHs837SyVT1MAN0cJT%2FbHM%2BkrzQhG80oRqe%2FVRZYRYng8yeOb50tTwh9FYpXBuqiqYgCcX8eW5yPns2Bj0FZNtoGpmQw0FXj0LzppzkBw8nZeS2KNsnxcWsW%2Fk%2FIfI9aTQmTNXdMi6u8LYST2yUVTa1jtyiFBELMPHcHRbj9jvRIUIoYbB431gbcLQYbME3QWuE%2F0TXZdnIJkNhuYvchVW1uZ0MJL3%2Fs4GOqUB8%2BcIUCtRfhbXF7KGIv%2FBoc0O7pMeqcNWnWrP7GHmEwkr%2F5IBWDhEGMfbzdked9QSHpGz%2B6hRMnrtphYOkYITf2yPNrHr%2BTrvU4RdPaaaDH21Sxg8s6FbWQtVuz24A4QFzN8y6207e%2FBNUxqtoYyCaZj%2F56jubfHVGzyCNrbkQP%2Fx9H5GqxtJKKqX4jtOFfa5RbqwVBfFo1Z7gUAfdmObyuXF%2ByqO&X-Amz-Signature=4d904c721b9b7ee7c10f7a6420404915c06bd29bed15af7895593a26044a86b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKX5OXVC%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T175548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZHC0TUXvQJSykMm4ICAHs%2BZXNaq3Be2lJQaB2WpRQkgIgPk%2FcTqMH2nR6uKkyV2v3xjJgviKri86h%2B1fsw0gpzxkqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIaLzT%2BwZf%2BgvPrD%2ByrcAyvywBvttJAORteY36To4NkMap457crbQVKz86A9UY2GRWFWfCM7GajFlZiwaffgV1%2Fau61GFuqQ1XoUGogXScwKdA3D10mdrXONfNnk8MjHE0LkQcE8FdnLmOJ3Tcl1%2BQdbxUYGx0r29PSkjj1bBmn54rDs6pOXmbak2T1uUclf72bCPERi4L0l58zZrJnao88xc5FxkU2X9iItnITrjhvkpRIwv7%2F28r4A6XZe4rfR58%2FlpRQN6ZGFJDug5OOXZP6HPxiINRkLXcfJZ%2BVWsKT1DaHgZfBKabNob2VufFxSuWmd8LnuEy%2FcY%2BOVS6mI1CqROU8fpgaCHwtKGNrbBoqkCfRWNc5CXaPjTBfw0J1YwwG4%2F8WivcohAXaM6G6sPSfmWasSMY5U4xjAd0xvonBXC0YIGTfNralHs837SyVT1MAN0cJT%2FbHM%2BkrzQhG80oRqe%2FVRZYRYng8yeOb50tTwh9FYpXBuqiqYgCcX8eW5yPns2Bj0FZNtoGpmQw0FXj0LzppzkBw8nZeS2KNsnxcWsW%2Fk%2FIfI9aTQmTNXdMi6u8LYST2yUVTa1jtyiFBELMPHcHRbj9jvRIUIoYbB431gbcLQYbME3QWuE%2F0TXZdnIJkNhuYvchVW1uZ0MJL3%2Fs4GOqUB8%2BcIUCtRfhbXF7KGIv%2FBoc0O7pMeqcNWnWrP7GHmEwkr%2F5IBWDhEGMfbzdked9QSHpGz%2B6hRMnrtphYOkYITf2yPNrHr%2BTrvU4RdPaaaDH21Sxg8s6FbWQtVuz24A4QFzN8y6207e%2FBNUxqtoYyCaZj%2F56jubfHVGzyCNrbkQP%2Fx9H5GqxtJKKqX4jtOFfa5RbqwVBfFo1Z7gUAfdmObyuXF%2ByqO&X-Amz-Signature=4d904c721b9b7ee7c10f7a6420404915c06bd29bed15af7895593a26044a86b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

