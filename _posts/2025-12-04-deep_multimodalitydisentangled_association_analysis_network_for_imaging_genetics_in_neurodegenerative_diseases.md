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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XGMYAP7%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8%2BGZfPFS7envjDOIpj4iQC5Il0hPx0saHnV11KsjmUAiBzQmKMzcdGlqUP2C3%2F7YExRCvPTE9oFFx34oVc1bDgSyr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIM0QHqBFTGumnjWV39KtwDboDlZmarU6CHbYt3%2FmlerGFwo3YCH9tmxGTE%2B87JWH4tIQ51EeNMU%2FFOnFzLIlA9Mm9P9yKoStknYBX9NA%2F%2Fly3KN2ORmyeHKOecWfXWfAh34%2B1J9jrCTKlTcJ8OnjVzUbbrJmDnE3rT34lbeE3dzMkDdGTTe%2BVp6a3tAHrREtli8rBsCG73XYrl%2BGPQEou8kZn%2FRrZDNGjNrK3LcJ1xJV9%2FR6BohEDnhQclOG0govf1kj855G8RqKUjl%2BvKZ2VBYEbLHa4yp7eZvkAis0uigq%2FqGyQQyw3AZ6PRp4G44FAZIB0bbmmLIRe%2FL%2FcjFHquGHweghoWiR5E1KDShNvJghOvgnISEPdIZ0Ee1%2F9ma4AYDb%2F%2FylDd6CT0scB1pgUoW1B1Qjz4aaN6xBwpSyIQFlGDFQgCN8sWsqJgOqUtXTp2CELBQgTSKxm9kOppvsWWMEJTLF%2BORsVAiw26faG9gZ9W1m2Ao0qAVloRRm0Q%2Ffryp%2FjTVElGBy%2BQ7EKAhOrA7AIQbz0BJzhAW%2F%2B2EdG0TTdNNaHD3KPze5PBWCYEDSXDC49n44dv8QfuO8uV1NXXmasw5qFzG%2FtRIc26CScRr1rAjWncwUoGaZPCFdUaHm9okB8OJTsLNJM8FW4w4LDvzgY6pgGHBltYQQskU%2FCGQfbeo1tjicyeaXVPap%2BG0e14xxR5LOh1b53nASLKIYDLug8uSqYSVoo9RKn7lyqhJPPm2xmjy9efhfsOFSCaTclRZBMKpm5X8WNOqOOAyJekJTMI0wegsGmDy04gWH%2B%2BTerJCqwzDJ7B6epaxbUweVxe9Vssjwy0NDo1qhz0ZsEp6lS5K%2FfefxkkhCfhlGp53vxgI8jPdtyyvO%2Fk&X-Amz-Signature=21198eb6bc582ae4728008038f6b312e78e9f95c082c81736dc8a5a920949682&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XGMYAP7%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8%2BGZfPFS7envjDOIpj4iQC5Il0hPx0saHnV11KsjmUAiBzQmKMzcdGlqUP2C3%2F7YExRCvPTE9oFFx34oVc1bDgSyr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIM0QHqBFTGumnjWV39KtwDboDlZmarU6CHbYt3%2FmlerGFwo3YCH9tmxGTE%2B87JWH4tIQ51EeNMU%2FFOnFzLIlA9Mm9P9yKoStknYBX9NA%2F%2Fly3KN2ORmyeHKOecWfXWfAh34%2B1J9jrCTKlTcJ8OnjVzUbbrJmDnE3rT34lbeE3dzMkDdGTTe%2BVp6a3tAHrREtli8rBsCG73XYrl%2BGPQEou8kZn%2FRrZDNGjNrK3LcJ1xJV9%2FR6BohEDnhQclOG0govf1kj855G8RqKUjl%2BvKZ2VBYEbLHa4yp7eZvkAis0uigq%2FqGyQQyw3AZ6PRp4G44FAZIB0bbmmLIRe%2FL%2FcjFHquGHweghoWiR5E1KDShNvJghOvgnISEPdIZ0Ee1%2F9ma4AYDb%2F%2FylDd6CT0scB1pgUoW1B1Qjz4aaN6xBwpSyIQFlGDFQgCN8sWsqJgOqUtXTp2CELBQgTSKxm9kOppvsWWMEJTLF%2BORsVAiw26faG9gZ9W1m2Ao0qAVloRRm0Q%2Ffryp%2FjTVElGBy%2BQ7EKAhOrA7AIQbz0BJzhAW%2F%2B2EdG0TTdNNaHD3KPze5PBWCYEDSXDC49n44dv8QfuO8uV1NXXmasw5qFzG%2FtRIc26CScRr1rAjWncwUoGaZPCFdUaHm9okB8OJTsLNJM8FW4w4LDvzgY6pgGHBltYQQskU%2FCGQfbeo1tjicyeaXVPap%2BG0e14xxR5LOh1b53nASLKIYDLug8uSqYSVoo9RKn7lyqhJPPm2xmjy9efhfsOFSCaTclRZBMKpm5X8WNOqOOAyJekJTMI0wegsGmDy04gWH%2B%2BTerJCqwzDJ7B6epaxbUweVxe9Vssjwy0NDo1qhz0ZsEp6lS5K%2FfefxkkhCfhlGp53vxgI8jPdtyyvO%2Fk&X-Amz-Signature=21198eb6bc582ae4728008038f6b312e78e9f95c082c81736dc8a5a920949682&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYB4XGVO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCEukwPW1ds2qz3p6SZHiqhWyci3o4cDL1rPFXFxfy8mQIhAKzvTWvc%2FPc0fNYcYrAEJme9qTqy290UOrkoWuD%2BTp07Kv8DCGMQABoMNjM3NDIzMTgzODA1Igw7LrnDp3Xdi40VmSEq3AMw9%2F%2FSBhYSWU7Aqg5SE33NLk06b79EG6npRMSUY68wN1AGAQ5BBC7cyxnPkEpf2DKzv4E%2BBEsz%2BjqQERskQCieKYDBVLdvDc6xvTmst46hIIBVjJOtk24F9NxWLvrF3KKoL%2FauyO9KrhwlEbTLFyHFEaLhKZzobCKeds7qYOxaqrosMsd4P4XhpqbPXgkh0Oy6oUPWuK1rGehqPH8Jo%2F7kxORdZha5%2FaoBDKiMJx6z6xB3dVOtZSV6hzqvj8YYMqZMZIfDMY945%2BGFOjPS1lTW39IDn6vmIV821vRABeF1hOvcxFl3obT8LqfmrSBBUIylrEyzGdepxHJrtfNW%2B7Zm6RCDMTbxN%2Bi8ELvfczw3SF1hGjxw3aXCYEP8yZ8BTs%2BFyrMTaxjGxZy7bzYHl9T%2BxSHlLcuF54HkDJ7076kTaLoSk9%2BdRLacQuUwGBPwQyF548CXo3z7SWJrqd01Cdti5Z8mD5gdblPuuVfE%2BTCUE0kfOXm8RnlmDnjz9kctM2ZJGCqQJYXD5ouJrTYF00VLCrISUPdTRyjNlSR482MT15N%2FmFqpRlI6Qx0crNivUYsrBMZomTHLy5rSpWZXg%2F3AKANd8KLYb00hT2iXlxaBVt7AuRnSPfr6MmjGqDCCsO%2FOBjqkAeTy546qL3ViDjbqWCYxRPTlxcEb3I0rXf%2BoopaGivz6lE8mCud4je7YTthFPb%2Bl3CGjBZN4div7J0m3AKS%2BCirnCMu3sklNrRGvbnUaJWSuoXd%2BL67Qin19hg0Px83yj9ifmVn1SaHr%2Ba%2BPMf3YYu5LicNbVIyDYCeVh5RwTG9kJDkEQy%2F5sJiAfkmShJouiphLygCImtWNDZE%2BmMftrY%2Fhmpyr&X-Amz-Signature=423c1cc2323f38019055758633bfd74966e530992edf6c182fe1d379d136872c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBPQ6FH5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCY2fx7YMFQkEzQw94A%2FxK%2Bs%2B%2FFpyFblsO3hiInboqN4gIgFmW52sTYkEmChENTAXDLxohZXoN1XYEUzNVq%2FJLg2V8q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDIsbP3Dhud753kTKaCrcAxwRFgwYr9G%2BC9Hnr0xLpb5qbaea9HdIwpjLDayRtfzy8RwXKcO384%2BjW4vry5xlhEXIvbQ5kXewC0fj0g6XPpfW1XgniYKuXCY17%2FvNYkQJzWWF4P2g2DJnp0OmyHuvwUrRR%2FvwN5bCxlDzuykpTmZM%2Fb7T%2BjMXtqksTtZ9I4umztMRWPw9Zxv7M6ON3sGcJJo9DvxJcj417JkSGSwXEZagvRA%2FVbp0rRBsHHu8VdROxtLRSPnOaWIYW8ZOSBHEXMJ8cpQVzNhia2%2BnhwT3kpmzOdDpyFcrPHcJEhgGh28cQ1%2BENONti%2FrDhnPM%2FXEYxfDmdwnYOAq58k3tDdqJiUoy9IB8lmMeqmf0i%2FNSBGgU48l2uCcZ9kXjnNE0vPbprnnhLhMmLkOy1w76I%2Fq0TEqW8JQbnsvsI0GRCuKbU7OPVZRuICHW1tdzcLBi44asNBTcT7KXbt8n3VfI%2FJr5Prho1A78kZWt5tMmGfmtM6MfnzbTOAGB1Z%2BOgzKdDpkdMTYvkMe10sY3Uaxbnu6b7PhuWoOTH37vkKfVgHiOtHUSjL75u2u9MfypEbNWmYW0w9oYdCq%2BZ2kvFbfjjV1Vsv5S16z6ciAkogZFtyNQWE7cIyvnS3CwxMnynMq4MNev784GOqUBbwVHRIO85VgQsiRFPJUUCLkI9PXdDOH3uaZJPmQMeu3gg9pt2I9JhHIks13JZDaeCbNwEIsd6OO63ObhgTytFTMaf6pOmsPtKJW%2F%2Ba36VxmfmG6JENacEou01mj3jhxoDWSuFq3IIHQBb2E%2BwMoCR7agV7oYNClf5vJ3tWMKi0shcWXKpM4AozwE9Gigu%2BMZLdZuY7jbfqSdAkOnvXHJX71x7Jjf&X-Amz-Signature=934152a147fdb9c59b04204145c2fa6a826cc090b9ce065aebfba52aafbfcd30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBPQ6FH5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCY2fx7YMFQkEzQw94A%2FxK%2Bs%2B%2FFpyFblsO3hiInboqN4gIgFmW52sTYkEmChENTAXDLxohZXoN1XYEUzNVq%2FJLg2V8q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDIsbP3Dhud753kTKaCrcAxwRFgwYr9G%2BC9Hnr0xLpb5qbaea9HdIwpjLDayRtfzy8RwXKcO384%2BjW4vry5xlhEXIvbQ5kXewC0fj0g6XPpfW1XgniYKuXCY17%2FvNYkQJzWWF4P2g2DJnp0OmyHuvwUrRR%2FvwN5bCxlDzuykpTmZM%2Fb7T%2BjMXtqksTtZ9I4umztMRWPw9Zxv7M6ON3sGcJJo9DvxJcj417JkSGSwXEZagvRA%2FVbp0rRBsHHu8VdROxtLRSPnOaWIYW8ZOSBHEXMJ8cpQVzNhia2%2BnhwT3kpmzOdDpyFcrPHcJEhgGh28cQ1%2BENONti%2FrDhnPM%2FXEYxfDmdwnYOAq58k3tDdqJiUoy9IB8lmMeqmf0i%2FNSBGgU48l2uCcZ9kXjnNE0vPbprnnhLhMmLkOy1w76I%2Fq0TEqW8JQbnsvsI0GRCuKbU7OPVZRuICHW1tdzcLBi44asNBTcT7KXbt8n3VfI%2FJr5Prho1A78kZWt5tMmGfmtM6MfnzbTOAGB1Z%2BOgzKdDpkdMTYvkMe10sY3Uaxbnu6b7PhuWoOTH37vkKfVgHiOtHUSjL75u2u9MfypEbNWmYW0w9oYdCq%2BZ2kvFbfjjV1Vsv5S16z6ciAkogZFtyNQWE7cIyvnS3CwxMnynMq4MNev784GOqUBbwVHRIO85VgQsiRFPJUUCLkI9PXdDOH3uaZJPmQMeu3gg9pt2I9JhHIks13JZDaeCbNwEIsd6OO63ObhgTytFTMaf6pOmsPtKJW%2F%2Ba36VxmfmG6JENacEou01mj3jhxoDWSuFq3IIHQBb2E%2BwMoCR7agV7oYNClf5vJ3tWMKi0shcWXKpM4AozwE9Gigu%2BMZLdZuY7jbfqSdAkOnvXHJX71x7Jjf&X-Amz-Signature=4e4759e065bc14b3c4caf55a4dc2cda81025077174b2be43e296383e48df8768&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGHV25ZM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD35n9oQGRFDUWwNjmTwha1g2dOKSbAcj2DYXDo7pz9VwIgBWdGo2m6o3IICTqI9Lg%2FwhINHOPEa6iFuj3fiIslKkYq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDKz2geXe4yYU1rkZNircAxvZJ4gaTXTNBGjIVdJc6yU8U2G2W8odN0yjEG0Q7DI3%2FpFhUFxHBHzu1zgakAPq3wMFauR4lRPjkmZuiJz%2B%2FkXpDNvwCogep2bb4XwMWc5y646zID3z2YQOfzRKVWS%2FYGJVs6aHyhgjtsUfdJQRiITpkyvN5%2BIXAlta1SsgfuoLl2bKuibai9WcdruKmW9p%2BPWhLCpHoFG9XcGiM3iYIBzTtTor9E1PdLLZGnlpJCkbOivECE3mi%2FstedQlcrUQhDNiucpZz18sazDnQjtW4ENSji1jVTmEHrumLea2JmkiEyAHlP%2BGfgSVsb2fDO9nr%2BeINFeRqyfULBmN25m1jG%2F2fCb0BM8uAvOUPApXoOy%2F6G6r8LlPpIY5tbvxz51vbc2KQ1BGiz5%2BEU0vQk01rXlmDBZCfyr%2BtnC207%2FeUdRABM4Hixf0SKpOk2fEMjd%2B7lvMx4R0f1ELKj%2Fh2vmqZKPxuFA3naMOr6rUHcganPcBKD1gxxXC0twSj4huzO2prZwCpXlKzgyR4REWz0o1oi0dWNxaO66dxnVONUmjHfrhCafvQsAkD6wQvFESamopGPxo3K6bgxsyMYXYSw930KU%2FK%2B%2FihIzzFpnRGaGecd5hRiZvHIX%2FmVydSbsEMNSu784GOqUB9La7jijPJ1kIxu1nEXUFrTPsmsHDkSownpfHRO%2F%2Bz1O%2F1WC5Ruj%2FlIydkcPXeMp7tS86vv2T17DX%2FtzJgv9tAN8qKX4HhMAcXQLSMgkhZKzF53FV9EiMwVYwic3LzIjF%2FTcLVjUey3kZa0w37rC0JoCKCVZFaIueOGUcwbQC2%2FbiL47261akcgAAlOChWXqPF20%2BpLC3ISjg9OYxwHuo%2BTy%2FB8HQ&X-Amz-Signature=b7e38d3fa10e22406908c6a12b317cf7464b8d435d4471827967feabd4d5e98c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PRCYLIS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWc92TI7BvBUgA8nbv1CLC34lwp5Eulj3zLK%2BNnl9HdgIhANcbyaXLn6uhu8G0BCu7rxIVQHvjy2VtZ%2BsrV%2Bu3aZCPKv8DCGMQABoMNjM3NDIzMTgzODA1Igz%2FOXsnudUiXmtYp0oq3APHIj5svK50%2F9NodPfd6aAqcDf7oJdT9s6spEOegY%2FGzh4UfBZyJGqLbRztn8MXgvEtFgIOFyPDf8aTHvtO3jXzXm0UySrRO7F%2Bh0cpVQXM9gZE5OYUy3OeZLTtg1Dnk97rl8kBdutWpIDqTBBI2DIuJent7%2Be4FCv9f2Uo6%2FmDQQpl8dnKGjVz7LpmjTRVtJBkbjUMvoGOQZeA9eTEy0AbUaNtcyPKezK6XaVzFRKOC78%2Fb4kTGOT%2FeUq10Jz2754y6yDus8qKBS1H5W6zcDS7pT%2B1e%2FRkgafE0sZHz84MGrLh5CwL%2FT6DIHtNQ54w7ZDe%2BradjyGpljFNf%2BNpiTwwtinnAl2%2BdEZ0v88RC6eJBJgI93eIpKEoN5%2BZme%2BOTmyKNbHucUK1ahYGvUkhw10iKLlCJFtZ1msyXjFJ88xEpHKsLfL%2B8RKvxyeCX9wfMQeYfSnK4c7m9XMrGcvQScPDS%2Fdkm%2FgIphZQN7%2BzLcGWRwnSTsUnUOkHqI3F3TNEC8%2BoRdGjupgvp27MdOuVGPjhw6AKx2eCxCJwDPReKlbZcZs2bZT7p%2FBGiSY9n0StaR3%2FNJ4I%2BKK6q5z367%2BRX86KsCWtP6ET1H4IEllk3WJ4MAPCwTilvPcSjt00yzDDr%2B%2FOBjqkARnlFv8y7%2FlGF6jqQPnaOfaxptPfCvWQn7ylO9cPdNGiMvAA%2FLb%2B3Lwypbxu5%2Fdmbhpuk04AWZ17mSOwxGuPM09HtNv7bhZXhFH3QErwIjC5iHE4Bhsd2mQR0XFtKbGEZPmLHE9Sf2m25u4lPW6bzSsYjja0mLuvyYkIDs5kkY6I8JwStty%2BPZkNohIcXFeHZKhscssj%2FuqV8PG9lO9QMf0FuOfH&X-Amz-Signature=92fe594a94b48c2f95a00611aaf67a7a857cde6ca5b6e766bdfcfcaf28e3cc05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MGQCR42%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCeVEgsO7Gbf9WscRJfbv0pN0UZWL5UQ82npTtWNM8eRwIhAJkHBGsJy%2FFVDU%2F0%2B%2FSAT3KgQYX95NG%2F9jisRVZyplUdKv8DCGMQABoMNjM3NDIzMTgzODA1Igyxw5ZgusjLOEkn5Ysq3APTe9iq0PAEW4J3O8biXnwPKd2ceCnpa93%2BL8t%2F5qXgU2YdJMVHn8wirFkXF82%2FWTgy6gNGJGP%2FGibW7XURGmmLVGD6j7dFQztT1MygbzHNJeqYcAGjuQ2xHh4rVYhJgyoaeFFDo5o4%2FVgYJok4XDQrEOWFdIw7x9wbbFDlVSQ2%2BhHRl87Llanfu1Ms%2FkIupv5z57kyxVNLhlIOpGJ3r4ZkVyGAiPllQg%2BXywmuGl5AbXpKYJnrpXNv0RTS%2BtHaGKSSHRvz1Ul%2FjmuyOb3CgW53bL5HaEfZkq%2FYF7aLTk4kr8p1SucdjW%2BgJYlXdETK7x6SqBHKUPzYPzDbzvI9G5tXZ9YcUrzdsXWKKjJhzIUQldgwFiyvDXRVGoukyFWRW0sP1HjduhcymZjmnATRwUHmuR7JVlmlHIncy43ZnvwsVCqjlYi%2Bh1gjvLA%2BqndXJJqlX2SHJXy2kO6kACsPvqpFW2WGQ0iCq5GuC3YMzbBF1iD9Zk6wG%2FwhRCkL%2FRxkliOK9GrIL4ThE8cNw9QvyyDJzOP4ZzDdbInN7tumUNU9tAU0AyvvcLB32kGXE47WcNxEk4PUB2VYwW6vWEGm7lWLTuuDEyCuOuT4UUMAQJ6Ehm6t9VOHjQxIG7l77zCdse%2FOBjqkAYH4JnZi%2BK40iWsGIe4gLNflz1X058YK6kArHrSGXuxHAMt2NibIdLXBqwENbP%2FgOoY0u%2FbweopYsWZlAjO92msqQBNlor9HxNuInj%2BE4ZGzl1ZgiJGIXzSx8smsGqLb5%2BeVapPkV2rYJrv%2FSGbyC73sCpwMZ4mu4%2FLCTeFl5ytjYEnLqp59v5LTJlWmh5vYVeDHrmQPXMoVniEPyt8c64zwogac&X-Amz-Signature=02d4030c88b71ce376fa87f0ffe4e294eba6d76736ee31975a6d10f637a6b5dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PTUEZLY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFFi3z%2BjiyqF6gaCETOLbi6oT8V4FH9OuJHsKXuY9UcoAiAwqetio9QMGzJrlV8ps7ZuC8bPepfAeI5QjvYjjP9uryr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMIcoqUVhEwzV6VFubKtwDbskWILtUVlNHze0ooSJBzv5uE1Yiusdz06I0cVszQrD9x0qhL2WU%2BZWaE2upr911dNQsrfirNWh1ufuBzKPHb9gChtCphrgGYTK4Ul%2BNN9ZB0ux7eydXm34sfcvbAzyKjxXjPTY9HjKX%2BP%2Fe9BYm%2BeXy1tb8WRltfVmbmmfdbeHqtLz5tRjx3dbjuy5h%2FCTqbB1ZuYMIcCffgIheoVz36hDWZ2XQpkj27RATC6eocSAPSkNdTHTQ%2BRYUrOqdd64Ug1Yz8E%2BhLo%2BeLMGnnofkbgR%2BV94Z4SyL9Vt7Zz3KNARFeg4djU%2FIG27FOBDQgkVtiCbanCK5XZm%2B7Ze7D%2BqR7zpH6ZLMJsJBqf7BYT1n6M5K6UoYmvvZlGAwWdaOtOKZT1ZkNe%2F1LSkCHtGUU8QoROwyiySFdHGqw4pgUeS8BLN1VXBR7kS8hgwcELs9%2BUDHytHRRKDbM3OUb7ZMC0vJAcICwRq7Iy85ZFwT3KfPqKLuc746CQNCXXu6vKIcH8kzlPxxHWHI8%2BPSDj6TFtXHLV%2B355DVhDY5mSZ7hEuFSoyQ4jGroKb00K2n8JreZuFGTIeMRmwmMm%2BQVItSFykGyDbsjtQ4bXPSH983AXB%2BvxAPqiF8fZx0af2obLgw%2Bq7vzgY6pgHrCLorQQa%2BaKJa0PaD1PCPXIv1LSzY2Epfeu%2Ff51%2FkXn4mHeyBWJwa18ZoD5CyFrJWzBYnQVmlAlU0lKs0udXCM9ADfZ2afDkm%2FL6y0JpuRNahgIq65wnPH%2FTS0SKl2YdrzC9DCYGScJNUc%2By0s6X9vBNzwvZa0k5vegIQ%2BLz7gsIaB8QAy8K1%2BjaBtoMear%2B3mRYq4zwBM5DOP7levigXUaSGKhmg&X-Amz-Signature=e60e232880e06d5b49765b0d01a9a7c7bdd0ee59f060b2fd778fb9f7d5742977&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PTUEZLY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFFi3z%2BjiyqF6gaCETOLbi6oT8V4FH9OuJHsKXuY9UcoAiAwqetio9QMGzJrlV8ps7ZuC8bPepfAeI5QjvYjjP9uryr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMIcoqUVhEwzV6VFubKtwDbskWILtUVlNHze0ooSJBzv5uE1Yiusdz06I0cVszQrD9x0qhL2WU%2BZWaE2upr911dNQsrfirNWh1ufuBzKPHb9gChtCphrgGYTK4Ul%2BNN9ZB0ux7eydXm34sfcvbAzyKjxXjPTY9HjKX%2BP%2Fe9BYm%2BeXy1tb8WRltfVmbmmfdbeHqtLz5tRjx3dbjuy5h%2FCTqbB1ZuYMIcCffgIheoVz36hDWZ2XQpkj27RATC6eocSAPSkNdTHTQ%2BRYUrOqdd64Ug1Yz8E%2BhLo%2BeLMGnnofkbgR%2BV94Z4SyL9Vt7Zz3KNARFeg4djU%2FIG27FOBDQgkVtiCbanCK5XZm%2B7Ze7D%2BqR7zpH6ZLMJsJBqf7BYT1n6M5K6UoYmvvZlGAwWdaOtOKZT1ZkNe%2F1LSkCHtGUU8QoROwyiySFdHGqw4pgUeS8BLN1VXBR7kS8hgwcELs9%2BUDHytHRRKDbM3OUb7ZMC0vJAcICwRq7Iy85ZFwT3KfPqKLuc746CQNCXXu6vKIcH8kzlPxxHWHI8%2BPSDj6TFtXHLV%2B355DVhDY5mSZ7hEuFSoyQ4jGroKb00K2n8JreZuFGTIeMRmwmMm%2BQVItSFykGyDbsjtQ4bXPSH983AXB%2BvxAPqiF8fZx0af2obLgw%2Bq7vzgY6pgHrCLorQQa%2BaKJa0PaD1PCPXIv1LSzY2Epfeu%2Ff51%2FkXn4mHeyBWJwa18ZoD5CyFrJWzBYnQVmlAlU0lKs0udXCM9ADfZ2afDkm%2FL6y0JpuRNahgIq65wnPH%2FTS0SKl2YdrzC9DCYGScJNUc%2By0s6X9vBNzwvZa0k5vegIQ%2BLz7gsIaB8QAy8K1%2BjaBtoMear%2B3mRYq4zwBM5DOP7levigXUaSGKhmg&X-Amz-Signature=7c40732a08b13e4853171852aad6309de5e9483eb60701e88492e15f32f6120d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWN4QNXV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1qOJ%2F%2Fq%2Bye31K5MD7Pk87VbX5%2FQQrz48FxK9RHY7VhwIgZHniJWNPkDWxURbEi1znC0Hacun8G7ks92chs%2BuuJKkq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDMsxlMzb5RrG8DCs%2FCrcA9Rc0WKkJeE0ER4UoxT%2Bmf8cPji%2FGcbPFre%2BQZ81aXduoE5PVCDB4R6shy3J6CdXih%2FI%2Bs1%2B9DQDNQ1GKDuagY9U518cnSWPGvxrPsSHd6vxezmxbY8vzokOi29rsCndL8vpfOJkHgjAKouu%2FeC0S9WuyDgfbmCtmTqMBVDnkdGbZOf9navOuXnc%2FFrVGQ3mZ4eNII40OhD3FKOGwcahi0y4fOvsdZGZ9sLxK%2B5hHKwon8OQvtUfnxRTXs%2By5kg0o3IVT%2FNioVxMXUW4jvmYdYJkOvHUwKSKSOqWyDVsDnN5Z3clGy%2FMh%2BXIqsPv0JVdo%2BA4hEqgPEkz7G%2FeuZejww0dB7G2xD3nXVCGoo%2FfFSchoN91EXizHzU%2FFysVRZt6Yj%2FaHSvk1diy8OommojyKlbseC6MATzl5ES5a18OLkwlfC0zdgNLwb1fs9VDuq8By3ILCQwyfX3lzXBl7VBUMHRq7vsPs2usO1fh%2BFa5B%2F9%2FE8Ql088sBGOlkA9S0FiwxvUIfImZHoGV8CCVa%2FuQHbNpC%2FDX546o8pTYrvxNP9zpvut9S5sBOfei8xPI6ip0T2D1DFRySNhdE1DrgArpmkuDUBxBtadUvYhDLQyqx8JwZsDSwz%2BuLQsjOhLoMMmu784GOqUBh9g3GP7vbY11fCpMaGSYUvKmxcr%2FI9URo2vIOevz%2FST1KS%2BeiTRGe70HVSuJLmPCJJhDOxTTnSFKQkxaNkppa2vGoLqAyEhWcNo67oTDVTm65eBgsHXFCI86Pw5memU2umozF%2BvxXIT6lGneXB6kC%2B0dC1HGIze%2BypeH2TioGOgBhP%2BRI7SFTtDqwIqT92tIyAnxDLqqT9zzG1ua611neS%2Bi1j%2Br&X-Amz-Signature=24c53c679dca71cae22dc923f4b44c41200dadf464c2946bc4415b05f6f3cf22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UESUOYS6%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3oC60JIDJ%2FgQiTEqFSmIaVP3w8kZQt86DCeFI5Zve3gIhAIoAGyzlHCV%2BqfUHNIL2GwmWa9WLKk3clnkHUVzb%2FrwJKv8DCGMQABoMNjM3NDIzMTgzODA1IgwXsgvoDEkuDaHz06gq3AMMf68uQBi4DAYVwW2f8IGwqep91cNYev6BsVNOTzWBR9m%2B4QgPiL24m%2BMT23I9ld1GgoY8Iwj5EcqvV19FGcvnAv6b7Fy4e9QuAdtMt8KI5yDNMUuxcil1LAHkAwtpPr70i4iywkboS%2F%2FruGb0occrxX8Apq1NkPhdbl0cvk9TLgCeHBYGK3vAJu8ifQLTrCo%2BMQoVdoUXOhHQOEjOPup7Yxegq1Uq6yPwEEXo%2BPL6KBzSZ7Bhi2iQEDmE%2FurxAEbgB3LwsTs%2BIPYBfte5SwnPPIxfZHpQ6uUHba9%2FYnj6K2L3yfIEmS46Xi%2FroEk4h8d3vxnoP%2BugaPzmxjDxR4ov9nE%2FW3%2F6Zwh7CVW9iePomngqLPp6js6i%2B%2FYiaCdOo%2BiC5pZt5%2FE3AwGku0lIJJu24JQ748jLO4VHlxMt80pyvfENkjf%2FX4xBFL4ZRkuvRk79mnUCmEK38bj3f0mhLoszUxQKqu8wCH2MmfJuCigC7MKlOB6MxGWed76SVY7H78%2BpEBubylG%2FHryW9wOEyIAO62odKtCvUs2Ul8qKCc0U2hPaHYq%2BG6lgWk01r7mNJkAtJMZOm9CNwIErwP%2FqDP%2BU4SuOo3eLI105KgFCk%2B6GNY8RaPS4s%2FsCJwLpDDDJru%2FOBjqkAVAZjaIQEXd4dye9mHnjv%2BwKrknevtwzf9kB6MyN1bVxf%2BP70189G8wlIjqrLNJcPofv%2B%2F6EO1%2BWWGE%2BefB86GsDFqLOTAuvAncBZXwQestDSmE%2B0zuD3xq8Vlv3umWc95IZiB3ZzLCk3Yd2xTRst09ok4WHDJAilze%2B8uPqOkQE3Y6ozxo9kmZT1ZEjaTkGxfciYeZdZEAgdun63%2FV2yFfBEjJ0&X-Amz-Signature=a29c7f67aeb11553ecc48765753520475c4fb2187928d76c8fc9c9c94738b068&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UESUOYS6%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3oC60JIDJ%2FgQiTEqFSmIaVP3w8kZQt86DCeFI5Zve3gIhAIoAGyzlHCV%2BqfUHNIL2GwmWa9WLKk3clnkHUVzb%2FrwJKv8DCGMQABoMNjM3NDIzMTgzODA1IgwXsgvoDEkuDaHz06gq3AMMf68uQBi4DAYVwW2f8IGwqep91cNYev6BsVNOTzWBR9m%2B4QgPiL24m%2BMT23I9ld1GgoY8Iwj5EcqvV19FGcvnAv6b7Fy4e9QuAdtMt8KI5yDNMUuxcil1LAHkAwtpPr70i4iywkboS%2F%2FruGb0occrxX8Apq1NkPhdbl0cvk9TLgCeHBYGK3vAJu8ifQLTrCo%2BMQoVdoUXOhHQOEjOPup7Yxegq1Uq6yPwEEXo%2BPL6KBzSZ7Bhi2iQEDmE%2FurxAEbgB3LwsTs%2BIPYBfte5SwnPPIxfZHpQ6uUHba9%2FYnj6K2L3yfIEmS46Xi%2FroEk4h8d3vxnoP%2BugaPzmxjDxR4ov9nE%2FW3%2F6Zwh7CVW9iePomngqLPp6js6i%2B%2FYiaCdOo%2BiC5pZt5%2FE3AwGku0lIJJu24JQ748jLO4VHlxMt80pyvfENkjf%2FX4xBFL4ZRkuvRk79mnUCmEK38bj3f0mhLoszUxQKqu8wCH2MmfJuCigC7MKlOB6MxGWed76SVY7H78%2BpEBubylG%2FHryW9wOEyIAO62odKtCvUs2Ul8qKCc0U2hPaHYq%2BG6lgWk01r7mNJkAtJMZOm9CNwIErwP%2FqDP%2BU4SuOo3eLI105KgFCk%2B6GNY8RaPS4s%2FsCJwLpDDDJru%2FOBjqkAVAZjaIQEXd4dye9mHnjv%2BwKrknevtwzf9kB6MyN1bVxf%2BP70189G8wlIjqrLNJcPofv%2B%2F6EO1%2BWWGE%2BefB86GsDFqLOTAuvAncBZXwQestDSmE%2B0zuD3xq8Vlv3umWc95IZiB3ZzLCk3Yd2xTRst09ok4WHDJAilze%2B8uPqOkQE3Y6ozxo9kmZT1ZEjaTkGxfciYeZdZEAgdun63%2FV2yFfBEjJ0&X-Amz-Signature=a29c7f67aeb11553ecc48765753520475c4fb2187928d76c8fc9c9c94738b068&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RWSPGOH%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T182801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCy7nWaNktVJFi2rlssu5i8BlNmJha13yT7z3j19j5OIgIgVND6CO0Dex3sf%2BV6cnZ6Cno4QWczu%2BWkMnjIjVl45Xcq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDCban6SN%2FdaL0jee4SrcAxlnD9mNeyMjKn7CXSy%2BLJ1LgvjcpcEpe4c6TTBNh7qoPv4WVZOebhzLQMFR%2FwOvLjg46zL1jY5rEld%2FCU3zS06Wyet0HN8tlTXTqGF3S14FyAE2sOhAp06bc4%2BS2AqvPi16JxoCC%2FxAGualOStjIDR2haXhErzI8iYDvWcKEcRD9erEmR5OM1abxF2johQI9CDNSANwc5JQQSAlLJyyIRZ6ZmNJkqZh0WJoUabmYWFxJ5LCfP9ITWngjB9r8%2FClAh5%2BMhu%2FYfo7Nge7lTwTYsb94HPJ6uYcZ3LA6PU4KIjNzFG%2BqCKYuOMVwtfJzpLJKc7bhiiQzoX4cot0J033ryl5AsiYiR4Kw0airYc%2FabJNJafWM6umdwHv3HtECoXSkfrauP9o%2BmNhqsGDO1bfTyX2WuuYpuzKCllO92AFD1q%2FFkucimOn1cqQ1N6tpSiBKM4M0ibkO1NK9CnajYmEk37pVDhAk5zNRptXY%2B7uQ%2Bc2oLFnW6%2FpbA48bUX%2FWoFEpZRoWAoPsAm17pxL2j3TiTPcTFlAIn82QKPKreEOHyZVu2QtCGsDiDhmwVg%2FF%2FCSkNomea9f3UuzZ6ON2u%2BhdPCRfcZ6T7WjAcxIQLsXwX1y9Qzg16rtbDA29QgKMOOu784GOqUBAmPNkvF3LvRJbcF9dMFsVILaEzqngTf3htkmx%2BHWtd%2B8dO5xRD%2FyD%2Fo7UTgHiadg2IVT%2FwjzMdtvLHa33BFqgTJOi2xvU7PVYo%2BBW9VW4BIsyDlGFGMhwYEa%2FKKcMc1o8cFwghQFv1RHfe0yfaAlODAmcs7UC%2Frxpm7FVj7eRp0S03L2Sf7jgKNQd8bSzDICcHSStQ810s0LjlI0bshKuvhCOaYk&X-Amz-Signature=846a522a0b946714a4256930c7ac2737667d2044bca44d65d4d623223683f907&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

