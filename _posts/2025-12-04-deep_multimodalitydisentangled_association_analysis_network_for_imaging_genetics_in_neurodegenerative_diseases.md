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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QOBJ7O5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDxDO6RXjxJzH2HPrs0IodvJtFAJKgAErj9yXRlpdkl%2FgIhAN3cSL5beisHrzN58ARPselt%2BFDBrtjVpUWMZuxfbuJeKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwGPiHWAMVt0YCjAdMq3AMxLfjj7I5e%2B1knus6y3%2BidNe94sea2ohCjNY0eb4X8UD%2Br0mW1EnrOUbfjyy22pqcs0q5kBKypvxcGaT86xmOrbKE34lGDPeS2CCAEbaHfmHn4zH01q7ub3GSCBbtx8rd4bBLaIa0GYogOotk1ty5qRZOOywJxY5mxYVlhEezSU3rwdyc6uQCBMiz501QPQfE%2BKVOfl%2BPm97LSrmAEsp76vgaqDSYfdO29OLxAg4utZ%2Ft5r7sl1wqWOVVJE7CgptZALs49MwsA8WCbfObUHI4huP6bkr3P3UBLd0PwD72N3MMixEfktM2TLjVB54GQpOOodqtkS7pYNDOG4HPJ4BR20gobVSb4pyAJrt41mOc8VqAVFcvqnql9UlwPhjs2u9SAakF7G6U6ZGaHFFQ3U%2F6m0RW6Lc0Ou3ISdjvFxNqZY%2FdoTR%2FBh3j2NcuY4UoY4kaLgL0y4TWFRNGe3YA2PCG251DU2hnYLECVZ%2BehJBdrG8Ty5cuyktWGedGiIyjkXgGyw%2F3cDGvRniLEp%2Ffg4LUFSlc8MxinBnkVSJzc4omaJKZ%2Bu7zTZoeH1ZfEDtOTQekeMgZ3qIeWNImfEV%2BLaaEfrr%2FQHCel%2FahoBAMVEIKh0Aeel6RfRyGNxChgojCXh5jOBjqkAYbpkMoT8L6%2B9zNdiJSH8HoDG%2F2wvv1KxzoBu%2BCRhh6epFZwwqoZVU1ngcWxCrdlT9D%2BLL5vaVgLlvVWwvBcIhWD%2BO2y6WTwnISeuq7DiDr1ZSvZR7PDxQ7C49Br07kpv%2F%2ByhJhsyI1EDXe29ETg3EX9LDo8eIPzNddOUFLivvlxeZRvjxcQoB5snQJLoQjtkKmVHQ4yQLYY%2FPEBfRswH6ThyOKx&X-Amz-Signature=12f1c7197f516b628bb0b72363734acf4ff558d4a4e7020801930a4c03158e6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QOBJ7O5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDxDO6RXjxJzH2HPrs0IodvJtFAJKgAErj9yXRlpdkl%2FgIhAN3cSL5beisHrzN58ARPselt%2BFDBrtjVpUWMZuxfbuJeKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwGPiHWAMVt0YCjAdMq3AMxLfjj7I5e%2B1knus6y3%2BidNe94sea2ohCjNY0eb4X8UD%2Br0mW1EnrOUbfjyy22pqcs0q5kBKypvxcGaT86xmOrbKE34lGDPeS2CCAEbaHfmHn4zH01q7ub3GSCBbtx8rd4bBLaIa0GYogOotk1ty5qRZOOywJxY5mxYVlhEezSU3rwdyc6uQCBMiz501QPQfE%2BKVOfl%2BPm97LSrmAEsp76vgaqDSYfdO29OLxAg4utZ%2Ft5r7sl1wqWOVVJE7CgptZALs49MwsA8WCbfObUHI4huP6bkr3P3UBLd0PwD72N3MMixEfktM2TLjVB54GQpOOodqtkS7pYNDOG4HPJ4BR20gobVSb4pyAJrt41mOc8VqAVFcvqnql9UlwPhjs2u9SAakF7G6U6ZGaHFFQ3U%2F6m0RW6Lc0Ou3ISdjvFxNqZY%2FdoTR%2FBh3j2NcuY4UoY4kaLgL0y4TWFRNGe3YA2PCG251DU2hnYLECVZ%2BehJBdrG8Ty5cuyktWGedGiIyjkXgGyw%2F3cDGvRniLEp%2Ffg4LUFSlc8MxinBnkVSJzc4omaJKZ%2Bu7zTZoeH1ZfEDtOTQekeMgZ3qIeWNImfEV%2BLaaEfrr%2FQHCel%2FahoBAMVEIKh0Aeel6RfRyGNxChgojCXh5jOBjqkAYbpkMoT8L6%2B9zNdiJSH8HoDG%2F2wvv1KxzoBu%2BCRhh6epFZwwqoZVU1ngcWxCrdlT9D%2BLL5vaVgLlvVWwvBcIhWD%2BO2y6WTwnISeuq7DiDr1ZSvZR7PDxQ7C49Br07kpv%2F%2ByhJhsyI1EDXe29ETg3EX9LDo8eIPzNddOUFLivvlxeZRvjxcQoB5snQJLoQjtkKmVHQ4yQLYY%2FPEBfRswH6ThyOKx&X-Amz-Signature=12f1c7197f516b628bb0b72363734acf4ff558d4a4e7020801930a4c03158e6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5L4WDTO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQCfiisns1T8Y%2BaHr6lnbTROQskVkLcn0HxXadQ1FyhtIgIgHHHI7hACV6joV1%2BAolR7qBVnBYNPFcA40M5Wk5uQY9AqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAg2xVXmq7omz2LEayrcAw4gOc3g9dgUG605S1JVL0021T5lzAKVITq04zKburaJbGmUF%2BkSYue2CRCu2mNqUeyfRSP5ieI4Vh8OqULXPyU0A5Z7CzlKdXEos9WzVGLTUGv86%2F1KtacXh50JyALVIXcexSL5LqgeSqfnyuHy0ia2BhLUfafH6yKHP8ieN%2FwpMPZtWea9S%2FFLFTNzquPPhVO6zrmrqhi%2BDO8ts18ufy%2FLbe9aXts7BeNC2%2FyTCmFLXSd%2BmzVezhToOqyDucozscg8ShEnN4wCQ1yY1UuUWY2Z4q3JKhOqkjVRNb29ZOAnah%2FP499LcWcaInbq05Dy1qc5D81xYcY7D5QyXt2bWmD9Lyvzsi5hqa5rnp%2BlAmR6SxMWCmIqNjEpeoTpVp9ZqVVTFko6Rvv8XGuvmSSMPT%2B3d1ffgdIp4aKJc%2FAdNhGWi0WoBjAHTI9jLI%2BEuCE2m7RthyOTLsnJj2KnhtS7ctCMNtjH4yKrqrF4oiT4N%2F7KUGF0beSUxKLv9SFsRin7Cu4YHSskhjaWznt1O4Qobla%2BzI%2BLkuZb3Q7%2FbcUBq73kw4YH9A0dGqR70nes%2FyuBisitCm4ZCrlIMw34AZQN4zwLemnfz0DYq7LFAzGxKH68Hw7OhVx71ffWjX%2BjMMuGmM4GOqUBLxb2rCSphLpXrFwW%2BtTVfW3hVQkpODDBW0lsxOZ6lUxyjK3QUU7Zoc9geW5VuOxSnW4pcP%2BonfrEI6l6Hc0mxqAkHJhp5N8AeK9ITd5e4y6hg4i6UaKNN9LRzplIjUXE9cmpbtMrvoGdbNicEB5hmS9Oj8CvlMl%2BfhnMKZjzyFK7a%2FkbFY5Sevfy9%2FDWG0mQZ%2FktiUEI%2B%2BdifCloLFgGcd8YnR%2B7&X-Amz-Signature=482927cd977c4a83f84f83119b24dd811c7143293b51ef3c837950128c1bfa49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XWRQACD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIH3fP7fiHCP5tCaKkTa6T5JlhCa6w0KdTMRRPsqvsvCzAiB9ONFjYGR2RVVJEAZJ9LZ%2FWoUunwdd39PQ6WHCyTHLvSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSl3Xe3RZDM2%2FFxgXKtwD2Xi5L8BumG1PN7EA0NGUXw6ffP0hVKGGpsK2wPkXFoOIze3mFenMI55laTHma2rc8K9gyXq09C%2FLIUT9gGGLflPzn0j27350P2buE7%2BHLgM%2FvNDGwWJD%2FlH8vP%2FCXATxSKZCJVqCfN8aV%2FgWZAnszrozf7qNkngysES700f4W5o87a32X7JQ17udQGt2ShPiMJRDhyYZQuDiD%2B46o5aZyUdNz5dhaYCgkHgU32Ba12QlHmApKIIq%2FNxGJk48MWKXeLRMep6LXuG1Obn28xTr6Hd4KGBoIXifgjtFiz5LjZTBYntzMZM3mDD0ycoYAK%2FwD8aZzIDsbvx6SyiFoXuV5lml1lwqzKvtvJTN13fWx69h5TOUmrFIDfCHrq2efejXp7cf71k%2B0St4V%2BcXspz0ZLN89gGwbL6w7n%2FpD05z0RZxD1XHiv4Xz8aipBSlt41IXiNUQKMlxEM2QCnhnoSFhHn9Tm%2F%2BTbb46epQaR0It9uAdLBdzQVlLlVXMS35zp04MNJ%2FoVRQ0PFmAYIwwpJQ4YKArdaOHq86NTsr24T3%2B96lCRq6k023rDZ9MqCSp1gCazOGzpBmyckyda0bIaqIYL67i5QuBPKIuG8Rh%2Fzk0DLHRQ5xzQfAcGC0bd0wh4iYzgY6pgGZJAjP%2F0fWoHSg0MVOeUCGVxSpmSWQTd56itL%2FlmPY74642lefwhuOpmxA7IOg0PFzGs1mxrSaE7DzKKXc61S3tW9YoIc5JQcHBQFhuV5NDsEcsCW4e3CLZeSqGR5elD%2Bikx4Nz3k8gppmxMHIDytYzu2FoPMowhX7bmo2KjImFzVaaxMaz%2BFDTNaEJrtSEj2z6A00ZjZ9S8NrrqJ1hThgPcWO24Sv&X-Amz-Signature=d11d651897ef321a509f3b99c0851fa9a3dca85283668cc8f40cae5063906716&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XWRQACD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIH3fP7fiHCP5tCaKkTa6T5JlhCa6w0KdTMRRPsqvsvCzAiB9ONFjYGR2RVVJEAZJ9LZ%2FWoUunwdd39PQ6WHCyTHLvSqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSl3Xe3RZDM2%2FFxgXKtwD2Xi5L8BumG1PN7EA0NGUXw6ffP0hVKGGpsK2wPkXFoOIze3mFenMI55laTHma2rc8K9gyXq09C%2FLIUT9gGGLflPzn0j27350P2buE7%2BHLgM%2FvNDGwWJD%2FlH8vP%2FCXATxSKZCJVqCfN8aV%2FgWZAnszrozf7qNkngysES700f4W5o87a32X7JQ17udQGt2ShPiMJRDhyYZQuDiD%2B46o5aZyUdNz5dhaYCgkHgU32Ba12QlHmApKIIq%2FNxGJk48MWKXeLRMep6LXuG1Obn28xTr6Hd4KGBoIXifgjtFiz5LjZTBYntzMZM3mDD0ycoYAK%2FwD8aZzIDsbvx6SyiFoXuV5lml1lwqzKvtvJTN13fWx69h5TOUmrFIDfCHrq2efejXp7cf71k%2B0St4V%2BcXspz0ZLN89gGwbL6w7n%2FpD05z0RZxD1XHiv4Xz8aipBSlt41IXiNUQKMlxEM2QCnhnoSFhHn9Tm%2F%2BTbb46epQaR0It9uAdLBdzQVlLlVXMS35zp04MNJ%2FoVRQ0PFmAYIwwpJQ4YKArdaOHq86NTsr24T3%2B96lCRq6k023rDZ9MqCSp1gCazOGzpBmyckyda0bIaqIYL67i5QuBPKIuG8Rh%2Fzk0DLHRQ5xzQfAcGC0bd0wh4iYzgY6pgGZJAjP%2F0fWoHSg0MVOeUCGVxSpmSWQTd56itL%2FlmPY74642lefwhuOpmxA7IOg0PFzGs1mxrSaE7DzKKXc61S3tW9YoIc5JQcHBQFhuV5NDsEcsCW4e3CLZeSqGR5elD%2Bikx4Nz3k8gppmxMHIDytYzu2FoPMowhX7bmo2KjImFzVaaxMaz%2BFDTNaEJrtSEj2z6A00ZjZ9S8NrrqJ1hThgPcWO24Sv&X-Amz-Signature=79fabfde3252f97c5cb8a836ad01ae09d3f403d0016959f53f90b39cdc3e1e22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VICCXLG6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCID9mRDhsjpuQ6b3C690cMxYDsapQXglSkCbRuBHF%2FhjTAiALoGTwQchjTTdl3cMPtG%2BCh4yP5ykpJaB8J3y4n5CTJCqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK6plCJsf8LLWKw6sKtwDtKHOtyjk3XCsVcch8gTCjbVxJsQHNpoJkf3jI8wCH9DmRWOd0WiB0C5CGt6CNLjtU3u1v%2BBYDbnbzPlUeyzgrRMxe9NOO00jjxSXeIOIon9sfgvP36nbY%2Begc6Og8jI%2BC30OM5KoGxKn9Q5jxds3gRNJSpl%2BSwoEHq7H3mid8zFZNPCYgBpsmnpBaZbj0iid6mwvDyWqA8sCL5OlIZVpggLuIQQctfxRGfAykd%2BKGQh5wjZlAlyitFFrjHCr39oA3AfXco%2FRqg6714FmJou%2FJVfjzSkyfzLDSzIDTTHVNvdgOYaqolfzJbeESymIW91ZGDTpEUJi1reaqeI4633spqNGq%2BgSGbVkywmp0LWvujrQmSkBBMrDLeGZ%2FVoreog3I1zOnb9MnY6eZVAuom3psObMebbOK8573T1OSx%2FP0YjzV%2BXYBNJvLjG72pIwChMcMHW6ar3pjlbKkRj6xmMe7FerEITX3%2BRdGt5GTPNJABuCxYQ8KNK1F0IHDgv4JXyaG%2Bh8fUPIiDUswVAHifpWY2YnlcB2r2L1Y5ivlcUmGui05O9ayg%2Bp046C0nrZOv4S%2FIdGWC1IS4d1Y542W6Rbzu5fZqXAyjBJGyw39v4rgGq6Dop3l4Buf7yMJ2Ew0IaYzgY6pgG7ahNeMoO0qUBFmczfcB0BvOzmbkLxqx1JygmwayBUQhMlzDULYr%2BNkT1XWylpMfxPuA2IYyP2POV1qFKw8ALdvjLohjV%2F7xSt2XWiadLJQQfA2lfwdzD5YAQ84NTjy84vXaoLhBlz0%2F2IGcGbYTdt%2B%2BGLBZR5N2zVH6VwUNiYxbxCdP%2BaecKW%2FL43KQfWAxb4XMKrQx1MfzPpPmLs0eQqmSOGMmlq&X-Amz-Signature=72136d3d2468d1a674633cf8130e960fc151966d752909313bfc2bee778274c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRM3SEUJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDxrcz2quJLWCdU9BINQovCQBr0Ru6zpTC3VqJQUh3%2F5AIhAPS6dqUNCgVAiBZTOdGul8SROnwizWywLFHRbUDQFPIhKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyYUy2V7NEBlij47Nwq3APpNHc0gTVIPxFCyBu4PDLkAgFvIuW8JXI2S7DEzsSpIshjpEf6tiTxww6T2ARkzENqPjHcg%2BI%2BabPXpjKxlXXNHq%2BdfMlyuO1kUmbb%2FAL7pPc85N6y6lvtXO7PYMaU%2BOdSCJx4W8wZzYlcJVigSb5sGnY0FzMNIN%2B%2FIeThyr2hoHTpcj%2FEhCuNJqGxeYkrgsL7LeYp2Z6IfYOC%2FktfwLmIamz1HBHZ1ho0mZtu1QzRaGD71Akebl8Krxyi7c%2FYsvZtDLU8dv%2FROQg%2Fq3ytLfnloo%2F08Q%2BguL6uCX37fumrEFrUFwTO8mdS3Sm9kVpfIoLzW%2FbUh2yzyv3tMaMa7IHXRsgfY%2BF0ikpuhUKBGDOyXKwzH9nlSSnDlXSBlRVSXk1QKZHiIy0bQDdKCV5DUxo2NM9je625K0AooAi5olodAn6lWUhR8fRxhnmOBYAJFRmFZikZ40NSQ72Yx3SWi9cP9lz5nE5K6yrdnEr%2B%2BhGnYDRfe5uOE05JHGJEqYUbXSazC8cmfuZPfGDKHW3VZMZBKJ3I2BkyyPlkBOyZJQl5BkoGRUGFPpy4biLtObrItchJn%2BHzJ0JCv8AzAVh6N7G68tnCsv2T%2Bbh9MUT%2Fz8IbcVJzXgmmJq8ktD87uTCEh5jOBjqkAVj9ldfcrBdMK8kNsjNNxkGc7m3tAeMu125dXr1Sasx%2BGs89LFUZZtInDIjM%2F4TukNaMRSSpjbbzlSynJ1TxPNxkp7ygsr%2BZ8uGUlkl94QL%2Fze2g3VE%2BR6DOjLMuLtnNECPXSfKfWNPbf44VYeedjeVJQNrYnCb9YZhT4fQVRIMBW3t%2FQF%2FDHFD4jSd%2FKUXPa3zl3VrZ0Ea3JyjlKQ34JS%2FSwP2D&X-Amz-Signature=9674a2578a5dd221b32b2c5f7bf0bdad5ed9ff5d26112a577d5a464285db435d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7I5274A%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIGrwjrW%2BoX%2F5X6sp1He0GfdwI%2FYrnyRAdPQnkW3bu6q0AiEAtdF%2B%2FuEmsgMw6%2BB1y30EjGYl1fqJisJ%2BNVNxkQHtcdcqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDBvAiV3UidZczTKiCrcA9Tizp4SsE9APnup%2Bpa1yyKUkVLHq%2FgIXiKP2c6BlxCLw2GNueuh84h0WiR7kiv370wp1ztBAlc%2FH7t5yrgSDXGUoxTBzmGg5OQxyAdnS%2B5x842kNGpOoJKsLR3AwqM1H3GKXHRBavqP4kNXilJbScM8qZX5TZG4XOr%2BaPh6nnnx0pp7S%2F9%2FqwesPYIr6WxmaEYrr4PrJm7hZpy6FAGA8ricY7fZ37RtaOe2DtUB6chTQkQFpZUQvc3%2FV3d77HBAk8p1IkNeAg%2BuvHQ495iNiGZL8x8Cv2Jv1vbIB2MfspzaTLdEwIbVBs0VpCkLhI%2FwIvxu7dcHCF9lhlA6b2EgeewJrKBZ85dowJuSDScnk5kcGYEu1yiFWAt9MX0PDo0cDEzQfYbk0itBU3H4n%2FZ%2B1dsQx2AecgeoRn9rv4O66qCDxOGGcfHEh7L9v8WNAyfSH9r%2Bf9YBddfUhgziqmpwDFHaqXBdHyMWzTmQYYYXgnkttTs1dLKGKJUT%2BWUrVhQtMyy2Hca3cbaAhR6NcfjxrXSpo8tl%2BXHIsETqjEwFQS5Ik%2FO38R7Fcptos5PFw8fPrzW%2FYlLVKEuyyuY%2BCu6Z7f6JHaAnhucEoHeQ0B2WNhmMuBMu%2BNVxC0dsm8iyMImHmM4GOqUByzhDLM972qNxABlFlnyv8EvyCxuFsGbcWYY87ERQ90Agx1ZScIvZO58jhQHPt2%2BFfvWMiCqx3znHATaxpYFVkyw8ZM5cytm75FePA5eGlCqjbCxvGjKbjtCdK84xWUGjIwiCdEsostDfewg5ssG6EgfqLoYAL%2BGp8G7bW3LwKp%2F11ZIWWc%2FUQE4Kvy1kvrljbN1AUMOLfNXD0jM9gB1osKHVX5UD&X-Amz-Signature=ba5120b50f61dc21ec22292ae2257451a479b5a0a4ad101243dd692ca4921461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665IWNOKD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIDLxW3vcaBdQss12MvPagJH%2FaSnSEl7pYaTSfv2pWxw5AiBlfIQHjESZ8STBUwpcpoXf49id%2FYZe8HciUS1wkLvJCyqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcqjizfvsQVIP1xIVKtwDzt6VTTANtKtKksjFG%2Bq1FHTYwY7I4UkPDltnSlIymqfWw5MGja9U0yVcEUVOO1%2F4IcTy%2BnUzYynZ2ZxMuoeptuV%2F9u%2Fe3dZNdf8egt43SXCeUSUQN5bD%2F6MhMotyft%2FOzskD%2BVTSLYOeOesClb4owAYp5CUwHHkEn%2FM76TBbPK%2B7G9yLaNhW37RyvmzzNQ1XNCyW5oVFVQvzLb1xaihunFcimuo9fBhmr4BLvD8V1m%2FSdEsBuMvtuvOqSk79xR5EoPnkbdJqxfgoijQVisXpK8MWkeU65FHhZrWYAuO5fR0jHo1zmff7SXl9W9lOsWXy5n6G0rhRSHNK6f%2BVoB1uq6feKnPiTaNbIWSS%2FLed%2FZy6qPGDZqMlO7xk3rnirwBFYCiWmYtFts8RPbRr3VyUa5Taj19X00qpXL8eh2UqU7IqpkjZuK0VLnxYbXM8rK9DsZVUYgmv946LEaTJ3R49uHKWMTg0a%2BqEga9Eg6VmsAaihW5sahRdUCrIwqqDJVSAQYmyQPPA6qkPljGU7T5ZPDNetAyuJgSDvylV2%2B3d4HlLSPwMdhnrcCH4twDBvxsgYCIgdZ8KN8%2FSK%2FxTkl6HTfmG8lsOP4VGjzcgkUtL9NHliX%2Bdo0lw0ioIQdcwt4eYzgY6pgHqrWxYHKYDKZ6yO7mu1gDiSJwRP0GjkyQdVjLlVWWPpSssbO1kPqeNcJBd%2FUbpRNnJd3WS4ndx0t8a7uO%2Fh6QONrCCzTo3FNwupErO0dBipp8I2T4p%2Frz74Ju3N95gOhSmuppt4vMqZnvyGjPxQS3tW1HnoWMkhnwGYMjhKNO1Qz2jhYv3AA5skxTMvR2Dtvl81ZwyXgJEIvP%2FDGKVhLSlGTBP5y9C&X-Amz-Signature=b8f1535cf865a16c475d2706881016e9a572678910fad3c1629501bf9eb4e20d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665IWNOKD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIDLxW3vcaBdQss12MvPagJH%2FaSnSEl7pYaTSfv2pWxw5AiBlfIQHjESZ8STBUwpcpoXf49id%2FYZe8HciUS1wkLvJCyqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcqjizfvsQVIP1xIVKtwDzt6VTTANtKtKksjFG%2Bq1FHTYwY7I4UkPDltnSlIymqfWw5MGja9U0yVcEUVOO1%2F4IcTy%2BnUzYynZ2ZxMuoeptuV%2F9u%2Fe3dZNdf8egt43SXCeUSUQN5bD%2F6MhMotyft%2FOzskD%2BVTSLYOeOesClb4owAYp5CUwHHkEn%2FM76TBbPK%2B7G9yLaNhW37RyvmzzNQ1XNCyW5oVFVQvzLb1xaihunFcimuo9fBhmr4BLvD8V1m%2FSdEsBuMvtuvOqSk79xR5EoPnkbdJqxfgoijQVisXpK8MWkeU65FHhZrWYAuO5fR0jHo1zmff7SXl9W9lOsWXy5n6G0rhRSHNK6f%2BVoB1uq6feKnPiTaNbIWSS%2FLed%2FZy6qPGDZqMlO7xk3rnirwBFYCiWmYtFts8RPbRr3VyUa5Taj19X00qpXL8eh2UqU7IqpkjZuK0VLnxYbXM8rK9DsZVUYgmv946LEaTJ3R49uHKWMTg0a%2BqEga9Eg6VmsAaihW5sahRdUCrIwqqDJVSAQYmyQPPA6qkPljGU7T5ZPDNetAyuJgSDvylV2%2B3d4HlLSPwMdhnrcCH4twDBvxsgYCIgdZ8KN8%2FSK%2FxTkl6HTfmG8lsOP4VGjzcgkUtL9NHliX%2Bdo0lw0ioIQdcwt4eYzgY6pgHqrWxYHKYDKZ6yO7mu1gDiSJwRP0GjkyQdVjLlVWWPpSssbO1kPqeNcJBd%2FUbpRNnJd3WS4ndx0t8a7uO%2Fh6QONrCCzTo3FNwupErO0dBipp8I2T4p%2Frz74Ju3N95gOhSmuppt4vMqZnvyGjPxQS3tW1HnoWMkhnwGYMjhKNO1Qz2jhYv3AA5skxTMvR2Dtvl81ZwyXgJEIvP%2FDGKVhLSlGTBP5y9C&X-Amz-Signature=11c227b368cf476a72941e720ba10e7086e95b770a329349175e4487d39425b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JBJK2AV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQC4BKjn0TOEr%2FY8XPlpBbf%2BCHFzxjCha8p374V5pudK1QIhAINb%2FpU37PrMKMXOyrEHkP%2BZOxqAXTVlOdTXtBA0k4AHKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBZFyZNr4ZMFqcgVEq3ANaQR%2Fw1UxPN7FU5uzN3U7xPItLE1AVxoJ3jhBkzZDX1pV5CTe0G3Ap7saJtQsXKXZ9MzabZ0CFwefNsJ5Fa%2Bc%2FevrXPNDgA0f9cU8ijEIHG7WABavi94F9YJhuU%2FYeYKEnKxTDcNgAkDCQ7sxWuAG99m6C%2FzgmqhxYjK2%2BtooVLGYOWDUq26RoBPIdWbIkKwWKiK7q5AqLJXonAn94T0bVALB%2FZGzaD6r0Mqnn6zBOO%2B%2BRk9N%2Ber2xn5QVNGChB%2F9pfDA1uZO%2BeD%2BjXbaM%2F8dXNa3lIUmmbIZTEqwUXdtb%2F5p%2FiuB0IxrlOeMD7H%2Bxro4NUWUSIHkfoH1QBEkt1qZ5qTgKBTsYBkQAYpUfnzcmIEXipDNnUeWZwJOJSP6qnPUI6GeSNa%2FZfVpgI9iVHqsVox%2Frx1Dt5tE%2FSxhKG2Nl3W6JJ6cRy65icQF1IyeJQZF318lrqNu0lLAImNBxyqo3deX6%2BX2m78b%2FB1ihvLm14Cs24nW7ravAfEpbSKDj3U4I9EbeHSFvH%2B0wt466Guya7HO3X7cKkrPG8HjmlMFqE7VWCsdW1OnFEDjmrUPuQzKg5FKokLELzuSo4iNZaf2idLdWPKQnZICkWAU%2FKTpxj%2FH7JD0%2BUPK%2FmcNwFTCriJjOBjqkAX55WZbYTkEKK%2F7yPrstHHbOmKI61Sp%2BemKzzUsg%2B2R8hT7NCITOo055CeosZhDOXTk5vjx2EvMJs0wjT4CcHSAgFI%2FWAOrsOFVxrCSWh1GXrZNGn5QyuYUk%2BelHUNZ9FbZQaQuVn2TCFPJ5uxYYJ2tYUN9Ae01T%2BcnFOmkh3GhrgWgl9xnv7DZBF0hilttGQzYEJa5VSJsoAwPfjIMYhDOvz5nC&X-Amz-Signature=6a4e0436945358a4d6d25b826871b4655b10d70ce3afa382ff68b15adbe4d4ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6AWAGFC%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDTeRPuTn3rrVAw981WIhWfYGi7oyN4heQEmA0pgtrVngIhAMuObrwm9sjXRVXIEAJkRredBuRADD0hQxcwI3Q3mpXHKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy5GqKLf0iRRxwZru0q3AOW3DDRem0vufP6gyylfHOeyzi0yGtdF6sl5yolhODWOqVSy1J%2FXzsLmYaHGxtKrAvWlCcUC5gBJDqdktvP1Sq4hnr7rIzYmjJZdqpbEmNoDNspLp2q%2BUoLFwsafroJQ9LtkxNFGFlGcksnfLvMyiDUwBWYur%2BH7XlbLneagkwuHby27Q1J86iaph6gtMXkRLLvcRftLARKGB3bahwXph2EkJcCWJN%2BRwYVCm%2BRSmm4qKRkDojAmTUJyNfttD3Y2mAj%2FBzu9F2UxgKH5XtL59zGYP3%2BLHybk7Go79pEwpUbjoq7xfhF9W%2BJ5dicJbCmmRvg7KiVWMo7%2FeAvAx9nHbBWZsCDQi7W2N4hzeoi02TM9n4d9szOezxj512Loek7YfnqbLLF5QwRVxFA9jRz%2F8TvRMCrPCayZk5ZiiB0CV5ceWiIif9tQT44OS3mOWZenq9cp9zfJ7vP29R3eY%2B%2B7Xd8FqdnLH3OmVtF5FQjRVHw0W4FIyk1PAjH5eC0g27ui1WXlyE%2FPSsuakrGkSbDxggv34py7SZ5fgqxVu5cIpY605ptpmeO5SJ2a%2BeQTlqEJ576WXuLwPAv%2BZK1Vi1sOiJvg5Kerp1BOwtA5y3711SJXhCsSeKBZc9llFdFeDCIh5jOBjqkAauMg1lYKwO1%2FRJpGSXE9g7dlKhRnBPzv%2B8UVyK2k94qYqI4IwJpQN9CKCImo4G64i2ze22bURpBr9iXKRPJ7KnE7JHcJP1kKwiOxqcQkNUbsdCh56h6sSLJfkCBiOJMQejnfA%2FemyOFQjU5PixECBsSlEDMr3pNidrx8EZvS%2B7riNoCNJvCy0DzO%2BZsMWkK24XZ9mEyJnDCXkwoWMuXyOMK4ipF&X-Amz-Signature=61936c7122153db86426f67adf6f59f9c09f0076764e32a200e31952288c8598&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6AWAGFC%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDTeRPuTn3rrVAw981WIhWfYGi7oyN4heQEmA0pgtrVngIhAMuObrwm9sjXRVXIEAJkRredBuRADD0hQxcwI3Q3mpXHKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy5GqKLf0iRRxwZru0q3AOW3DDRem0vufP6gyylfHOeyzi0yGtdF6sl5yolhODWOqVSy1J%2FXzsLmYaHGxtKrAvWlCcUC5gBJDqdktvP1Sq4hnr7rIzYmjJZdqpbEmNoDNspLp2q%2BUoLFwsafroJQ9LtkxNFGFlGcksnfLvMyiDUwBWYur%2BH7XlbLneagkwuHby27Q1J86iaph6gtMXkRLLvcRftLARKGB3bahwXph2EkJcCWJN%2BRwYVCm%2BRSmm4qKRkDojAmTUJyNfttD3Y2mAj%2FBzu9F2UxgKH5XtL59zGYP3%2BLHybk7Go79pEwpUbjoq7xfhF9W%2BJ5dicJbCmmRvg7KiVWMo7%2FeAvAx9nHbBWZsCDQi7W2N4hzeoi02TM9n4d9szOezxj512Loek7YfnqbLLF5QwRVxFA9jRz%2F8TvRMCrPCayZk5ZiiB0CV5ceWiIif9tQT44OS3mOWZenq9cp9zfJ7vP29R3eY%2B%2B7Xd8FqdnLH3OmVtF5FQjRVHw0W4FIyk1PAjH5eC0g27ui1WXlyE%2FPSsuakrGkSbDxggv34py7SZ5fgqxVu5cIpY605ptpmeO5SJ2a%2BeQTlqEJ576WXuLwPAv%2BZK1Vi1sOiJvg5Kerp1BOwtA5y3711SJXhCsSeKBZc9llFdFeDCIh5jOBjqkAauMg1lYKwO1%2FRJpGSXE9g7dlKhRnBPzv%2B8UVyK2k94qYqI4IwJpQN9CKCImo4G64i2ze22bURpBr9iXKRPJ7KnE7JHcJP1kKwiOxqcQkNUbsdCh56h6sSLJfkCBiOJMQejnfA%2FemyOFQjU5PixECBsSlEDMr3pNidrx8EZvS%2B7riNoCNJvCy0DzO%2BZsMWkK24XZ9mEyJnDCXkwoWMuXyOMK4ipF&X-Amz-Signature=61936c7122153db86426f67adf6f59f9c09f0076764e32a200e31952288c8598&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBJWLNC4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T042200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQCxJW03XKfrInDSvX5T0mjDcVXn5ErOK%2FjYeJ%2BN8hYDhgIgAmZIzRl5qYs3DHM%2BOm4XvoyZEsVPBU3ROiGIgxm9nNUqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNdWqi8PkTIjPxc2FircA5N5L8HOZMb5%2F%2FdlCHycP8BN5KBDWWosqD9Zwv7asa7l1YIPVyX3u9zEAYGQGvUYVbsgcgaPla39IGfKz3vjX0NWNJgCkAXTViMOwqlYqo%2FInEDjpRxov9B2dOBhofhugqTLS2zui%2BZIdm0GegRAts1Em0F6Ny2Fc97Lcqh0T8BfuGlkiMK9pUnrmDe3j2PQUBpHXtNVYV755TdJu5nTH9CqNDvfZxxlNMRc2lElAEjTwcG5UXANUXDlQzQ1l2ttuRHnFbNhN%2BeFmQKuKfJlMUD8U%2FlUC7x8aVWKZGm3%2FmYrfi4tVQLRjwhpBJf6GJVyXtpO6VEFMROc9ik3RbroemdJjjFijrT5c92eZHbRKYMLVLZGD3cUbtE3WJSpuPXumubFzYhj2OloUSSQ6JDoBLa0sHdHJ%2BZvMvoMU7LnGtl6WECex%2BtsCk2MSQu0sAm8sZyHeOK4vMbHMosGZ4zpZ7eGLm2k3eC2COt%2Bo9AjSt9TFOZ9pUp23sB3h2HQ9tDSR%2BuOEJN4hFZYFO4kKSthXhGHltiYo0NhHY2Mng%2BN6dSP%2F42Qahyw%2FESSsU4uCXU%2FnXtQ3mSJu%2F5IayUb56cN9IJchIPQlT661HQby4IT7FRbcvfQEhBAvI2Wm7IbMLOImM4GOqUBdemqDmzY1JYJBzIgjLQWiw3xXK2OxFZJjGJ6uESf5Wn%2FY2qxhFqjkwQb5nbV6PMmm17m35EeaIJ%2FFjgdaOKbgcOoR11xkM5%2Fg3%2FtmS93bjXNmIixoDRwe%2BjrBB7zn0fJ2H0tJiPpnClyM1ylis03u1a%2BeeuEgstuZ9KlZF%2BMsgRNYyxf1EfU8r5dWqnTK6080cb1JohS9OdEKbiEyFeC%2FkFvZZ0K&X-Amz-Signature=f1e5bf15fe433d68c970af557a12816e803d3555ff409fc1b1fea5379525c3a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

