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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWTPB43M%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCuV52POfyPMWwobpLivT4raD7MLeY3dO%2BpC5oDXDqyAQIhAPXbfo%2FPDWebOrvcGC4leMM7Ly9QEQiu8hD4lW6M3WkQKv8DCBQQABoMNjM3NDIzMTgzODA1Igyey9FnZnqpKnfDTHIq3AM9bnAr7pkDN2zzrW4L7acWIk%2B3bxnBZVrIBX128nlZXmqv7uCReCwn7%2Bg9WCSwbnSsdnegM0l7mT3pduw8FRwDYVujoioXoD8yTWr4kqyE%2FEqSJ%2FjiKFiDngPUArxUtmIA8ngDhWSDN3p6duN3bhT16LyOqDg6ul9Q46cCSGCDioq6vG7HwayNRxa5bHk%2BYqfxfeMBc74LP3MNsZ%2F8yPXs8viPABcYq0hAvAmNt4B1tSifeh5fFXUqaj7bMH73awdYiY6cG9DVWF7szqven%2BDNWTQiXTlwlMUnnfrTOpUr%2B%2BQarQtxV7wKedu2gpDhpPuGWV%2F%2BPLMX%2F1Heviz7uINAd%2B2TKpXmXVmY7agohyBo7ZnYG3CBmgr1S16SsQlsuec9X5NjOaWfJl1IODb7AYwIC8A28upqyVsNdlb9cih2dWav5BNHUffSR9Vf6QHLAswgNC%2BROaUUu1oQ28L0vTKeaeXaA%2BUvxXFdkyQLit6UyvW%2Flkkuu7zs1VsZ00VxZz%2BnPHukbd8L1VpnNSRRigI26xbgC%2FftLc8BPbphc4iwSzaUFKqZjWuclF1QHLYTsN9uJZ0pRx7J%2FjpXWF6FEIGv%2FPWPHIyvTSAjPyqco3rHN8%2FAZXbO3BuV6JNTCzDj%2FpvLBjqkAQLTWQca6W16k3MYhtYtGYFJzuixfGYX9sbS0czenW0rd7Vs5AFcKdiT3LoTY9xlpWcGGaOWo%2F8tGr4NPcgpgna8gWh9aqR3aJ7voOtCnQbivv08fHtLZcwJKXfR0x0sSVfyk%2Fi3pA1DRk1PZmDiLWvr1XFoXwn8ylBrpRLJRb4wj5FviftwERm4Ieb7nrkUWhW7n%2FHec%2FCsjnu6%2FLZLdPSff75P&X-Amz-Signature=095eadfd03f097a48a409a6cf93e0d3f43ac93679dbfde0c226f3db67c79e96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWTPB43M%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCuV52POfyPMWwobpLivT4raD7MLeY3dO%2BpC5oDXDqyAQIhAPXbfo%2FPDWebOrvcGC4leMM7Ly9QEQiu8hD4lW6M3WkQKv8DCBQQABoMNjM3NDIzMTgzODA1Igyey9FnZnqpKnfDTHIq3AM9bnAr7pkDN2zzrW4L7acWIk%2B3bxnBZVrIBX128nlZXmqv7uCReCwn7%2Bg9WCSwbnSsdnegM0l7mT3pduw8FRwDYVujoioXoD8yTWr4kqyE%2FEqSJ%2FjiKFiDngPUArxUtmIA8ngDhWSDN3p6duN3bhT16LyOqDg6ul9Q46cCSGCDioq6vG7HwayNRxa5bHk%2BYqfxfeMBc74LP3MNsZ%2F8yPXs8viPABcYq0hAvAmNt4B1tSifeh5fFXUqaj7bMH73awdYiY6cG9DVWF7szqven%2BDNWTQiXTlwlMUnnfrTOpUr%2B%2BQarQtxV7wKedu2gpDhpPuGWV%2F%2BPLMX%2F1Heviz7uINAd%2B2TKpXmXVmY7agohyBo7ZnYG3CBmgr1S16SsQlsuec9X5NjOaWfJl1IODb7AYwIC8A28upqyVsNdlb9cih2dWav5BNHUffSR9Vf6QHLAswgNC%2BROaUUu1oQ28L0vTKeaeXaA%2BUvxXFdkyQLit6UyvW%2Flkkuu7zs1VsZ00VxZz%2BnPHukbd8L1VpnNSRRigI26xbgC%2FftLc8BPbphc4iwSzaUFKqZjWuclF1QHLYTsN9uJZ0pRx7J%2FjpXWF6FEIGv%2FPWPHIyvTSAjPyqco3rHN8%2FAZXbO3BuV6JNTCzDj%2FpvLBjqkAQLTWQca6W16k3MYhtYtGYFJzuixfGYX9sbS0czenW0rd7Vs5AFcKdiT3LoTY9xlpWcGGaOWo%2F8tGr4NPcgpgna8gWh9aqR3aJ7voOtCnQbivv08fHtLZcwJKXfR0x0sSVfyk%2Fi3pA1DRk1PZmDiLWvr1XFoXwn8ylBrpRLJRb4wj5FviftwERm4Ieb7nrkUWhW7n%2FHec%2FCsjnu6%2FLZLdPSff75P&X-Amz-Signature=095eadfd03f097a48a409a6cf93e0d3f43ac93679dbfde0c226f3db67c79e96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTJYHPDN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHulxcDeSP13eId8SnDxQ%2BJleOiWpb03jiAZi%2FlplQ%2BXAiAmGF2dqr7Eua2iQG1%2BKMN10EhJOXk7A%2FvI6O7zC5%2BJ7ir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM97ZgxWaxVxhOf3FHKtwDjScpTh%2FeVACzD2Ths1k6UOnJ6wecYe%2BDks2SbNfL5yRj8g1TOW9zC4cF%2FNnlajl7585%2FLEfJq7xEDrNjM4aY7UNlRNlOgWAyRCpGdymr3tQzbqK%2B1Q3vj5fk0aRrDfbTWWTckWilAHW3yf819xW8gfdS0LUyMVLn3TfgIPcbLvU1BliUbri7lA%2BITfTfNLR%2BOk6zK5HivGe%2FjVKOb6kNkvuzBf9cdxhDsoogdoWYLpjFz7N2kwXLpO73k6X9RZCniQXCOCkEwj2kyD1xCEWfjCLTcCmPFZ4bBlgWhld55MoML8IUbJKb%2B%2FuA3Sf2iTCtrLUjCoRF3coy8LEcM7pF0gduNdg3H%2FMrNzdzFJiKfPaPvt3pUCt5bm2xgAYS1oDnkm5diwDGhabOtsargrPem3prS7FhPPgyYZphc1CFVN8SUEGpEW%2FgDgcIku147yPAR7QPVmxukG5FgLHxdg7fwP3bFtD3ygZz88QO06RAaexay2O7LFeCiGe5WSXQAfQtl%2BCmM2yBTV9N5FOMhcIjwL2kyGxwc%2BRM1Y2t4SAPUaiRa01NN8LBVzS1z8tJ8SjQGT9layuJD3%2BDFgVSU7uyLN6JxhTOkYSXaadLEJOJPQxr%2B%2F%2F%2BJlla58bJU%2FIw%2FPybywY6pgFh94OGZJQUhs0a46DxyLoZD6qwhgIPDUW3IniTTbh%2Bx%2BSmzOqeOCsxQAHq5veDeMH2StJUC97b6rCZBvWdWlfGH1OhtClZThGS4BiWez%2F3eCzIaZUYqyx%2BZ%2FO1wZN2fZwlN31czXJvGMKzNHtXNdfDtOzFR2L9FeLncLxBxuZdKggpmUwop7nRjXAZ0k7vky6yCOkc%2Bo050vd%2F8KF6vCLLFyUpFVTB&X-Amz-Signature=dbba269736af882e05d063454df56d4ae73657cfaf8a065e7ef3d34ea2d552e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEVV3VCI%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIEQgzJPRK1gaX8QMadb2YJqBqnMnznoDhtA0e7ENDNiAAiEArVRbgH3ypfQskqjnGtoWlUx0ydgpgPSv26y8yOKlGC4q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDL1RFmHmr1LBR999dCrcA92nGq3U45UR7SV3LgdsVzG2cdANhDobomjCiBqCT59bSKqrJflUf0%2BK4pRTkO1anhyOCr8LkPwcxhzPmBstQQXiKdm1OAUYXqkod%2FYtimRsOXKX4ajdM1aALGV7loxba%2BQeGm6dJgiwctrEKjXyqSsfOjFysBsoBmDZcCuoxuwfLrApLDj7n%2Bw1LPWFK2nxafbs8t2wW3oyYf9osgOuQBLoHdrVCv0npZUgAs4XfDCi8bcA4VBZq9qk7ujnvucZtjtpz0nk9MBm7KcxGVy3BRjEq4Sr9egvX%2BtFR8gMpLWu8F1rEb6aWjO5U%2B79YHWba1T28B3P%2BepNg%2BXMySGKhvsK2HERmkIpr8K9CPdFZAMgpc%2Fpe8ECn1h2zf1zhV0aBa%2BxqMT8sS%2F67LN%2FOR0RCVBsoNO07VmCNyP%2FU%2BKof6Povc0DCis1UA%2BwCljR8g7dkfl9TjbsCeaN5vX4BXBrjk8YOiLzi0fTp8dEFQZlrirn80j2HcIPFUShZ1nvIYEyWmmr2qz5gQ9FfLLh3PTxn0FY7Khbc6SjQwxUZ%2Bpf2NoyJZ7CLjPZ15DWFK%2BFh%2F8HLCzWq9xCu7%2BY7CjYNcSurqi7GxwBvgSkfeu26ZcStcupVkCbghubKyvV5sMoMMD8m8sGOqUBUY1sKnUWwoEOyuaAThwsmTaVsCBroLFTmOUx%2FSnTUlBlHEjc%2Fvs4Kiwz2e2Y2VK6k1JVtyK%2BW4LWmvKrmEeVmwG2PKkw8H18hdfEhFQ8Eakx43uEi6IOtVfQ8ehzh6eOVKGBNVSRqASCYw960BFPvh%2FZ2RgrSiTQAh1m9ZvfWkVFpQZeBKf%2FJ%2FTGM7tLn5GBu%2BeGQPXMI%2Fc2%2FVgPrIEYANusuO8p&X-Amz-Signature=d3fe2a59fb42146c3eac0cd5b5b51fa1266e2c5e31ae90899c5b6d0beca544bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEVV3VCI%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIEQgzJPRK1gaX8QMadb2YJqBqnMnznoDhtA0e7ENDNiAAiEArVRbgH3ypfQskqjnGtoWlUx0ydgpgPSv26y8yOKlGC4q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDL1RFmHmr1LBR999dCrcA92nGq3U45UR7SV3LgdsVzG2cdANhDobomjCiBqCT59bSKqrJflUf0%2BK4pRTkO1anhyOCr8LkPwcxhzPmBstQQXiKdm1OAUYXqkod%2FYtimRsOXKX4ajdM1aALGV7loxba%2BQeGm6dJgiwctrEKjXyqSsfOjFysBsoBmDZcCuoxuwfLrApLDj7n%2Bw1LPWFK2nxafbs8t2wW3oyYf9osgOuQBLoHdrVCv0npZUgAs4XfDCi8bcA4VBZq9qk7ujnvucZtjtpz0nk9MBm7KcxGVy3BRjEq4Sr9egvX%2BtFR8gMpLWu8F1rEb6aWjO5U%2B79YHWba1T28B3P%2BepNg%2BXMySGKhvsK2HERmkIpr8K9CPdFZAMgpc%2Fpe8ECn1h2zf1zhV0aBa%2BxqMT8sS%2F67LN%2FOR0RCVBsoNO07VmCNyP%2FU%2BKof6Povc0DCis1UA%2BwCljR8g7dkfl9TjbsCeaN5vX4BXBrjk8YOiLzi0fTp8dEFQZlrirn80j2HcIPFUShZ1nvIYEyWmmr2qz5gQ9FfLLh3PTxn0FY7Khbc6SjQwxUZ%2Bpf2NoyJZ7CLjPZ15DWFK%2BFh%2F8HLCzWq9xCu7%2BY7CjYNcSurqi7GxwBvgSkfeu26ZcStcupVkCbghubKyvV5sMoMMD8m8sGOqUBUY1sKnUWwoEOyuaAThwsmTaVsCBroLFTmOUx%2FSnTUlBlHEjc%2Fvs4Kiwz2e2Y2VK6k1JVtyK%2BW4LWmvKrmEeVmwG2PKkw8H18hdfEhFQ8Eakx43uEi6IOtVfQ8ehzh6eOVKGBNVSRqASCYw960BFPvh%2FZ2RgrSiTQAh1m9ZvfWkVFpQZeBKf%2FJ%2FTGM7tLn5GBu%2BeGQPXMI%2Fc2%2FVgPrIEYANusuO8p&X-Amz-Signature=0927c1e80773f3f6d626300c0eac9d0e25615566b92222f43fd8efa2dce50347&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLFBBJIS%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDH94e2m5PE1wTfq%2FwGNUeQ9rh%2FnJFpCRkpow%2Ffektd9AIhAPkwUH3FsPoj5HNIYeq5P76SI8H%2FxeFFNfMLcp6CxfeFKv8DCBQQABoMNjM3NDIzMTgzODA1IgxDDPlR1%2FT4E4su%2FCQq3APhSDStTWdLWLTOo78HTTMH07kVD8hl5GP8fPjP9wmeHDnhWjVgO9NaenXFrdVbZOzsgF17mqRN9ceVOYKmUwHX1HsKTK1o7nDEbwH6z%2BkmqP8PGzx4S%2FF34cLqdHZHfX696bkRMsHwpdaoCorjYFcldkOS%2BZV3xExiqiSp%2BAsgKmV61FjZi2IcG6Qb%2FwDEDvkwcpiIsH0bKiUMsMHKDkZ80aa5fqoEhiLaemrEP5Z%2Bl3HLvXdzEDdYcbV%2F%2FDLYOpQK8gjG4yf7cop5I%2FoNOTBCF2VD5hT3lqtaymzt%2FDVOgOQsTv0592KM7ORVnEYGDlsKXEhry4K9P%2FvOZJrMoXhNJKkVFge9Zqc0q%2F0%2BqEGJcfjm04tlgPBpO97FktDWhi86cHxt0qrlH2xhBNV7UBpMLkrUwnhAnj8H9awc%2FYRoM3zduNKcr8oSJeFXHxoOtTMLbpNOpKCGz25KpqfO4BWmZwxHnQVjWoc6IPo9IjVeDs%2Fys83uOF%2B7LvfPC8oxcceAIQWjmqv87e0rViZzK98%2BkSW6fLVKBVsnsNv1c42XLfFVwxAvMHiqn3BSnVWko0oHQFFMVpXC2mNFxTvj64QmJ0OGTb25QKpptkJ4VeWGcD4AMIlfGUEZzG0TpDCl%2FpvLBjqkAS8fWfW1wVTjIzaF7lxn%2BUHgpirhs6pXvY6p2n2J%2FiLpXoMZR1vH%2Baa99kFziORn4K6hg8wSqZQ0AS0C8rBKp1H7fTGf0OF2HsRY7FoYgFkZmpR%2FtOpsLHcwSkiutM0Bfy5YgK7z4sf12SW%2FrxOeF8Qa76uvOSaW2d1sBeX3vFNXVVg7ywFTzNAO6HdJpb2xVgQLp70L4SGQAQEz9s7S7hudd7Hf&X-Amz-Signature=9281389865d0870a894c84378a0ad0afe23b769d17964fe433278cad7291d39f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QETGGDZI%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFDC0Bi9RgWMnFw87c7yThabNSsLTIMt6W3I%2F8O6VeKVAiEAsaedE66yb308X4%2BctXtQDhoV%2FdFN%2Fe8PpyHnkIVyhkEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAETTHifU0SKnPyLqircA18Oo8HJ4z17ILCQUqgQ4ODyHKzsX67xrz5cq9wut4rS4xFyd7YTUp4qPw8GsNSCD6In9kKIYjj%2BvBs5Kwl7l9ZZtnKW0Kcxz2aEolk2Tl5Iz5K7wJroYpyYFuxzQXGMz1UfGTFhOi8Q3oJ72RsMYP%2BZKd4OXcFoHRI%2FHOJg1khYWt2OncwxwW8VK%2Fbi%2Fbt4V5K845oOXbodTq93r6tjMSOVxoPaRFCWKdPNpB0L1C48s5L8Z%2BsLwFvcooKpwBAyp%2BX%2BFMhiJy%2BL6m6N1FCRIW4v6tQb9a4bRD5ne%2FHiACCEezNPDjay7SsL9D48bDZyMtc9rLvlYExDaZwsZuwO67JGSplvks86ZYVcG7CCMdwY5EWFSiXbuwBy1JZeSYXJDlVeg4PVFDvB3x73%2FK%2FIXXsjV%2FC2I%2FWTcDw4NpuH0%2FbtPlwYGApSvD%2F%2FtVXMtmU7a9zKcDZqov5oSwKUg8ks75U71Ri%2BsNyNHVszX8lQHMgYGNQpyDsBcjLBKBdIqI%2F0YwAuLJ%2Ft49ZKpAa8pkgtz0fHR%2BNeC3HG%2FFh7iV504pRSyjTAUMUpieEH4Jc5TQUsRE%2FpzRcS1ekApc9whQcuksLmGIoTi%2BfFZ7soRLA%2BIBPueHpMlFxCMGiTfrPZMMP8m8sGOqUBBRSXiH5GKsJlnxOH7V2V4S2zJqVUbUjZkcHQzCtNwDnMpfoLCM7PLLa9l36T9FtUYz%2FlhN1acgTTYzM%2FdKRs%2FSKNPCC2u2NSs15aEriMBPnGwXs%2F65E4YXhJmgRgbQyJW5bQXj69VCDAwxDocud7nSb5i01q83gz%2F4QXabxgT%2FtAUcZORgXSgWSysgp3JJ4PJ7Otg10dUU1M89VD%2B9xMwIv0RGLL&X-Amz-Signature=699274e12c56b3eee2e6de3ecddc8d6cc020fd17a6e7ef6913255f7a8696af87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOYV7PKN%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDR5qf2mpnt27e17Vq0i62kFSslYB1JevswyDeIgBkOGQIgceIL6pP9p16lNlk7Kf1HGoaWGMv%2FHgb0rO8IY6sTGvcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDJw6SAba0KvAXdNYGyrcA6%2F9WziXz6pLXlJiB9rlcQWkVfDSB1KEsU1f1q4NUVts2%2FVajzb%2F3oSGPHrWmQtOiCyE1Xkmfi48Byeib6CNboBpJ3fkxENoW%2BQ3Ab2k1VwiITuECg1A0cWeMk5Xh%2FPyIiaZDwA4hGLT7ZRkZxYlCC%2FpxGHVRmuwT%2FcP0P7r3GVSxgEx80kqHvd7nm9Y8w7eJ7oHq2M8TMWGQG7mPWRW%2FLNv1hJIHDuflIrZc%2Bp7dip4DDkU5wNplUNWAAaL6CD%2F0rqxl%2FXZvC6m56IZzNf6UC6BZYTjFgBRY89A3wWuOJHQUmIZLKkprGk7VKAupwThIXynXYrbZUOKNVSq97Boyyla5dArgioolty5RzzRVxvIUvZfjgIGxRq0HSHai2xiQt9NcON%2BH2URQtqjm9jUSC2N5XwIufxW7pzE%2BWfWJb4ZyZVpEOsDPWEgpACzsU2NYUcF2edQTOA8gXIemwqSezXhKlrev4OqO6PpySFrK4D8ngjeQw0BXl3HIDviWP2PcyUqJZ5zBY0Nzy5YgOTG76rL36xM97j1kj8vVekcfPWM0qkdrPrceojr1CFMtIZLTj2Z278sOmXW3fPJ4LMdfZ%2FVRiO2CnS0og15x59k452rLyuY%2BpkDCTQX9I22MOT9m8sGOqUBaCzJ5V5dMEOiRwIK2lTHipA1dPOUBFQpYcmTlaNHcVz50ruCMI8mkgaKmAwqa8gwt%2Fsif%2BLT7DpCb30SZs7n43lzokjJJtvsuOfXqyJAVBp6KYJt66DN99cUkyKLfKXTLnoqXoVUg%2B3rEilMoWuibyU1UP1EXqOssfTrutbuw%2FuhRsXIbaN1HKqVPNaxlnHrDi56jVngJZDWasequobKuLAXSDrr&X-Amz-Signature=9362b9c78d69e04d2102bb17b4a6a682a8c3f2c75debd2772df4d3f2808f19ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665T6G6ATD%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFa%2Bq86ERqE7Q3TRBoPjDglZKQxnsb6qlIofMr7zkLtkAiAsFZ854J9CLJ08ii%2Bxvxi2ibunQM3EPGiOJuAU7m%2FbOSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMgdzK63Yb3KReMp%2FFKtwDdF%2FfHnd2eqixMcrED8c0TiuaeL%2Fd8DMSXABzxp1guj3cF3P2x%2B4UuKtId1S5HhhsxdAYMa3vLJCi13rUAxp3ThF0%2BqRp%2FqXvw1RtNAydrVx%2F0zDw5sWkK1%2FWCyT3zVpcwHY8cNy2P9aG%2B0WPjQjR%2BKVHg9AqTMw%2BY4iZdJyszj%2BJerKx0Q0dN4rx7Tzy6T11H6PfTWn41VAPT7onZ99Uk%2B2GXdR70hbnp%2FixCncXqAHc1OFS0I1dZvyz8eJTMoUizIVTBja%2BnPLbPL%2FAtogeSAeXnzj6EODN4sFW%2FFkGUSY3WH%2BY5A%2F8r3CQW%2BrEF%2FNtf3Qoj4TfHswqlqYmLDyO3xy725bHSSYpCpqq6kdEoVNtaRMCrGfjLfZxUxAWX%2F7vUY3el3ywXODjpPc2yfkqCQTem%2FgiEN3CM56rfCmt6%2BlbRFnWKZwd0InJ0sBS%2BxbmHonqeVlnrGo6v1Ud3tmFGvZADr4%2Fm7bnciKGzgzTCaf6iY44rbgLljr1%2FNZVlsEkUiDhFOHvnyU3b7ukHLzrlLKt6JrKddc1stC8YoHHsFb4K9uF0T71wJ2ipIe0a6MaJYS7QnP9B%2BSuySMD9ICympWVlCvgDQ22nU27zs9NNMFDCzh2TznEW50sGF8wvv6bywY6pgGbax0wtL4WsNtFo6rxi7SZ8Wg2g%2F8usETwOnwqZNItyGotaSW%2BHIvtDlQFXOTRAPfdzPvVEWnb1qEIrCgOpBiIbvzPCKu6vTMDC%2FIoKgaPKjmgnGTUyHQMKjj8bpf4Qtgf%2BeC5dwElfsTYbbNOX%2Bd0acgbkyrFW2lVUcOjzLt8o8SjAsM9xuuV3CNAZEyBp0majomXz80ZgTYCppuIOXI1WnAylxp4&X-Amz-Signature=e57578be8e72931055ef25971e78708641faa3915c22f9bd2663911ded01fd7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665T6G6ATD%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFa%2Bq86ERqE7Q3TRBoPjDglZKQxnsb6qlIofMr7zkLtkAiAsFZ854J9CLJ08ii%2Bxvxi2ibunQM3EPGiOJuAU7m%2FbOSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMgdzK63Yb3KReMp%2FFKtwDdF%2FfHnd2eqixMcrED8c0TiuaeL%2Fd8DMSXABzxp1guj3cF3P2x%2B4UuKtId1S5HhhsxdAYMa3vLJCi13rUAxp3ThF0%2BqRp%2FqXvw1RtNAydrVx%2F0zDw5sWkK1%2FWCyT3zVpcwHY8cNy2P9aG%2B0WPjQjR%2BKVHg9AqTMw%2BY4iZdJyszj%2BJerKx0Q0dN4rx7Tzy6T11H6PfTWn41VAPT7onZ99Uk%2B2GXdR70hbnp%2FixCncXqAHc1OFS0I1dZvyz8eJTMoUizIVTBja%2BnPLbPL%2FAtogeSAeXnzj6EODN4sFW%2FFkGUSY3WH%2BY5A%2F8r3CQW%2BrEF%2FNtf3Qoj4TfHswqlqYmLDyO3xy725bHSSYpCpqq6kdEoVNtaRMCrGfjLfZxUxAWX%2F7vUY3el3ywXODjpPc2yfkqCQTem%2FgiEN3CM56rfCmt6%2BlbRFnWKZwd0InJ0sBS%2BxbmHonqeVlnrGo6v1Ud3tmFGvZADr4%2Fm7bnciKGzgzTCaf6iY44rbgLljr1%2FNZVlsEkUiDhFOHvnyU3b7ukHLzrlLKt6JrKddc1stC8YoHHsFb4K9uF0T71wJ2ipIe0a6MaJYS7QnP9B%2BSuySMD9ICympWVlCvgDQ22nU27zs9NNMFDCzh2TznEW50sGF8wvv6bywY6pgGbax0wtL4WsNtFo6rxi7SZ8Wg2g%2F8usETwOnwqZNItyGotaSW%2BHIvtDlQFXOTRAPfdzPvVEWnb1qEIrCgOpBiIbvzPCKu6vTMDC%2FIoKgaPKjmgnGTUyHQMKjj8bpf4Qtgf%2BeC5dwElfsTYbbNOX%2Bd0acgbkyrFW2lVUcOjzLt8o8SjAsM9xuuV3CNAZEyBp0majomXz80ZgTYCppuIOXI1WnAylxp4&X-Amz-Signature=53a6c4fdd717506f12414b6036cce17dd6421e17541d787150612a28f68837f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCY6Q5SM%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIEasaVOhdGk%2BXtyKfJOyCbo3qzLrkWR9U4KM3fe%2F2yOEAiAaevxZM%2Fz9Gb2tKLDj5eBZv8mhOm%2FPbtOXSxF1zR%2BkJSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMQe2gI0OeKtFnzBr4KtwDq4z203HF71lMJRzFe7U0g6XK3QWMCAjOwqpz7avQjuibj%2Bhjo0Y30a%2B3uoywwGYq85CEVIEiE6I31wXbDcIzhZoH%2BIDw5lWSRKF7WKtGHqz4wD5v3S2%2FMRSD4Jcvj7q5AApwBdZn7B2SAXAN9hTWkVNTuuN50WPDy5HxQOehQ3ZS3N4o0iMHWZxuIIprPT9F2mws3P3ocng2dA2vZloYhN5j3tDJe1ktKPRkjxtnYtOJM0FecnRGjB54mqar34zpO6OBsR7Arxj88S6mq%2Bi0xX5ZJsHz89ixnSs2MpAnCJ51p7U3xK5rvxlEWXt9t%2FS1vtvHKfSqrB5GNQvT16stt70TAP7F3xw1Sfutq05pyFwGbe9NyWmCdJkSHcs1eyiI7M0UQM20OVkNNVicSDitgNdanU8pZBas4IDCJl9scsw7jDv4B15CXandpZFEYe8O3WwWGwYcUgbIYyMDdnmHCqjNs211O5apcgAhoo7Oz9UbcsKSd2wJsky2iTQAC0%2B0WQ9kk8Qv2IBYhuqpmeBChDOH72FKaDVRG1ua28oCnyXNlXFWKWmFADdOuRV4G47ZmUNp%2FFNxrTJsgCZO0z9r2b11ss1kB55eg%2BLcYgX2143%2BNe5BgIeiE9ZqdV4wsf6bywY6pgGOfXV5LNGJpIVQSyzeml48m29M27KqKl4XytOCWhm3HTdV20GPn6BPoE1Mlc4oUlUDEkpXIRLgIQCmvqPvN5PoiWCccT8edwxljlLnX8V%2FloHeAbUaIB3FYCDnXZQod0SIoSxraacjizdauDbYTydMy1uOZsHGlyHiuxhXPi8Y7XiryUodY0lGmPgSB3bfNbhGzc62FoLgwSd%2FPsTwXy8xKqMmbKNB&X-Amz-Signature=c00bddfa93ca029fd33a3f3cc0c47d4973f90fe04bef45abb407eb8aa23af5bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622D2LXF6%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIH2vhae%2FB%2Fjis8YZswLlEovr8Uyl6qM6Nxito2DfSsN6AiAEpoal4U5MUDVxIMm7UWexstmypKcuimryAEh1kVLEeyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMfK5sLroc7UnXdUWaKtwD1c6Qq4mimjjZnVkPwnCV%2Bd7gjZYhSpv8nneRDRuUUyuWJwFBpsuieI4yB98tMlGECIJR%2BNpSQ5lp64tZ4M7GCGrRZd6bZNsEYqO5CnO6g3MElb8P9ZePgfwgEkZzSLAhLoShl9noScHellEaPOb0tV0a22v0GTJMIhRHqvfTwTA%2B53uODXLXmuaW544zeRZM4ZCBeLKASbv3x4iFkVfgiijqPt6QjfVCHR246aOij8S5hLCrDj2B5v6l%2FZys29qxfDvNulAbFscDF4caknSdzCQ4FaA6%2B9WkX3lJ7B3cMEw3u9F9FgXR8gcN3qKQFzoT6YiHJvS1y6cxFS4FsBid2S6Vc0jW3ZvcLz1JazuSPNRsjoDJSkiOLb%2BwzJJfnvdZcwKd5qlvfBnPRXbid%2BeQjIqvJ6TLxokY3nTU0bQFT3dFh%2BAIJHZCAxQ8NYRfF3Cb11M7KH8QbnZa5MAqEFx7C3qtZ7W4x5cyp6wrt%2F%2BJ79MYXUPjTpYB3pEBIWFpHCpj3MpPhM8d1A%2FfHwlZ4RsE1FNbeKjiKN5e1%2FMEgvT1YSckSZRGi6SLOUiOLMFai8ea13Cfze8A6ky%2BrX6jGAG3ruZPLqTRnvhhls1Xtb1Ijm7lqrkXUlMJXM2gG6Mwp%2F6bywY6pgGGou31uiNJcbaYC4YvM3bkYoE1YZjSsEwgLF8urk%2FOekqwETTzD5ry1ekeZMlPknDjRhjnIBHv0uijYl%2FLTAyl1Vcn3daFu6gc4DloBBY%2BAdG7TmK8sY9rkHCo%2FNGPxBj5LhbQBkMMaQJvanh5zf%2F3sP0UhBdvacuQkMmtz1HtjC6QWIWQnOFY%2FqI1%2BoT1FHV0vlApAilWuHIwOrQPhNrDWyhlgoLY&X-Amz-Signature=90d93d1728ef42aadab6c6733fef594135815e2fbdf83cbb03c965ce8f2af6e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622D2LXF6%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIH2vhae%2FB%2Fjis8YZswLlEovr8Uyl6qM6Nxito2DfSsN6AiAEpoal4U5MUDVxIMm7UWexstmypKcuimryAEh1kVLEeyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMfK5sLroc7UnXdUWaKtwD1c6Qq4mimjjZnVkPwnCV%2Bd7gjZYhSpv8nneRDRuUUyuWJwFBpsuieI4yB98tMlGECIJR%2BNpSQ5lp64tZ4M7GCGrRZd6bZNsEYqO5CnO6g3MElb8P9ZePgfwgEkZzSLAhLoShl9noScHellEaPOb0tV0a22v0GTJMIhRHqvfTwTA%2B53uODXLXmuaW544zeRZM4ZCBeLKASbv3x4iFkVfgiijqPt6QjfVCHR246aOij8S5hLCrDj2B5v6l%2FZys29qxfDvNulAbFscDF4caknSdzCQ4FaA6%2B9WkX3lJ7B3cMEw3u9F9FgXR8gcN3qKQFzoT6YiHJvS1y6cxFS4FsBid2S6Vc0jW3ZvcLz1JazuSPNRsjoDJSkiOLb%2BwzJJfnvdZcwKd5qlvfBnPRXbid%2BeQjIqvJ6TLxokY3nTU0bQFT3dFh%2BAIJHZCAxQ8NYRfF3Cb11M7KH8QbnZa5MAqEFx7C3qtZ7W4x5cyp6wrt%2F%2BJ79MYXUPjTpYB3pEBIWFpHCpj3MpPhM8d1A%2FfHwlZ4RsE1FNbeKjiKN5e1%2FMEgvT1YSckSZRGi6SLOUiOLMFai8ea13Cfze8A6ky%2BrX6jGAG3ruZPLqTRnvhhls1Xtb1Ijm7lqrkXUlMJXM2gG6Mwp%2F6bywY6pgGGou31uiNJcbaYC4YvM3bkYoE1YZjSsEwgLF8urk%2FOekqwETTzD5ry1ekeZMlPknDjRhjnIBHv0uijYl%2FLTAyl1Vcn3daFu6gc4DloBBY%2BAdG7TmK8sY9rkHCo%2FNGPxBj5LhbQBkMMaQJvanh5zf%2F3sP0UhBdvacuQkMmtz1HtjC6QWIWQnOFY%2FqI1%2BoT1FHV0vlApAilWuHIwOrQPhNrDWyhlgoLY&X-Amz-Signature=90d93d1728ef42aadab6c6733fef594135815e2fbdf83cbb03c965ce8f2af6e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWOCJQBB%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T025702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIEIiG6XgiFGa3JOETRIN9xnOR1v0PqYW63wQ%2FRrwtnyEAiEAw6SdhiSb83zjpDe68DUdmQi193p6aRai1zMWLCn2nPUq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPcPVCqBDxnRkk86fircAwKbW%2FP3vMK7UI%2FA34loQyMmoSaJPiKXLyjuHeSnsJ4FpNLaJeX1nE0AkLi3Cm4e6Lx%2Ba6VhUBR6cqdu6HLGOyuNZlRpcYlo3KRY39J6bc96Wb2MTBXQjN2WR%2B4dF78tXLekbKxhNyzGET%2Bus2I8rhDubThjDFxkJlrY66EN4OOY5NIC9OI72GWyru9mgefVi22Ixke7z1QvyBjm4GyuUr1U19J0YL0lZAyo4ChwN%2FoEPtQ0X7ZwqGysULIP0Z8NCfHOOyTirT4hdxAFhAlSBagkbpCjzFXFbFc1tFEkIoRXSmZ6IH12fgIPic0Y1MhZGiELgwUp90sUkp%2FSSbSLd4tTWGyDu1%2FnSQD1cVV5pGs0JsMbF7NNFVT1SfmkG5LcptojYm1Wk%2B0ljvyViwu%2BQTWXWpzKggZduZoylEB72PspgvQOAxVZcbZtQDpdaPARUqQ9Ca%2BalWLMJdH9ZRvdKzkUEz3kzvpZAeF9WR4gxrxASyXt4tAC74HWHtyyH%2F1KVI4UH8bSRk3emha%2BANZrDHk1KgBMFFLloX8eRZC7mNwIrNz66DYsJv0QG6CuqUJ6z%2BTLjFTsNwRjs%2B4XoNQxjXHHHhFvZBffYGlpr5yuMiZ73uBVB3u47v2C0CSDMKb%2Bm8sGOqUBuZs8OSMTh98vYRlkakjMsh2aZK4FmOTAL1hOB2fyw7cV7QMefWlCa9aRHj0%2BUZoIVsMLZjalsglC8YUjzwdwNw%2FQ0pqKbklXyCeP%2BB9do5wlhLCrOW2FPqqjx%2BBq%2FJDB6O6yYEY3375vDlHqgbOu%2BSSd052H%2B45vI%2Ff44G1Cr02yrQErd38Ynml2M%2Be6QM%2BavDLifR7%2BtMtj1mpOE8mFVV9pd3B8&X-Amz-Signature=a6939ce8309d2d5d2c7ddb5b698a3cda514892e39c942c51aa96579a779d7f30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

