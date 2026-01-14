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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNBOMV6G%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIGGuy%2BGgD%2Fg6rZc5EmzPOSl9KirINn4Z5Y6B9jIhjmw5AiEAoSn9NjxK2b%2Fq8RnHLMAGKBQ9vpf3V6C0f%2FOrD8Osx%2B4q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDNlPLfVBSGxa2AVSySrcA6063gAi1Ic3flHAVB4%2FKEP7EMuzxu29pkndzbJM49uzwPpfmn6ZtZkiASX3t11TYRcRpPJMvCi70hXyKLW2ftTsxXTOzwR2IeVofDuWebroSoKVwft9D4%2BNwJnTwOrnRDHvvwStks8qZc7truU3KXQ41IjtE0zh0UwlhPrXd1ZKBgVOjJf5CL7x0jUxatLot0%2BgsbzI6MLBXb1LiKRDfQ092YMFzb7s6arqxrPvyRtLcZgZOqZjXiQU9HlU%2FQRgbuvVn69ZYj53lnFAa5EAra9zfeLuiVQD9JHj14Iqmg7qucgmC7CqUIjKtnaD3BKb8DyGqWFVx0YIVbB%2F3nEPt0zTPRJxNPNHQn3JRIxxEV6%2BFPvt2%2BWSJooe9ixivSC5KW83rdzy%2FVIycrPhek9kNv2ntxax9WqHCpeus1FisHBJGbFbTtRLcSApIBHZ%2FGmfWNtOcFJBO6gJcYrHq9Wi%2B8ZB%2F0u2eYanjX%2BFpYblAR2Vs%2ByY8l7JTEGV8Yqvd3J2y8EP%2F6jDjtguwP7uxtpNX2RWRbACbZxSnYR1DNec002a3orpALoWx%2BIHmthtjboR2iDbRwAtUBXZaxotYELV1f%2F2ME9Kzyvf41tjBQzePHkkwstjQqgH3jNMtufNMNmYncsGOqUBIOhFa4DpQGtOasucX3PdJNniy7gKnTNb%2FK7E9G9KZ0E6EJ9%2FHK77Rr2aar9QlLFZckyp5Uwp4url3Lv7AZHq5hMipcb7i0zLeKJesRPMzr0Wns3UUY%2FTSqtgQ2yizRLKQavBs6a0FXjBA2G41%2FS3eISLJC0Oq4SvqbeqA9ZYiEicejAw0oUfmqOmdEIRTkbLJQQgqUQIbFJPL6B5kS5u1Sz94n8J&X-Amz-Signature=0e6fd52d1530e1fd8f6b869ef1572017cc3c6771d89750fe04bf40c711c8a6a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNBOMV6G%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIGGuy%2BGgD%2Fg6rZc5EmzPOSl9KirINn4Z5Y6B9jIhjmw5AiEAoSn9NjxK2b%2Fq8RnHLMAGKBQ9vpf3V6C0f%2FOrD8Osx%2B4q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDNlPLfVBSGxa2AVSySrcA6063gAi1Ic3flHAVB4%2FKEP7EMuzxu29pkndzbJM49uzwPpfmn6ZtZkiASX3t11TYRcRpPJMvCi70hXyKLW2ftTsxXTOzwR2IeVofDuWebroSoKVwft9D4%2BNwJnTwOrnRDHvvwStks8qZc7truU3KXQ41IjtE0zh0UwlhPrXd1ZKBgVOjJf5CL7x0jUxatLot0%2BgsbzI6MLBXb1LiKRDfQ092YMFzb7s6arqxrPvyRtLcZgZOqZjXiQU9HlU%2FQRgbuvVn69ZYj53lnFAa5EAra9zfeLuiVQD9JHj14Iqmg7qucgmC7CqUIjKtnaD3BKb8DyGqWFVx0YIVbB%2F3nEPt0zTPRJxNPNHQn3JRIxxEV6%2BFPvt2%2BWSJooe9ixivSC5KW83rdzy%2FVIycrPhek9kNv2ntxax9WqHCpeus1FisHBJGbFbTtRLcSApIBHZ%2FGmfWNtOcFJBO6gJcYrHq9Wi%2B8ZB%2F0u2eYanjX%2BFpYblAR2Vs%2ByY8l7JTEGV8Yqvd3J2y8EP%2F6jDjtguwP7uxtpNX2RWRbACbZxSnYR1DNec002a3orpALoWx%2BIHmthtjboR2iDbRwAtUBXZaxotYELV1f%2F2ME9Kzyvf41tjBQzePHkkwstjQqgH3jNMtufNMNmYncsGOqUBIOhFa4DpQGtOasucX3PdJNniy7gKnTNb%2FK7E9G9KZ0E6EJ9%2FHK77Rr2aar9QlLFZckyp5Uwp4url3Lv7AZHq5hMipcb7i0zLeKJesRPMzr0Wns3UUY%2FTSqtgQ2yizRLKQavBs6a0FXjBA2G41%2FS3eISLJC0Oq4SvqbeqA9ZYiEicejAw0oUfmqOmdEIRTkbLJQQgqUQIbFJPL6B5kS5u1Sz94n8J&X-Amz-Signature=0e6fd52d1530e1fd8f6b869ef1572017cc3c6771d89750fe04bf40c711c8a6a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DIB64HF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIEUeowZdT28VTLbTSXR16l0kQfqqSYMIcmoaATNEXqwDAiBRGND6dlRacSSihoLubRHkeiG68sPuD8PUJotk9oLOnyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMkIjdMTofBio3cnY6KtwDG98tZaaT9sz3kPu6XuD26acDetCXGX4zzJ1HZr0MKAvtKp6fmSxwZz2YOlvIeopNNrVX%2FyV8UW99VA%2F77IdJzH%2FUOJV2nnaKgO80koQZcU%2Bq5EdAG0nLHSYmpPi6QaUlf8iQ2Jc80%2Fm0Yi3DcOizwwjq%2Bo3QbyaOWv253I6gZIqvmJUIYVw3Rd%2FVJ8t5M0sfx4FLWVszfISOh6LV2d9CnnazP30HyDm5BC2zflb1FKP%2FGQR7ZakiMzZTu0HYFKUIOhHc%2FUqS6nefB0Ulr2kaONg7DW9P7Rf%2BWDIkJKtry0UmZOdBwVMLoiyBYAyDq7p6WLXBQWPor8JY5wyc%2BhzCyDB96xCscAX9iU%2BolAGLMNERpHFj3aX3HRhz5kI4VfctULl%2BxSk4A%2F8%2BlSlX4FP3RBA8a0UWazMt7TcSfPSQgkesF2EBexibh85UolXmtDBrOGdf0wsXNfiFHMeMcTytHDsaRvtXvz78Qa1OIkP1B4cwg%2F44lLg7gGUiNXdfmwdXnBP%2BihLfrufLPsaDPG1eV%2BkDbkMT1FcXapvFLvxZ1%2BINxdg8hqRjI5bfJ4JQGod0k%2BHjA%2FFnk79anXofrGnWhrgTCq3hOCM7nv%2BXM2PQaEHeWCDBqTeobag%2FirUwxZidywY6pgFQ24zPt%2BmVT3Y6uxHzMw1U5IQ%2FvfnwcNGFcReIMi114Jj2%2BebLLlqpWcFpEWwbwUEJ%2BDhV5ee%2FeKvK3gIyTcgPJwDX8zyMvK8KIlnkTfCqOlWQ1QUx3h79YyswikrsMZJd1cpQY%2FdW5OBRpL3hGZ%2B9w1%2FuiOuA1xGsK4hRlfC7lSRcaMbbwqk%2BVeDxAPK5f4djQfxhbXD0nem1MU8sW%2BAFz9EkbCZI&X-Amz-Signature=e8635fca826adb63fa4b92eecb08c7090f6713c89199211df4764de13d0f0607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GDNXYL3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQCa5hBtsM9FubDO8NoPfaYtio3GCQWRWHWt33zgksUxrgIhAJX2aRw2jY1Ty9sNmVTzYBKoA2Y3cd1aZVr0dH74efuCKv8DCBkQABoMNjM3NDIzMTgzODA1IgxV82tMn0yi0UO6Hp0q3AMXPhx%2BkjhgeYDUZczT%2Fg85TJKMW4HfLt3ZlZVd8Niiy0ol8t26ts5fREZy8r9UyJP4YMc76LLgTPH%2BrNNjiruXgVbPKOfSY29HiFPH6uFDtuJjIfPYAoD80LaZw8Gx8CLtnjjlgyq5dYg%2BjSmP3vECLm9pr0euQIlSBcnHREO6wq6RG5rUM9B0lmEeZaB4jDUT8xyAY%2BcxMIx862tlYP3%2FCbZ%2FYVq4pGYnyV4ss0IkJqfBLJOUmXuwdSx9YYqxD0lBDSHd9hjkAUAjA%2FT5hFZfbqwDmNIVoQZX%2BUohJEPJjjqcqoHYVIEvtSA1PkPpYys5yUblBnlfLIzVhaiowE%2FV3laVjNELH7PhbuGdqtQFCIoVwDt1NSQUGn9bs7nXZv6tV2joWSRs3rk%2F1JP8tEgkX3Jf7avjGrnvam9FjZpJHsCK6d5wAdzEjQd6egOYc%2BEdnU7ngkJrr6tvSTxfJbBcqhrfLaaT%2FP1zKYyWxesUBIE5SjvuDO3LIBpHY63ktUppL2F6IwShFfp0cEWF8bfcru3pzfHVHvaIFTq0RvXuO7F66TaMn5qfNjDExARCmIC6f7%2Fx88cP9sxdk0tygK26hyZDH6yGkbOWnXOQ6xL%2BzJZK0vDAZGwSrQW8SzDXmJ3LBjqkAcijYEVK67VcIPGBBu5ZxLE4YlzqUIzbQx73CTEvT4uZ9vo3696lEwVkEakQgLT4IUOEKZs6WshbOEi31zaovXKtXsjWXbXIcVryh5dX90zajpuyLltWWSWjBVS3BQdyNRmmolCKr0F6uvP6Xd%2BezbooK7xLdGtmj1j5Q2SLrKvjUEXlKfBeRbS23dXunL3z7IIC5e9k44rRZLufaKc6%2FGbETTPl&X-Amz-Signature=dd0fbc0f5f43355ab57713ec0f08fa95dff0a764ee92185f4996cf34becf6c94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GDNXYL3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQCa5hBtsM9FubDO8NoPfaYtio3GCQWRWHWt33zgksUxrgIhAJX2aRw2jY1Ty9sNmVTzYBKoA2Y3cd1aZVr0dH74efuCKv8DCBkQABoMNjM3NDIzMTgzODA1IgxV82tMn0yi0UO6Hp0q3AMXPhx%2BkjhgeYDUZczT%2Fg85TJKMW4HfLt3ZlZVd8Niiy0ol8t26ts5fREZy8r9UyJP4YMc76LLgTPH%2BrNNjiruXgVbPKOfSY29HiFPH6uFDtuJjIfPYAoD80LaZw8Gx8CLtnjjlgyq5dYg%2BjSmP3vECLm9pr0euQIlSBcnHREO6wq6RG5rUM9B0lmEeZaB4jDUT8xyAY%2BcxMIx862tlYP3%2FCbZ%2FYVq4pGYnyV4ss0IkJqfBLJOUmXuwdSx9YYqxD0lBDSHd9hjkAUAjA%2FT5hFZfbqwDmNIVoQZX%2BUohJEPJjjqcqoHYVIEvtSA1PkPpYys5yUblBnlfLIzVhaiowE%2FV3laVjNELH7PhbuGdqtQFCIoVwDt1NSQUGn9bs7nXZv6tV2joWSRs3rk%2F1JP8tEgkX3Jf7avjGrnvam9FjZpJHsCK6d5wAdzEjQd6egOYc%2BEdnU7ngkJrr6tvSTxfJbBcqhrfLaaT%2FP1zKYyWxesUBIE5SjvuDO3LIBpHY63ktUppL2F6IwShFfp0cEWF8bfcru3pzfHVHvaIFTq0RvXuO7F66TaMn5qfNjDExARCmIC6f7%2Fx88cP9sxdk0tygK26hyZDH6yGkbOWnXOQ6xL%2BzJZK0vDAZGwSrQW8SzDXmJ3LBjqkAcijYEVK67VcIPGBBu5ZxLE4YlzqUIzbQx73CTEvT4uZ9vo3696lEwVkEakQgLT4IUOEKZs6WshbOEi31zaovXKtXsjWXbXIcVryh5dX90zajpuyLltWWSWjBVS3BQdyNRmmolCKr0F6uvP6Xd%2BezbooK7xLdGtmj1j5Q2SLrKvjUEXlKfBeRbS23dXunL3z7IIC5e9k44rRZLufaKc6%2FGbETTPl&X-Amz-Signature=94679e9d18b92a17fd5028f58b9ffffc1c423b5e4274fa7ec2f4b9621e91ee1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIDHEEPC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQD8DY8eQqarLEHAKUUlZjWpsNn1nfeIQ8dX%2FZGKdEFuPgIgYHlkgNp1obwPB2ARjg0MP711sxt2vMp7UIIHjCWOvPcq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDIt6WWl4MtO7omM01yrcA7NGLISjTNTUAKdPgKoKz6Vu8ilZqsp5sWCsMg84VJYASyUqgde2fYEXS70pXU1aQQb8IVwZcGTZG757VU5XIlExi953wAAK22u3qNF2SARM0ZdVVnwsVUrwSKQHalIZ4P%2BlO%2BdxyTc9y9CFwr%2FIIULi6qpXH3gxjhqcZjcIKrU4oqRquIYDNR%2FJiIGWqfaPo02JPqDLinimkB89cDDm2Nz2N%2FJtJBqcHp0eZbZZMIb%2B991%2FU2W9lDR%2FvJax%2BSepZR1kZWph1hs0RzBKbxoCiDKh8g9jVT%2Fupoz4fdvIz6mNRZO5Li2WP%2FOg9K6vzHfCzebMf0CNaveGf3aZXup7DnjWa0rdqvemmgGlU%2BhmsEYyiWsBJkw95nQDspeiYE72ROvAQ3Wc7FuvHrK2MY9qXifYemIqk54C41JaTcCZ%2BgSHP8Lvfv8NBHV7qgj2HmxGu2j9rSkdqZZCiz0Ci1E8ZABcC%2BgSme2612QYIlYHkZUsnwpUS273E74ztVaJsTZJVhs%2FZn%2BSXL6IbAuOo5W3mugbHATp49nAmrGPpTaFwEh2zOnqzAtGIPYcM7drq5lLDdHDVJl50wPSkueg9pE7lOuBn0W48ATrLv7ZWJ1eZjsQYrQre%2BVEh3Ki%2FbBpMMyYncsGOqUBBNSBFXfEPhimpmSlMOBYGoggr0Dg9aV8C8%2BNrmi5HqnvVutfjAAwkXf%2B4Ee2%2FriUlDfUdbfGX3QdiHT%2FlqhR7m61qqHihn1LyYXY1WgOvim1tW9GEniz2kEij1VxkWZ3upMK12g5YpLnl9ENcNd9xWAQ8tTqSOnw3hVSgno1xfSrB9J1hfd1myWjnmrewWYKLoStp5TV7Lu%2BfCvJPxx9qFHKHXEq&X-Amz-Signature=a36fcaa85501e93ac94612fa516d2af088d23aee16b71f940617b6de16429dca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYTXQ3P2%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCthw9pcvLvdUNrPbZWvPtCr29yBamnx3dHdAkYEEut7gIgTTJG0xPlUf5nTld%2F8k6ogZGXILEU3aSaXNKl3aVQ64Mq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDP4rU9H%2F4NQc31YQ%2BircA2faLrDHOcJTPHp2FhqbCspRQIQlJX0HyvCxGMQARpV94UXPDjY%2BzhPJv%2BIzse0znxI%2B7tk4CcGPJB0B7Wzh%2F4jRjxNQiMWewODbY6YP9X2i0GzTamWqo57pIe5UdhPnmr7ewMOxOl2o8%2BNwoDwkGEK5mcBOE73Z8y%2FbObpTErsLAbe9gbollgYVTz2Ei12Fj78nlxpAg3VsUg%2FuXtoyFEyxmrioaKCYhUFIZoF0ljcF9hhXkMHJdVtI4vEZsiEOWDaFH3aLd77EEd2G5ERlbwHs0d9tT7WJ6SUC%2FBoeCB2odNb6x68NJf%2BnJ3s60kQZajojPzW91p4TUMeQXUqCFXiQPVZ6fzspIaoU4OruMd8vRSEoJ%2BSeyqoPRG8eiCP184WyRkaukdXtCe2Z0AzMhXW4HA2Y5RDSkhCrsSU%2FmV83C30adHl3ukW4XiCkG9BIVzmXwxLA7%2FpMeYyJOXG6iUfY2u%2FzKyN%2FCihA2EZKO%2B%2BfLw%2BVBiF78VfOy1tpjUuQhSdYf0g5sqSbHO2hQpBv44txybFEnPrcSQOqsLrcmvZ%2BshqOJNyBw5JKY9UgXDc90IZstmpYgXi01GCf4msNkhO9fjThEJ5vauwLucrD1HF6FqxOPz9f7AGYkPCTMMiYncsGOqUBEpq8IAeauvyoNuXLx%2BgDhgllPJ1oZvVR%2FT2N6mRGbmBUjaAmW%2BUEV9AD2Jd%2BhYkX5v8QjGOacKG%2FvX%2FS1MY%2BK9avn8mn8pVc9G3u8JiCO2l4UufhH%2FAJVYn%2FDVUfcg%2F%2FeV7F2ZRC4Bfh5FS95HtjQQLWGprwTAr3ZsBHN9QgdRtxJ8zh%2B8f1XWkMD8SejMxPy6qezXFZU9uDLsdjUYEMK7nmCe0E&X-Amz-Signature=56fea643f9019b1c163a6438f28cb17bff06fe34e75747e66a96ae977b92dc1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGDWGDW3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDnvIOsGHoktDwHKWoUfJIk9aACLJtvcuGi4dgZaSzneAIhAMJmRPVMtU9CY4dkfEvLykMw3oflz4O%2FeerkWbxa%2BBnJKv8DCBkQABoMNjM3NDIzMTgzODA1Igwdh3Le5jN%2Bciw%2Ftgkq3ANR5xek4RLFyJZcJEIfjBGpqXw51I9l5NlGhpqHFb%2FpEbtxmFe2hxunOMo0UtEwbqUrZ94xDqbAAwViVVlC7hnNjAG7H55Lnl87kxD4bgC0P8Rc6lzSct6Ay10oo3bJIcjP3NmM9IVaIU%2BfkxJizdWiqBtfI7DAIpXUIu2aOJDOQWmlCHUaUzm3%2FvgRX8VbyZ6wX9B%2BlzK8%2F1qQfw8VZalCrQhko%2BCiEts7fbUFyO7bn6iB1CnAIK9F7y3Wue61PWJHxddTS89f7inpRHUL31WGyrFAH%2BUk7FtaLrIqPpA5mq0tr47YR%2B8t7g4qpZxQQebhWMzLS87w9MTXQ5UUGjzFOAodW%2BLTZjiSSD4upPdXCXqshfBA6aSDczhs1aAJTNXHXfIRP%2F5GQufV9MJvrhiDR0jxQthhS%2B6DFcArNQJwQsEiA1qC3UfFaQTPkhI6Q%2FJbFk8Kmw0Xj3HjveRcJ66b9QcvU9Y%2F%2FmL6uSwWB2ZgZ%2BtkcWhvfI5jz4d9j0Hg%2BRiUBWB5Ok5yULgUOoqe%2B0OfOP2EBnDWuI7mtLyI8jK4OLnd3apmGkzMVxqC%2FRgajN6wSF%2BQQHrtGUYzE0BjuqJXdQ0NzwgD5s%2BUKeIx32wxFaNjLE0%2F13Z2G0CA1jCRmZ3LBjqkAdJG%2B08g%2FPg%2FkziHTO3%2Fsu%2Fk49JoIrAVA1B5G0hA0YwRIGXtTWt3wq0mtez%2B7oxghZg9wTSU%2F%2Fj1ATbBC%2FKxD%2B5JoFJXY66getS%2FGU0ufWBKqqpGTgwBhLcFj35YkCb3VRy8l7ngRqAjAq%2BpzPu8p4EccZJ6Yc8GMHNl6DfofEbFms9BPmv2Znc5iImwKWvW1gfLJ4CCpYrVwhlHNoIk65iLZmJi&X-Amz-Signature=a8151e430b31370d20893d069f347d62ca7972f2c354d815260774da177d90ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WT23R4LM%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDZTfjnXP2di1zgUGHX22UX1yaU8PuBWYiz6qIGTLLtXgIgdR%2B3ZNAooaFEk2Nxl4HK8PPHATNHBVulqsxuagA0y%2FMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDAPcnvY%2FrTG1D2%2FRJyrcA%2Bfe%2Bo8mBGDLgD5JKidilV2GNcotJxRQ1QAYib76b1FCOFgjRDi5An%2B7bm3SYwk10rZ8Zlx5w%2BM45gHhpWYEWDRm9f4uYTUVsn5ohOvq4tGNUZpnacgU98%2FiXuAG1DxyktQ941ZP4A4aaZuTbTcVxqkUkE0HM1ZNun5zfbu5jtrbA%2B66Wg5FBHXxi7cfCYpW5DBIe0%2FzFWUlsVkpOgpiVRQYcsqDpf%2FtHx9dQp0yPoKGK6%2BzzUqVBZz3%2FkUUZQiB9FPcvGyOXboSjZJo6qGLNm%2FQK6spi2FR7ee7rGA0GpA2laKmOawcBbjROO%2FhZfO80ci4qKquPfOFNzgPiVUhmi7vsrdCVrfBd%2FAGLW4SMEGx62fHG73TIoi9r66ugVnK7MT8LRgPL8tVHCJ2SZyZKkRy6%2FgSDKYl36hIyQ40tHehgOewA8geNRBlQ%2FaegkkLsTOFr4z7LTmRIrwIFB1UG5VvrH6SoDdmkNvCvQr8tL3YWuvOMQ7LWB%2BjeXtZlwEbh2ije6MBOxrV4kcxjnudGJyerQEyrDQ57e2Tlwn1UJ7IFxEtzxPJqchr1lk3%2B3C3V%2BGfyruvln5WrUnQT5Jq6qMXXgyt49ZzLRMNrwcI%2B%2FDJHr70cfVEvpXb%2FqqEMJqZncsGOqUBNAmIrjdxeSMtiXZnIDN3wbLhWssV7IQ40Fo0ZB1c42qnttPj1D0yip8HswFGM3DvKBS9V6ffVOtSxT1M5xdZ6VcwDMOxT6Sq0wdprIMh0hL1O4UEBmMT2ZQpIljmEyyzQxJIYLa11v5NHOXImP9o1VONyPo8uDCL3Db9fVzlc1W5oNh3CWMT8Es8ze%2Bge2ejoY6gNOd5kR6ReQReC8hN2PH0PbMA&X-Amz-Signature=b305a2a69278856ecdcb1de8801b9d3b8b114b467e5c5df835bbeb217184d4d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WT23R4LM%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDZTfjnXP2di1zgUGHX22UX1yaU8PuBWYiz6qIGTLLtXgIgdR%2B3ZNAooaFEk2Nxl4HK8PPHATNHBVulqsxuagA0y%2FMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDAPcnvY%2FrTG1D2%2FRJyrcA%2Bfe%2Bo8mBGDLgD5JKidilV2GNcotJxRQ1QAYib76b1FCOFgjRDi5An%2B7bm3SYwk10rZ8Zlx5w%2BM45gHhpWYEWDRm9f4uYTUVsn5ohOvq4tGNUZpnacgU98%2FiXuAG1DxyktQ941ZP4A4aaZuTbTcVxqkUkE0HM1ZNun5zfbu5jtrbA%2B66Wg5FBHXxi7cfCYpW5DBIe0%2FzFWUlsVkpOgpiVRQYcsqDpf%2FtHx9dQp0yPoKGK6%2BzzUqVBZz3%2FkUUZQiB9FPcvGyOXboSjZJo6qGLNm%2FQK6spi2FR7ee7rGA0GpA2laKmOawcBbjROO%2FhZfO80ci4qKquPfOFNzgPiVUhmi7vsrdCVrfBd%2FAGLW4SMEGx62fHG73TIoi9r66ugVnK7MT8LRgPL8tVHCJ2SZyZKkRy6%2FgSDKYl36hIyQ40tHehgOewA8geNRBlQ%2FaegkkLsTOFr4z7LTmRIrwIFB1UG5VvrH6SoDdmkNvCvQr8tL3YWuvOMQ7LWB%2BjeXtZlwEbh2ije6MBOxrV4kcxjnudGJyerQEyrDQ57e2Tlwn1UJ7IFxEtzxPJqchr1lk3%2B3C3V%2BGfyruvln5WrUnQT5Jq6qMXXgyt49ZzLRMNrwcI%2B%2FDJHr70cfVEvpXb%2FqqEMJqZncsGOqUBNAmIrjdxeSMtiXZnIDN3wbLhWssV7IQ40Fo0ZB1c42qnttPj1D0yip8HswFGM3DvKBS9V6ffVOtSxT1M5xdZ6VcwDMOxT6Sq0wdprIMh0hL1O4UEBmMT2ZQpIljmEyyzQxJIYLa11v5NHOXImP9o1VONyPo8uDCL3Db9fVzlc1W5oNh3CWMT8Es8ze%2Bge2ejoY6gNOd5kR6ReQReC8hN2PH0PbMA&X-Amz-Signature=b8b0b5ad94e70a7151f004429549654daf1e8d5c9192332741e5d2fff9559c03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJQBBN6L%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCctQUG8uIGeqCMIOl6ZW94ORjJme128Jsi8mKmXoCbzQIgQcQUOK2A2ZExvPq3fZ0PjIWw5hLE%2BifAoEaGzdo3FKcq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDEbq79hznUVcN3tj3SrcA4j8mEGTaMOMPU0%2BU2H1msdkEo6MpNzFicwrigeC2XJj%2FiQ09qZAeS1VP7zPt4MkCTfUHhLqZTpvus%2Bugzx58ug8bt0di0BVy2mD88VJc6%2FPAYq1EjuKn0Ot0v8%2FW9Hh8BkkZ7iquu1sYLnOqhkyBg20kHhojHbgyOgVdpC7FaX4tTy1gnO1UuxuoyPh4apEi3lYFtqRW0%2B1NXVW6YOLwZjQwAhh9p1qllC1ozzwROOhGxtdMgloWijMTItPSvs0Q6%2B0iOHwBsWnL7fp0wq7tCjtsEHo6ob97lDamIqdny1roS4cCv%2FCxRmenXeCXQYrj0zZ3tiyZTUQml1ryZ4%2FLSzQ2mNv%2FJj8WAp6kYpBlbO%2B4NdNEjeOW7GSRa0tUuzOZQ9N0AqJ7I7TaoGXCtH19JZt2G6kNAUjo0BkzOkCBvu%2Bxg1HFp%2B1Oqk91%2FpjN7stml%2Bwv26xOADv34%2B4XdCflFWtv1vCQOiwAF%2B29uwvEeVH%2FKdk2yljR1eX3VFVDsI7mmmpfkt7PamHCxDF7SUHOXBsmCD5yPWBzdMcRoV6MTLfhi45d%2F3%2BbJzGxrzhGyqfObDCbhHGkKEOZ5nStMCMsvcVgvP6rAQkfQU3sJPb913RiRZqxf4QxfsNy1M2MN%2BYncsGOqUBFJwjWay%2FRyPFVZnF1TFVstLNBM8Dpj6y7jq9zbQ9l7mbjbcRv%2BTC6Lb2Obbynu1%2FfCuF32E5CUKLoiT9CdmFc7OKFxu8Wdv%2B1ZdsgCgwZOPWB1U54%2FcfHXLs2OX2HQRjLcByTuAt92BNqcpHgJceIkS%2Br33anmWm%2FDYKR353FU7mGEJ6mqF3mMa1Qi9jokV132fuy5w%2B8brmgMn01GgJiagC3rUp&X-Amz-Signature=15576b0e19802e16b1a059aa61c350022f40972a8cdefcea3e4b113f8e9c0a95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XK2U7YKU%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCIg%2FrBoqsEeK67vz6L821Byzjn5%2BPunCUmpqmVcCiHdwIhAJvbQLU31t5Hk%2BY5O0ZcvXlsnCK1cfAFkfEJq6HrZrG7Kv8DCBgQABoMNjM3NDIzMTgzODA1Igxmq2FK1t7qWUu93Gkq3AMgo9UBCPVTcuz9WTERuz6%2B4jr4H%2BiZicSWPAQtjq9HN4oASjp9w1Q8Kqn7KXx0uoA5vIsfOSNFlhumx%2F9nROjFSe9A0jOfcj5xXGOk1WcwngWNOOuoNqUurDe%2FeGlUEjP%2FpW4NmBH%2BYstkqvhZ%2Fp%2BkBP4aSpO1Pzw1g3gQsHeB5LBav3TicA26%2Bljch6DQ1GxjBSqBB%2BZ6m9Ndx61Wqai9UWLN4mjG47KuQsucq5aRFDmSpToQpWOx2UYsEeknoCbf6lZO218fgAjghHN%2FaJF5QAJD0KY9HRIKGJm5Ms1WCvyUklz7tiTIsPQoSOS9tBgdJgayURupbvPKgeskUc%2B6x4HsHey6do6Znv0SBI5J4Oe%2Bkim3leHpLHENCnxtvgLQb60bYGYznIgipOASfw5qUEDtx8I9Pj3GIBvvvfnqTvhPdY7TJTPG2AfJmA5QqbdK8oirKwLO6bnBS3BLyoMWxulM8Sdl6fSS4a%2FyuWYFihnKvjAK0V96ZP0le6kQMg2Ia2F7P16hu62GS79ZN8jqn%2Bj2r9EtgIl4tVI1KcLJx2y%2FCvAnhIxWkUieb%2BsHqEMA1Rts3bog%2FN1%2B%2FRnFFsdWkoKAjh7FxMQhF%2B8ojvrjU3GIH6YzVrR9%2F9uLWzDM%2BJzLBjqkATXNtyOzG47Mfu%2FXUEPEq8G8j8Xg1KclXIMRx6tMZWDJgjQZriLD5Mpmq%2FZAVqUJiDq23omX7Pvyk%2BxHzoW%2FEsc5hxK8mVg3N2qWXny1MCOPX4ThjyPFQQHoKMmcdXUcQwnDpJkf7Ag%2B%2B6Tb5KmPl11wdl78%2BXgtfvexspJNW33ELBHY1wP%2BNupN5ks%2BGHXyZ%2B02cH%2FnpEQnIGYQV2mv%2ByjUQ9T%2F&X-Amz-Signature=27ed0d67cc488493c2e0dfdd887c7fbc0522bf57e3055739d38b978a58811f27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XK2U7YKU%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCIg%2FrBoqsEeK67vz6L821Byzjn5%2BPunCUmpqmVcCiHdwIhAJvbQLU31t5Hk%2BY5O0ZcvXlsnCK1cfAFkfEJq6HrZrG7Kv8DCBgQABoMNjM3NDIzMTgzODA1Igxmq2FK1t7qWUu93Gkq3AMgo9UBCPVTcuz9WTERuz6%2B4jr4H%2BiZicSWPAQtjq9HN4oASjp9w1Q8Kqn7KXx0uoA5vIsfOSNFlhumx%2F9nROjFSe9A0jOfcj5xXGOk1WcwngWNOOuoNqUurDe%2FeGlUEjP%2FpW4NmBH%2BYstkqvhZ%2Fp%2BkBP4aSpO1Pzw1g3gQsHeB5LBav3TicA26%2Bljch6DQ1GxjBSqBB%2BZ6m9Ndx61Wqai9UWLN4mjG47KuQsucq5aRFDmSpToQpWOx2UYsEeknoCbf6lZO218fgAjghHN%2FaJF5QAJD0KY9HRIKGJm5Ms1WCvyUklz7tiTIsPQoSOS9tBgdJgayURupbvPKgeskUc%2B6x4HsHey6do6Znv0SBI5J4Oe%2Bkim3leHpLHENCnxtvgLQb60bYGYznIgipOASfw5qUEDtx8I9Pj3GIBvvvfnqTvhPdY7TJTPG2AfJmA5QqbdK8oirKwLO6bnBS3BLyoMWxulM8Sdl6fSS4a%2FyuWYFihnKvjAK0V96ZP0le6kQMg2Ia2F7P16hu62GS79ZN8jqn%2Bj2r9EtgIl4tVI1KcLJx2y%2FCvAnhIxWkUieb%2BsHqEMA1Rts3bog%2FN1%2B%2FRnFFsdWkoKAjh7FxMQhF%2B8ojvrjU3GIH6YzVrR9%2F9uLWzDM%2BJzLBjqkATXNtyOzG47Mfu%2FXUEPEq8G8j8Xg1KclXIMRx6tMZWDJgjQZriLD5Mpmq%2FZAVqUJiDq23omX7Pvyk%2BxHzoW%2FEsc5hxK8mVg3N2qWXny1MCOPX4ThjyPFQQHoKMmcdXUcQwnDpJkf7Ag%2B%2B6Tb5KmPl11wdl78%2BXgtfvexspJNW33ELBHY1wP%2BNupN5ks%2BGHXyZ%2B02cH%2FnpEQnIGYQV2mv%2ByjUQ9T%2F&X-Amz-Signature=27ed0d67cc488493c2e0dfdd887c7fbc0522bf57e3055739d38b978a58811f27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E5GUR7V%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T080126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIBBY5kYnWo6lVwpKYUt2ilq4okl83h8gfRFQ05Kgg0rCAiEA34aY3K7qwZ3FrEtBs9fVRWNJ%2FnXM9nQGKC7GfvEViR4q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDHpFRQF1XpIzbs3XcCrcA0Ni7GpmJTOz926GC%2FIMAlm3PmI2e87REuTk3HoVCU9GFhQ7QZLNRGvAgR54nFuRRVrfULCAt1Zyt4YNOi206qKU33mvKRMw8NYE%2ByLb9t1yDJ3s4u8Dqo7fjfDhi4Ka34ogwc5thvx4fxVnd5dfwKcElvif59FEcfE6wc83xvA%2BsCJQl8KFVedYhC2ZcBnpr8iDVyny%2B8Y48zOA%2FZ6iL%2FqGHjauHFkqmZpwaauX77SUHlRxVUUK5K8DIWWvA9sUA0UQdSa1OUUMqKWbIEARhlarKZJssDrKQJHiQsBBOmwQgdVczbS2aR4ybGLC7f8p7La8opZzRpaH057OPk6G006%2F4vG3PogESca1SA7DVfTaEkKCtULoGDkN668cDKFJO6KBBMwk%2F%2Fn%2FldpUQ9JcmFNThXbTcwXrArjxh1ZaA7T79FriNBL2xI9kYy0tebjYgHSMzjb6EuDruxaF4FYsxEuM%2FxOJOSE9CJ6mg77LQMRw7ZeZs%2BzZ3sT7vxK%2BzReUIrcBg%2FuAqYG0tvbV6s8U99chLZz3HG6ojwhjTe2YSamc37iXwjfu6GClSfqb25LBKS5sK6WtE7kCQbLl8vPKiYjO3HNRr7jIKGvJn50%2BZrcW7GAkS7zU97NdW2dnMImZncsGOqUB1Ks5%2FJuRS6vypbbdwmZajYCm4GDAHGVBPp%2FnWTgWGsIyUew3EyuPROnzOuXYRYX20cPs4K%2FfdG1erSx9BunXFuOsQjDKz%2FNTiQgQiVBERtV5%2FwxwLDijFxUpRRpYhn24HSq7u7%2FUaEGHwY%2ByKoB6wdiG6xKy8oYrVL8G6b%2FHLuAjGWUCEIAzGtZYn1Jx%2BDvqYmUanWv%2BoDZKsGHuyO73aYG8JsBb&X-Amz-Signature=0fa7349f49d7671ac99f3fede1ab0e08b6c841500da4467b5f14ba112e8dbaf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

