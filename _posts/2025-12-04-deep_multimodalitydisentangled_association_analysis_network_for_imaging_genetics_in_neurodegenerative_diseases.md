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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JWIDC4M%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIGpiDXPNHoa22MVArRia4NXmeFisXt%2FP2CNsrg1R%2F1R1AiAZlzSsFBoZ38Yc7e%2Fl%2FbE6OXAQq3kJNNsFuzzdG4li%2FSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMAZ4Nzqg0VhXnwAkAKtwD%2F4J3oNyvIsvfir70Lv0gKos5vhxPYd8JHymMSiWklrhkmD%2FhMA7P%2B5KTVFKBDSksKfojAtsN3UOyrXWHxKGdk%2BKi2eohUelomM7nxxgPzluRFHvKf4Zw46Vz%2BlKSiNLZF%2FIq%2F17O%2BICWdaDt6MwHow7La9A5NMZcTtS8s4HRtVMLnYatrQC4x9rhtrMgYikXxrF1yzdj9R0ZGUCLTbhNMkngDe43jSiWBs2ZXGEKvYnQlHGmoIerPBa2bQePIvcxPWthoJJ3aGLAzc6oJaBC5GlNXNEXnc%2BzbLW6NlvvXgvvEY0Mic6ghnmwk2Sp8BlcouyVoDOpD%2FiMMqo80ZTnGvHVIE7kgvQrrQkszE9ErePSGqHI6QLkgIVXav%2FeFqiWOreH5typ0U6bEuWAij38tD7DLILrm9eiQqgNgKt0meM2fiVf4bGbLP93cxGprKeAUy6D1NrnlVZoInRSOu%2BIb6lqymBjijHb9IRdmRW75SfIYGYgeHlKNcNB45YeGoeKEyEYxj2mz5CGCbcAXaVvC07zViIMA8IitN3gy7YmHHVRQqj0vjxjHtBH7pMaPaROHfTVjEw%2F4Wfp0eQXblK3r3JQ1o9rUc4toVMDyy%2BTgdPPI3RetBSHS6huaTgwhZaSzwY6pgH6xxPL7ma4APBGQjYwMNSfUM%2Bmb0oluEs0KXlUGAkSJhYZaADxjQ6RHVx5Z6bWyAxYtNsjaFeYpqzb2JJXKyp61w3CFzdyeiJXzUzAKqY5y15Wqt49KTFclBGU6qZNcEODM9rvO1oqqm7hum%2Bt6T3HTXhL1IypONvDg936RNTwzbvEOuMQYgsdv7dIzrkzKFdxPRdFubL8%2BTJH88PrkkMCHPPtylUc&X-Amz-Signature=6e67f2de94da13462cb121b15c3c02e44f274b183a250b3a8f337472d3401762&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JWIDC4M%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIGpiDXPNHoa22MVArRia4NXmeFisXt%2FP2CNsrg1R%2F1R1AiAZlzSsFBoZ38Yc7e%2Fl%2FbE6OXAQq3kJNNsFuzzdG4li%2FSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMAZ4Nzqg0VhXnwAkAKtwD%2F4J3oNyvIsvfir70Lv0gKos5vhxPYd8JHymMSiWklrhkmD%2FhMA7P%2B5KTVFKBDSksKfojAtsN3UOyrXWHxKGdk%2BKi2eohUelomM7nxxgPzluRFHvKf4Zw46Vz%2BlKSiNLZF%2FIq%2F17O%2BICWdaDt6MwHow7La9A5NMZcTtS8s4HRtVMLnYatrQC4x9rhtrMgYikXxrF1yzdj9R0ZGUCLTbhNMkngDe43jSiWBs2ZXGEKvYnQlHGmoIerPBa2bQePIvcxPWthoJJ3aGLAzc6oJaBC5GlNXNEXnc%2BzbLW6NlvvXgvvEY0Mic6ghnmwk2Sp8BlcouyVoDOpD%2FiMMqo80ZTnGvHVIE7kgvQrrQkszE9ErePSGqHI6QLkgIVXav%2FeFqiWOreH5typ0U6bEuWAij38tD7DLILrm9eiQqgNgKt0meM2fiVf4bGbLP93cxGprKeAUy6D1NrnlVZoInRSOu%2BIb6lqymBjijHb9IRdmRW75SfIYGYgeHlKNcNB45YeGoeKEyEYxj2mz5CGCbcAXaVvC07zViIMA8IitN3gy7YmHHVRQqj0vjxjHtBH7pMaPaROHfTVjEw%2F4Wfp0eQXblK3r3JQ1o9rUc4toVMDyy%2BTgdPPI3RetBSHS6huaTgwhZaSzwY6pgH6xxPL7ma4APBGQjYwMNSfUM%2Bmb0oluEs0KXlUGAkSJhYZaADxjQ6RHVx5Z6bWyAxYtNsjaFeYpqzb2JJXKyp61w3CFzdyeiJXzUzAKqY5y15Wqt49KTFclBGU6qZNcEODM9rvO1oqqm7hum%2Bt6T3HTXhL1IypONvDg936RNTwzbvEOuMQYgsdv7dIzrkzKFdxPRdFubL8%2BTJH88PrkkMCHPPtylUc&X-Amz-Signature=6e67f2de94da13462cb121b15c3c02e44f274b183a250b3a8f337472d3401762&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTVL75LA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIFeazLLGb0U6id00KrBEBXNJk407lOoCHjeeahVyuwLiAiEA9BuDRxXvgh4wZ1xNKN9BGqIkOOb1LbJRX1ia6Ul2i3sq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDI0jFyaTkMQWByhSASrcAz6uBxQIMv1nsKF%2FvXkKkRwJJPpNkLa9XRP2IJpTnoC1C%2BLMX0zgf328N0GqF0Gg2IJj25dleK%2F8cmQofP0bGtaD%2F0%2F%2B8cAc5Z%2FZWbO2FZfa0dqUuaUWngnqTleIbpHM0DFC3lmJUYTEfbKdyjh1P6IZo4w4pzylB9AmX3qedH5nni92YlNOvn0uDRQMZnqKT45VhGFKpZ39QDUlMUZFW7c5ZeXVk70Srdz12hDRIAF3%2FboQJUNnJ%2FE9r%2BmG8EVVulpsVJJtel5IqADUTGF4BVtNh7a4FrpYHrKvzIIw4UXsTKgpTCsi5NhOsUqWARr4YnTlgRmhLxXJNnhlWKTZQOgnwkC3NzsBePyJMAKz2wohMra4EojEHHiMcet%2Bi5wb9wJ7yFvAPNmq6DqcaLW7q%2FKlW8TwUziR9msWCSp6Ou8lDdzBmB55tYOWBWzO4U2BpJW%2FKLQ%2BEE9LTd%2Bk%2BklGgL2NApJ5hsIScKJhd4d%2FZKcpvnF%2F1JmrTMykwvGFXpECz16wvUFlI6ioSlY8wcmnfW%2FXIDiFo%2BhUgRCsljKB62d%2FM3Wb0WUzF3iD6eMJsD6cNJWAjAWrQoipRyvm839UVDCv9Pl5TiU5VXOGMtISYldwMFMDHwb3bQigdkYSMMGYks8GOqUBuL2wGXuEa4keOE4izTDcnfnpJdy2RDYi2R2v0r7NyprZKA7Xo2c7O5CHSHXSn%2FLbEmz2SsdSSR6fAMDfAh1SzZdmteqKn3poHaqpuBi9xemZBbi%2BZRnPPuhnzQhvKhTDo9bcSpRLUqK6yZuXTrinC2dGw8u%2B6OPhBoBDBGoUw%2BABUh%2B9cU7guBZpOYBQGHjLXAloPyaf%2FFObi4g4LwD5zzFCVqiA&X-Amz-Signature=1bde6283559a7deffaebd47d385b9befe930311f5ba19af12083b423c811dd59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ARAFKZB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDAH4ZInt0gVNcTrjSu2ev75DPdB7s%2FH09qKC4dhisqoAiBlTGSqiREM9L1VGkDz66JZiG%2Fn1T2GULiJtlbAK2fNwSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM5q6rgkw2cUjwl%2FcBKtwDDIdA3SttwUHY54y2KjMz68vo7SD%2BAaJIft57PHWjxXoL95YxyGT3Gb5vf88%2BtQWHSEWEEvvej0x8BcZJnJRGnEskOt9zcUWVxXhj2NGaB6%2FxWQ92dWhA9Qhe%2BJ1Ow2DqJcmjJqMALQytAhiNv5rsb6bcEpgPS9wEp4DwtNwd1jr8EXr6I%2Bba052%2BdazRVM3HXZXOdIQlwjvqxK%2BtZKQUBZDYaJprQ7cE1BigCqme%2Fl9ehE2C8SOrfjPrLFL71cJQB6C5m%2FadTEz7gZqhM%2BR0g3ioqxqvnYk73ehEPZ6OoZdEJnibcc0f7btaEDDRlBp2czbuuFaGNdD9dpbtcFZEO43qCic1klQeBdK3C8PJqbtANlw4NqsXOIV7uJUMQuCHTc04vtIuB6aFA%2BVF9epFXzCPF3oxGNtBlbZmJZzO2SWzlLwUNQdD4coYcU6jJ%2BowtdMIlwNQl%2FTArmVXErSPt6zqojsnYolZl7KkZc3n%2FUus8K3tgKuRGnFhTf3dFAEmHl%2FRLsy5WcDewCrL29Fq9myfYf5E7Q1CVxxEtuabXCTOAkRhi2MQaYtIF8aTYXThP%2FbwsKr2GuZzQ681Vf37uUmXMfuv8vOlVqdWLeUsmJ7axGxKdhjNDYSN78Uwv5aSzwY6pgFN7biTIpL6XQCzyX5ryrrwb1B3m0ZCenYxGMt8GC1pLc6iT%2FWSI3c1Y9QQi957aK%2BfKmIdIO71bj7gqu5Vuhny%2BpzQqq1zSLnJS2KoR9IOj7H40whnQBWcrQ4EYGKGGHcuLZ%2FJCuaLgfDpvRRAPS0Pxfjowg1nUEiXvcdB%2FeOXDgoHCVLhdW96GGHKyXv%2FGzBBxgGuTuWp%2FHjToyttkhC2PkRTwTq4&X-Amz-Signature=7ccbac99a66b0b4432af3d1b5eeb2f89d4936ffc4398d146a14cdc1f2824a8f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ARAFKZB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDAH4ZInt0gVNcTrjSu2ev75DPdB7s%2FH09qKC4dhisqoAiBlTGSqiREM9L1VGkDz66JZiG%2Fn1T2GULiJtlbAK2fNwSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM5q6rgkw2cUjwl%2FcBKtwDDIdA3SttwUHY54y2KjMz68vo7SD%2BAaJIft57PHWjxXoL95YxyGT3Gb5vf88%2BtQWHSEWEEvvej0x8BcZJnJRGnEskOt9zcUWVxXhj2NGaB6%2FxWQ92dWhA9Qhe%2BJ1Ow2DqJcmjJqMALQytAhiNv5rsb6bcEpgPS9wEp4DwtNwd1jr8EXr6I%2Bba052%2BdazRVM3HXZXOdIQlwjvqxK%2BtZKQUBZDYaJprQ7cE1BigCqme%2Fl9ehE2C8SOrfjPrLFL71cJQB6C5m%2FadTEz7gZqhM%2BR0g3ioqxqvnYk73ehEPZ6OoZdEJnibcc0f7btaEDDRlBp2czbuuFaGNdD9dpbtcFZEO43qCic1klQeBdK3C8PJqbtANlw4NqsXOIV7uJUMQuCHTc04vtIuB6aFA%2BVF9epFXzCPF3oxGNtBlbZmJZzO2SWzlLwUNQdD4coYcU6jJ%2BowtdMIlwNQl%2FTArmVXErSPt6zqojsnYolZl7KkZc3n%2FUus8K3tgKuRGnFhTf3dFAEmHl%2FRLsy5WcDewCrL29Fq9myfYf5E7Q1CVxxEtuabXCTOAkRhi2MQaYtIF8aTYXThP%2FbwsKr2GuZzQ681Vf37uUmXMfuv8vOlVqdWLeUsmJ7axGxKdhjNDYSN78Uwv5aSzwY6pgFN7biTIpL6XQCzyX5ryrrwb1B3m0ZCenYxGMt8GC1pLc6iT%2FWSI3c1Y9QQi957aK%2BfKmIdIO71bj7gqu5Vuhny%2BpzQqq1zSLnJS2KoR9IOj7H40whnQBWcrQ4EYGKGGHcuLZ%2FJCuaLgfDpvRRAPS0Pxfjowg1nUEiXvcdB%2FeOXDgoHCVLhdW96GGHKyXv%2FGzBBxgGuTuWp%2FHjToyttkhC2PkRTwTq4&X-Amz-Signature=763fe42671fa1754547e1dc81367e864f6865bb74b98c89644fc96b00eecae2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5KFWUMQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHO4Tf0eHRPB26nbiq3lEXyagUgeMRBLdVxwrCJ6T4t4AiBIz0rBOsDL%2BxGY%2By6IprXv%2BiCcDypyh6%2BZwzG0D3cFvSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM9ucdwyUPQuxCOFt9KtwDTUlylkNo7ozsDtgRVnTnEmHevSteN2q7B628B5ftI5gQ5RX8xDGTkQ0S0jFZN3hVY1tyuembP5EdhXPtLdhcjBiI5O9ygBlT688hdvmz2z72UBAgz9Gjjn7oTeAhaISB3GIlwpajFJcB%2BsIS1whbvf3byWCDAIATcZJIAj6oGQbeBh9GwNL4uJh4E8QLoCjjhCOzx0Aan7AsW2LtOgaRrSJ98zfHDnR%2B%2FQftFM5x4u%2Fqo9Pmf1MS1cBPjPIO2YTCcczmIkIDYaqCavvUHnZHcomn6zydY%2FkRAebFrGEhiT21Zys1BzDSV%2FUNIku8LpSvpa33Fzzh3V9XH8CKFYj8%2Fw9%2BfL7bqXGscLLr%2Fbv0IPF0SCZp2cWCPHCNFn2bAs3evXvfK%2F8RzxceaIFXdsaELPxk4FjcFQ8gcKXTSaRA3ZlSLHFXLMiBb3PYLBIcZy6qFJgXpLVNf%2BkGc54bvAbIFFxEOmCPDdGPRrIT9i%2Bx0prtvU1LGvYIMvmzARl4OsUtzMr1uY1d2%2FqqjP0pFShnDbWJ%2FzPs6rTCWe6f9qzfke3kLH6S2Vnu33mfaFProZJw6BOnaq5Webump%2BfpsVI7CSAuDEHsZsg2cpH4hAGv6bcZX1CZWlM250Z7E0Yw45WSzwY6pgGNYqS1V73x7nc6B11EbE%2B6nAmR92iWbdQiHCFutTNRDaJ4FySUu8Qde9za64FU9%2FIYNCD4qjLBYGD4rO6DJJc7F9lWs6XG0LPEf3do7wpz2bZOxKCsOqMZV4yalN8bWo9ZRXVN9OOe1uPVdETbtYM9%2BzIggoolrY%2FIsHv84iYtDmIb%2BTLZ7i6%2B0k3SnVZkf7HGqfRGLuYoi%2Bsq788loh4cVmGT2uXu&X-Amz-Signature=306d5debb132328eefba0ba284f0625cadf6f4198fc41272e966c2a24f9eb5ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652WCNXOX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDxeKlWSfraGK3YUoxfKDqBGjvgVzUBZmqCuFqMWvXZOwIhAPtvnXe6%2FQ%2FzPKS8Bsd%2F%2FZ0uz1ZkalsO33MIvxhClBW%2FKv8DCAEQABoMNjM3NDIzMTgzODA1IgxQEg8xHWNVzjYXjZQq3AO3FcKH5GJ4XwqdJ3582gOX3YoWafXcfNAEO9vTZz1mTm63iSPEnd6GmDHItM322%2BNoRjK7Up7Se6NGJ6%2FZWylgGG83J%2BgXBLxJXNk9et82PZZsVGHAtCytVdVIoFwKHE7vqmhcHMaY9fVbsCrSDbUZRP%2FuFBeb2%2BjkXiLY4n9mCLeDO4%2BoUilI1%2FK3yZV4ZN8oeRPpMDy4yCfhWhFe76ylDVe4esWcTSsvthRGJHT01Z5XAgp1hDac1OSnVEvCqA4KieuJwzHdYzyV7nW4%2Bh1gA64xcBwPozJBsE2dbaJj7109m6RY%2BkYqFyScp7zon%2BPYlBAdgqMlevsOpZmLM02BFJwfTBvMvyf%2B9DD4TJUeek7ARX8R%2F2sx4ZFp%2FQDuZm7AMSWq4yZ1i1F2aOGzM0RhCULYWUHqmL7oCH4xcRLTuavRINkqRnxVyW54c5Pz6YhtxbWTRqfRFJguEk%2Bz8Em5TuUl%2BK3IfDMht6tX2XkV77j4Yvy86ie%2Bn1RW0EDSz4kjNl0ioURMKXxX6ocdW%2FFCKjzhHK2elAbvh%2BfFOtns9kkish%2FQsS1VQZPqfm4RMnK7X7rcB5qAuKMgYaXUOA0KVrlimlKJtE1or61GaEo0IgnchBCEbwQ9H23M1DCCmJLPBjqkAZSqoSJcUf7U2LjT%2FRwiRgnOGSP8j5Y0sl%2FZ7%2F%2BBqJn0mnIg5HqLUk%2BI20FBLB1KrnbZ6WEyNlffdC1QBAKi6fpgNsLc3qqEFoJJ27xWXb4TpXD3errXoiCSN1bU3KC9BJEgc6O2Z5muICeQMeRtrVbO9w1L1FWSFULc37nAPnVEN8yBq84xyZt9lwjHFRZM9vAH5wGe%2FIqP7Mq2k0jXH6PmJX6N&X-Amz-Signature=1d5769f1b996232cba36bc6375472715c64723972f6cbe30fe90c9b779beb629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPIKWDQB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIBEtcHOUmTKQCf3SbySw%2FAASmYqszXIy2cbcT24XP11TAiEA8zO0J6OiZKBROr2Jiy1yoVHCZh7CHeySOnY0SvDHuSQq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDIAOP%2BwUOwauCzOoMCrcA%2FDrOV%2Br0AhmtS21USV5OdIJuBUDCJNK%2B1qRQW%2F9tX49tG5n5XlzzYK6c7Llw0EGsuf1twOh1CdvJJhMFhbPesumt3FRsEOkSi5ggEOBHHEZ4BzSCHb7kJblGiAD08ykdAFA3bQ2%2FjGwbZ9EErKtWonK53Oz1bvgGNStW2Ntd0jpytQrldivC2hIQsa1Mnc1axtSByXmzzSy1HLMSvNGjXl7qcoEYIychcSdcMR4MnLpMRTSPFqLP9wGGjfHtSpBstSL0NaegjBVUBhs%2FW4M%2BMfSJ2g3s6UtBfqOAXHq1wmubsorF7PDUUGd1zB%2B%2FyMwKSnlsZ75%2FL2%2FCP8%2FfEJFQKSIgGzNxfGnsZ4xf94W%2FEruEawQaSP0HrySX%2F5eBKIvvD99MI6qVmy6MQR5Tz%2Fjau2Dnuila5jvZ0q%2Bfz0t%2BY2cyouzh7MIs96sA%2F50awMQWnnk1AT4OC8p7cnjL4tfXJYDBa5W7DqYXR4YAe2lA38dhbAWy8LS8fTD3eYGI0RgdceyWP5nMENV77LicmulD7Q0E7eAEVSdml3DKTxzJ7PI14Nyzz6HZQ%2BPv9NA6S9sYTfmibH4Kq6c4ogAQYPx6ozI5EUdyfFVuybKAdq1C265ry6hy%2FOwLSRdnAGIMNGWks8GOqUBh8I9ytRQIEy9%2FPDEWWOmBMK3PnRYNzueMd%2FOhz6ivpbZU85SAjHNC%2B82eSm5CSwoR%2FaRnyCFC7Np2UJc1aH6gg3FhgIZ%2Fy1mRTvR3CSyFG04zd%2Fd9wnuoIyFW2C2pgzoBEr27C9Vvti9D7YThFayjLJOcYSfTvKPnuGh21xfUd2GV81hiGoM0XQ6RsaZ6AcTAmuSCRlpUPNWnBKBsH2qxPHUE27k&X-Amz-Signature=352a8b0118b1f5c43f4c062635eabcc5ebb2a77ffded0284d9ddaf2cd5b3179a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AFZ47S3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCj9%2BY%2BmLYFR1%2F4it%2F3xzb71lQXpzxY3mCngaO0iCowgAIgctarFQK7R9joqWgKkXANiQbxvF83trbseRjE3ZZbLxwq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDC5%2FnUJ4bkrQFCSGQircA9zjUHOwpVga%2BIYRpqI3hILmeXhisxTcelSSqMW%2Bpe9w01DEtRWb%2F%2BeH5uJqrko5zIAcpHV7%2B6QD1fLBYjnVBLOJoYMp6BX6rDhEazC20yRd1jhAR70uRWAsDjyNrhRQsCm8IvW5lzwlpKTFkWJUxsSkfpa8Vt2w7itBuGsadxoNrjb6sFrtzV%2FkNG%2BTQupPcVWu8AQu%2FuWBqIJQE%2Fy1hWB1JD%2BVdrpaGrPol%2BBMQmyXijh75j7E1j14QVJZ1TyiDDH8Om4r%2Ffq1z3QaiY7mr%2BBzFj6T4yKebwjOelhe%2FCouVR2Ov6jBav9uO7f0GwUHZC41KjAjrWibfJvdfslVpVsIXb5tmEi9NgKYXSzIr24DszVi3AzR%2FvA1uikq%2FdIGBUH5AXVQJ48hZury0aOip1T4lOzcSYleUmHg4gKCBHRt3j08pnanHoo8H%2FvMgJeVEc1DARqEDhnm9cDsXyT5rAheQnTvP2PzdDq4mVx%2FpQG5ZJMMWvJ0axe1hwuMzZyVjclgeu%2FDD0Mst3w0ZWu4XKG1XQaVTB3DIfW4wTjpJE0W8S9x%2BmJvJTv%2FD5G%2BJXMOjIUitr%2BTlRuHka%2BBg9l1IWGyqzwacuhyE9736BLvs7Q9QumV0LkO5PQodWTqMMCWks8GOqUB8CJXZqebitl8K8GNrDWS5o%2FaBdlw8TH3qVHB%2BF7%2Fa03WK9iCP1m1licahtItdRYmI9tngqF0gnzxIcWPaxuGN5y5%2B93B5ryqV0b9W0d57rICpKeNvGw2mh72AjSIe4qwubvzOfUQTd0SSh3Csk4xjGV3%2BFpGqRxXyjmZIl%2FP5v0rsAMDep%2F3VkcDIuRgH2nhA2833ocKPHhcM1XYT0j3v%2F8JaBfy&X-Amz-Signature=a327c9eca3817bc5469a487179a648ddc5bf7681d5402b7901d661af01c37911&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AFZ47S3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCj9%2BY%2BmLYFR1%2F4it%2F3xzb71lQXpzxY3mCngaO0iCowgAIgctarFQK7R9joqWgKkXANiQbxvF83trbseRjE3ZZbLxwq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDC5%2FnUJ4bkrQFCSGQircA9zjUHOwpVga%2BIYRpqI3hILmeXhisxTcelSSqMW%2Bpe9w01DEtRWb%2F%2BeH5uJqrko5zIAcpHV7%2B6QD1fLBYjnVBLOJoYMp6BX6rDhEazC20yRd1jhAR70uRWAsDjyNrhRQsCm8IvW5lzwlpKTFkWJUxsSkfpa8Vt2w7itBuGsadxoNrjb6sFrtzV%2FkNG%2BTQupPcVWu8AQu%2FuWBqIJQE%2Fy1hWB1JD%2BVdrpaGrPol%2BBMQmyXijh75j7E1j14QVJZ1TyiDDH8Om4r%2Ffq1z3QaiY7mr%2BBzFj6T4yKebwjOelhe%2FCouVR2Ov6jBav9uO7f0GwUHZC41KjAjrWibfJvdfslVpVsIXb5tmEi9NgKYXSzIr24DszVi3AzR%2FvA1uikq%2FdIGBUH5AXVQJ48hZury0aOip1T4lOzcSYleUmHg4gKCBHRt3j08pnanHoo8H%2FvMgJeVEc1DARqEDhnm9cDsXyT5rAheQnTvP2PzdDq4mVx%2FpQG5ZJMMWvJ0axe1hwuMzZyVjclgeu%2FDD0Mst3w0ZWu4XKG1XQaVTB3DIfW4wTjpJE0W8S9x%2BmJvJTv%2FD5G%2BJXMOjIUitr%2BTlRuHka%2BBg9l1IWGyqzwacuhyE9736BLvs7Q9QumV0LkO5PQodWTqMMCWks8GOqUB8CJXZqebitl8K8GNrDWS5o%2FaBdlw8TH3qVHB%2BF7%2Fa03WK9iCP1m1licahtItdRYmI9tngqF0gnzxIcWPaxuGN5y5%2B93B5ryqV0b9W0d57rICpKeNvGw2mh72AjSIe4qwubvzOfUQTd0SSh3Csk4xjGV3%2BFpGqRxXyjmZIl%2FP5v0rsAMDep%2F3VkcDIuRgH2nhA2833ocKPHhcM1XYT0j3v%2F8JaBfy&X-Amz-Signature=5e42f4a160788041e9d0cf29bf083a83936c62343e63f3503b55e5ace4e8f4e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7N32W2P%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIHa5JSssIfVa2qkcBUvJQgpeJpexDGqJdciGW%2B%2FEMRqZAiEA2TM5o9Et7e5RilNxXPGYTrhRxJK2rk410kBtMeaP7TIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDKUloR0BgCzeUtEy0yrcA9Q%2FJHts4D7Ys5f6bC0jmysnk3On9GnuDoI9iELh0pzfvvij%2B6WWZRKiS4cPRq4Np6ufA7zl02Mgja%2ByqWoSjBcRiEdG9pzjOjomMwP7l0ju4WA3BOtSiNsLa68dWGEXSetfDgyCKObjU7deaKNNSvzAD4A3r0uwefnucOgYT3DOkc7Ckd6%2B1CUybVoX4XwDYKJtENV%2Fw4XZHBy5SIvbs9XO7jQRAOaLRkHZaOSl0TFijkKcTMyXSUDVFmm%2B5iNVUgd5JAuaZx4gdPsApL5xWZRG8xwxUWuDI7Vs2ssOkFejf5n9FEcB14mvTxQ%2BPFgO0Nl%2BcOLT9Pbr%2BlB77suqsiXxt9mjc0E5ZhOWVbPetG9HuBDxK%2F1DlaO2gBnRD2XkXctyBi4b8AZour0zQqrzyDiWkNKcjbESbQ1rq%2FnOD%2FnHk3xjSSr6XE6%2B9xkwNN3RwolfKE4cag3YVomIArm6hhryCEVeVUUsOOADFo4LDUkqWqebcNoBIAQFMo3cXAuplx32RqdBGIKgMJT8DCuUExBkiQ4cI1i39Fbcjx2uiJCTylrid2HH2AJfte31IYZ4KmEhaqszrEML8fWljh8z9maLsav3BnPEDO3P%2ByQtdZYkkeD67hYt%2Bftu72xiMO%2BVks8GOqUBz%2BoznbqNL%2FDYByjz4YaMkRFS%2Bs21TwNrexQr9HnVcT2Xjgc2FS3jJa8l%2BeFP3i6yLkA1RkcVcHzpEtqEYf558p4qJzXOkbgrPgKTcZGYwWrif0lKYn3H0Hl7vLqeXDnpQED794SwhnrGhA1fFGm%2F9cUzA6HN9bRiittHiNTe43dE%2FyaKXtGYhHYU6n2ZHA4Naqz8vpdB52GjfPTE2R%2FxKW6JXC9A&X-Amz-Signature=f962baf2b8cc2eca5122f494b00f0f5cc0ea58383c89577c778584201c154052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNPE5L7I%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDmCUdf3itoOc3zxyKl%2B1mdhDI5Ymc8GvA9RALDCHLcaAiAkljqECfEixiI7kJlRybRkn1oDHB9ZJaBi2cPBzvDc3Cr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMGW5g1AlaBaNcHk%2BWKtwDvzwyVJPznMBRU3B8diTk%2Fdsool84WGLtuYEzdgdYjJu2taXUrP26WBccVnCtHkfjjfG3ao42icIv5u7VKSSHo6jI%2BRy79pieioGgCkyDV3nvm8q02mQtkY2Zo7830OoMFoqBGSmUCCCYdnmRlpZvpZcAlFDVAIgF8eGR1ovB6as8KHuqqEuwcFQurfCUK4sTZm1nItXWONmiZOJ8LBfhU%2FJuJj2TOieD27WKuw5NhkpArewe8F6fk9XjKLSvMcohDwEddxho9DVG5z2BVGJQrJdsf109pd4BJVO4WKLa8Y8OLbZcJnpOL72kLmkI2vik6wx6eFx4oYsxuyta09%2FhuiZRHE3BcT2%2FivngPG%2BO6Uw0BfsYs9bF2ClIOoMQd1preWxCC86zSPweN09RUO6QgUj6A1a77bBUDa3XeP1GL9Rqk9M%2FFbvmNXRGVQe3EM6h9LgbV%2B7ONNhAsS5IcMRbnVqjSObsnGMfA8WmXiVdQWQQL2c%2Fvp%2FiTV%2F4ed9da0Fyv0kPXCYlMsbH%2FDC1%2BHR093SP4TEhSzR3g5zo0Vzvq82HwVLTCPKZAcvwDoo5K6YJGRocb7XrY6VpEmMq2gFVA2N1oHaJsu2K2PTvZ9yQD7EUD9WVYsUE19gOx2QwvZaSzwY6pgES9cvYFjFw3f78bxJ0IxZoyYHKJyKoC9rzWuVtz8J3CR4HO0WXW8Y8M98YWevY9CxaBhZ%2FvB%2FgiIzWo5lDCaX9aW6cdLgD94TSadEekjYG21AtmqKrFV6EqISS67xA1ZRwUBO9yi6NTlpnLVmYG33sXovWtK0bmhRMbJzHb8K0oHG4%2FQ7fswNUoXY8j2wws4oEhiQ%2BG9gp8zdzvvwO1KGA5Nt47A4P&X-Amz-Signature=547ae59dbf33c34c2766e8ebf20070ec1c6e66ed66235c410f3b6b5d252a8b05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNPE5L7I%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIDmCUdf3itoOc3zxyKl%2B1mdhDI5Ymc8GvA9RALDCHLcaAiAkljqECfEixiI7kJlRybRkn1oDHB9ZJaBi2cPBzvDc3Cr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMGW5g1AlaBaNcHk%2BWKtwDvzwyVJPznMBRU3B8diTk%2Fdsool84WGLtuYEzdgdYjJu2taXUrP26WBccVnCtHkfjjfG3ao42icIv5u7VKSSHo6jI%2BRy79pieioGgCkyDV3nvm8q02mQtkY2Zo7830OoMFoqBGSmUCCCYdnmRlpZvpZcAlFDVAIgF8eGR1ovB6as8KHuqqEuwcFQurfCUK4sTZm1nItXWONmiZOJ8LBfhU%2FJuJj2TOieD27WKuw5NhkpArewe8F6fk9XjKLSvMcohDwEddxho9DVG5z2BVGJQrJdsf109pd4BJVO4WKLa8Y8OLbZcJnpOL72kLmkI2vik6wx6eFx4oYsxuyta09%2FhuiZRHE3BcT2%2FivngPG%2BO6Uw0BfsYs9bF2ClIOoMQd1preWxCC86zSPweN09RUO6QgUj6A1a77bBUDa3XeP1GL9Rqk9M%2FFbvmNXRGVQe3EM6h9LgbV%2B7ONNhAsS5IcMRbnVqjSObsnGMfA8WmXiVdQWQQL2c%2Fvp%2FiTV%2F4ed9da0Fyv0kPXCYlMsbH%2FDC1%2BHR093SP4TEhSzR3g5zo0Vzvq82HwVLTCPKZAcvwDoo5K6YJGRocb7XrY6VpEmMq2gFVA2N1oHaJsu2K2PTvZ9yQD7EUD9WVYsUE19gOx2QwvZaSzwY6pgES9cvYFjFw3f78bxJ0IxZoyYHKJyKoC9rzWuVtz8J3CR4HO0WXW8Y8M98YWevY9CxaBhZ%2FvB%2FgiIzWo5lDCaX9aW6cdLgD94TSadEekjYG21AtmqKrFV6EqISS67xA1ZRwUBO9yi6NTlpnLVmYG33sXovWtK0bmhRMbJzHb8K0oHG4%2FQ7fswNUoXY8j2wws4oEhiQ%2BG9gp8zdzvvwO1KGA5Nt47A4P&X-Amz-Signature=547ae59dbf33c34c2766e8ebf20070ec1c6e66ed66235c410f3b6b5d252a8b05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SR3SC3H2%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T084418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQC362cfQ%2BrrhHojXqWbf9pzwq7SMdlWbRTJb5LLxXi0cgIgXzeBvIl4U%2BlbBEbVgtsfPe6WOR5hpKIzlWaIbV2bxTIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDDCFo2gUK2ndOyXIyCrcA4SxGN%2B5S08%2F2l6yaaH6anaDV9Ivf6K6qS4cQ6Dbn9K129ZHLbA0jTg2RhI85b4RGCpclAoiM1RIyEi6%2Beg5TKZ4BwAiD9OAe4npBISvzoYsr5KwDMTvJKgAp1FT5nO2nU9ZRj0q6Uo9gBspgPzUNwZYnCDzCRM%2BnZDX8%2Fynv6EPIM6n9qUQIXp7Pr%2B34EyDJ%2F7O10jhP1x7VFAFgpMHa5iQwkHWGTa%2BJF1u39U%2Bg7%2Bqh73k2Y%2B3XI%2Bzel8X3HbSGRmiNAz%2BEHcvG2HQdSDKmTvdS2MzTLzasm365PCDG%2BPiu2sKitT0O9UT5fXkXzBeiGwEm0kxAbsSIE4YblMQmZBo0UQHgTOlSffu5sC3uCNchCXA2Y3r1DD053D5S%2BHO0%2Fv4eNrXEUQOcyOGPo%2Bh2d2WCAudLHewQujf10aKACnpYHZCLkgW2pYFFnOHjkx%2BrbPesEcPazG4KLc6vhSracy36dPe9nncSFmraCIn5CBQ%2BjthXGYJKvcsFmx2xbUBKsWdtzjc%2BhLXEUn28CbHG%2Fj0MZ%2BbFh1yu8%2Bc2SVCJnMAYi8xhRcAN0EWyilSmP9PiwvER0UyHBEdhiMr4pQLJEb7TtkVDWLhNlmnapN6sNROp8qogk5aLAICmngkMP%2BXks8GOqUBxV6xxYJHWag7OLdS7KAJ3EbIKObMkqdy9OATvho1G2CM9hIiY2Md2Nxw7uw6lCp0iLtzMq6G08feAhDQox7Kgi8EtVSC%2FOttPvMR5TklKO69DlFyNWeaBsEF0oTiRIfXfIfiYG7nK0KXiSdGWsP39NqMhyAESee6Ow5EEPRLH1tmFmzxRLQWZz7uj2EfClGwoJg0%2F%2B1RQC%2FoptL4JFlDekl2CB%2B9&X-Amz-Signature=db17263bedb07575588c1845713e48a6167874eaf49fc72172946ffd7f9cecf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

