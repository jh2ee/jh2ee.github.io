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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FSLCF4H%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIGohdFYhO2TozwjnzJJVpDOPlaFL0KQVkEUrhLghmoaNAiAFRCYugY5daOxxW8RtXWp7HjGeUg1K9j4mNk5DyWU5yCqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpjKSxtXXms61uBqgKtwDXybQY2xjJfJpIJXBj7U17LXUkHtX2BsURSK2nwz5%2BHQwlRHRJaerR94KM%2B8Lob3CBv7cS3Gl0PUTJKKpCA4mpq2jnGST1EC3CiSJuqo4K%2Bkn7wAM9DEd4uWsYOHLWEuB35uXWVytSHA%2BVNkPXgzsfjd9se6ar773ld8CmoHlE7MbYiWY67OqnFmLg8pIeoiqU2K1PvvBvS3wOUNSarrqzZPJLN7UK9CNS7rBaFDtrf3wqp9B7IYBEPcCx5Y2en%2BlvUEcsfiCozJWNGdAmgnGAaAjNQaJZMMhNz2vSdH%2FUsmS9uFFbr%2F7uX%2B82J%2Betfr6bV9CYqrV8Pw57zfl22gYiC3eDMs%2F72JRmVWw1W7mKp%2Bqtkw10hKESyo81INW5os3e2Q7D68ctte9Ar%2FCMdVSe8IzNq58LT2s0bEwJsgo5dWPksJtg3BEIDqQBDbT%2F%2BXXEK%2FjSuEecltbd0ov939Ln6uWgUGeRCR5w5dhGNGLvESMaVC1K9TrT%2F4F3N%2Fx9oIq63V6FU8O6Xx08Z88F80QseSmnMUHYO%2F9ZtOTJ1TKQacBYcOiddEu3Txlt4%2FVXX1rgbM3Gc4ib%2Fx%2BEgG3zzaR9IMstldwQUuSDbIsTVPSZ%2BgTceCHHcVwlVl%2FU18wiujGzwY6pgH08SsdMW5uQuc0eHEJcxuZt9SqqaQcy3WKm2zVJVRv3WuHHSPi%2BdCruMHKcE0Zm3LqDfswh86i%2BOVGHnmTHq8ei7UJ10uphkcL3EKREBh%2Bgr6F9HAjKxua3HC%2FS%2BkV%2FA7iVXIwrL2TJDRoEZEFnP6Nhxq9wBw5HIbwIQ3OAP1eH97z4abaQ2TyLYD%2Fofw%2B8J4PloxQn3ZDS3oLrldw4KlvObJfiMnn&X-Amz-Signature=85965c79f79f2f00d8303333a3c54020016d8e46df0a264cac013de0566b0a38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FSLCF4H%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIGohdFYhO2TozwjnzJJVpDOPlaFL0KQVkEUrhLghmoaNAiAFRCYugY5daOxxW8RtXWp7HjGeUg1K9j4mNk5DyWU5yCqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpjKSxtXXms61uBqgKtwDXybQY2xjJfJpIJXBj7U17LXUkHtX2BsURSK2nwz5%2BHQwlRHRJaerR94KM%2B8Lob3CBv7cS3Gl0PUTJKKpCA4mpq2jnGST1EC3CiSJuqo4K%2Bkn7wAM9DEd4uWsYOHLWEuB35uXWVytSHA%2BVNkPXgzsfjd9se6ar773ld8CmoHlE7MbYiWY67OqnFmLg8pIeoiqU2K1PvvBvS3wOUNSarrqzZPJLN7UK9CNS7rBaFDtrf3wqp9B7IYBEPcCx5Y2en%2BlvUEcsfiCozJWNGdAmgnGAaAjNQaJZMMhNz2vSdH%2FUsmS9uFFbr%2F7uX%2B82J%2Betfr6bV9CYqrV8Pw57zfl22gYiC3eDMs%2F72JRmVWw1W7mKp%2Bqtkw10hKESyo81INW5os3e2Q7D68ctte9Ar%2FCMdVSe8IzNq58LT2s0bEwJsgo5dWPksJtg3BEIDqQBDbT%2F%2BXXEK%2FjSuEecltbd0ov939Ln6uWgUGeRCR5w5dhGNGLvESMaVC1K9TrT%2F4F3N%2Fx9oIq63V6FU8O6Xx08Z88F80QseSmnMUHYO%2F9ZtOTJ1TKQacBYcOiddEu3Txlt4%2FVXX1rgbM3Gc4ib%2Fx%2BEgG3zzaR9IMstldwQUuSDbIsTVPSZ%2BgTceCHHcVwlVl%2FU18wiujGzwY6pgH08SsdMW5uQuc0eHEJcxuZt9SqqaQcy3WKm2zVJVRv3WuHHSPi%2BdCruMHKcE0Zm3LqDfswh86i%2BOVGHnmTHq8ei7UJ10uphkcL3EKREBh%2Bgr6F9HAjKxua3HC%2FS%2BkV%2FA7iVXIwrL2TJDRoEZEFnP6Nhxq9wBw5HIbwIQ3OAP1eH97z4abaQ2TyLYD%2Fofw%2B8J4PloxQn3ZDS3oLrldw4KlvObJfiMnn&X-Amz-Signature=85965c79f79f2f00d8303333a3c54020016d8e46df0a264cac013de0566b0a38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QL4CZNV3%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDh2lDT6GtxdWaBNCF7pddZ%2BsH6F5JBlHJ8BKFad1iBwAIhAL%2Fsn5%2FWgfxCePV9LK6TFeNuH%2BfMEiAj9SmV7IZuGqiyKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx7zWs9uAtW9IbDoskq3APEQpNjqAk4pAOHtAMLmArtK%2BSJVSdThb%2Bbea2vSd8cayJfh8%2Fsc8sLpRsfRokvUY7Kv%2BGohxrLiXyYneocWlDZDO0UrttkDiVfmlYs%2F%2BtJ2Qq6W%2FfRkwMwom%2FJl2dmoX5UW5kA%2BJNAFmtelJPE5I9oe7%2FWId0c5q%2Bhzo5%2FMYMwNJYyHydYIuVBAjupVCec31MJbGAJAelB5a2GOn8AydQwNXpPi3d%2FGZws2qei9%2B2JQCI40CEymNXp6pOEr7mIpiIm4%2BMYQsdwFpofrQAKhau3q5tMW75KpxsB1EH0IMHbU2O7psBRm57lkHAywKwGz%2FUg5wZ0%2FLrolnb83GwdfuTExxn7pxnuFbPvzXUr6RSHsW1tDqWigyfsGdigfRikTnC7e8NH0ELnFtK6aKx%2BHXI32XBUtD5qJ%2Ft2%2Bpfjdj9PWZ0F2u%2BnM7Hb9slXg2tcXTROYwD8SGTmqHWCvNPmUnmGjmxP%2FjCuQ4GfgUo1NjlQdNJvlNh4JdM9MpbUsomG88RobmgokVccZ9CoEpGptg5rvh4%2BME%2F1qO7UtMJPwNBwWt7HPCNTI%2F91Y6iubZ%2Fb3DR16k1ar3Q15rBX%2FTrV1uUOOpQEIh%2FhLE3w9ek80tuCwjOoaYZdBZuSfvUSKTDu6MbPBjqkAe5ilzJzsm9cLpNk82zi%2B4bwBEHmFEQopatkA4rIZvf16bz65afbbmTgCefwP%2BhTlcI9UWrUdXfBEyx9fyTJsJbcyyaorKz4RyL9I1Kdyq%2F4CTUwPXBjJJIpFHVMlR2rwT9dEERaP7qgBbwHCwdm%2BMywdSeWo8kMNMd7o9WFiiLXWahdAF%2Ftn5yoM9yePnOk1vwHaEQWNmOnxqBHT2AgFBFDeABb&X-Amz-Signature=d7cfa5b4c4fba1f4fc0dc5eabc5ad30af5262c16a4bb6e769cff0989715a11eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P3K7BDR%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIGqrPvz8Gz8X4MwvPeLxWjM%2Bl2msoXP%2Fl2O7VPICrzQGAiA3JBDBA%2FdkaNER6%2FkpvGWhiLlq71Y8Hp7twRV21jNImiqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpuh2LkO5LNOchyPWKtwD5SZzjufFZYg7XhUGrKyW9E7hYjU%2FzEC%2Fas9ZzGvztzoMCfTJP1it4tS9sZGwdRr01f%2BziMvEjkJ2ydAWLoDQ%2FQmmEsnr4w3aSmSRdfmUXetA%2FABNu%2B3y03C0rodA0pgaYoByOkAylWpaSicLz3mqmgm833TwbmIIQft42hK0pO40Ex2c2oWTfetItTwQfNPZfwB5E6p7YVHOFgUBi0%2F2Ciopz1xlKSI5qzuj0YfM6xT8%2B2yqJZtDX58uA%2FieFTFXkNOKPGHQgNCNeQIkkTm3xIDJHFjA61jnB5p3bGQ9pH9Ecv99bNCKjfz7SgPpvlbVkAHyaOvbDXIwqx%2BANVsHdfOOT69aB9bwymeeInQ6CgoU3q3hgdUiQzoO%2F%2BHyvQEgROiTFL0ws1kIcNn0IFYIM1PRoMhrkfbdqTZJfkLFNDQ64WkEd4yVYcVlEKEp74uUWBXq6xxjCnjHkBtSHuqDR78NbYTt%2FQi4EaETU2clHBYziyPjmjM6PynHI69wcwNI%2F2dvyehmz1PjvWVv61wYpk%2FFJJeZSiNjyEzj8BYvIvMMrdv0r3YmqBZ%2Bo9mUZjJtbfxwH0ruzhaByY0ABlVdqJKHXCsXPqZIvwxLTEkViSWguqvYtwbaqy725SwwxujGzwY6pgEDDmM7OCwhqoKjuTPZRTPp7ISVlOUfwSjVezawPvAijAn9mi3g7BsU7%2BX%2FwSR9fGIUxHc3DcP%2B0VWP%2Bjkfwm3vTg5MtG5g8ttcfVM5e4fLUUiDKHrxX%2FXQBGUk%2BNIVhyskpMQWBM6myTlzbe0PLWFM%2FFGUnI%2Bc26I4Wdgi2UV6cRBYYDI3Y8JM5dgDdxw%2B3uudtSGYW3PC6%2BQEDmea9KBQu6ZW6PsE&X-Amz-Signature=871bf9ac8ce11ccfa6c4aab137f22e2652483e2dc3a9cf1033f0623acd0c94c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P3K7BDR%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIGqrPvz8Gz8X4MwvPeLxWjM%2Bl2msoXP%2Fl2O7VPICrzQGAiA3JBDBA%2FdkaNER6%2FkpvGWhiLlq71Y8Hp7twRV21jNImiqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpuh2LkO5LNOchyPWKtwD5SZzjufFZYg7XhUGrKyW9E7hYjU%2FzEC%2Fas9ZzGvztzoMCfTJP1it4tS9sZGwdRr01f%2BziMvEjkJ2ydAWLoDQ%2FQmmEsnr4w3aSmSRdfmUXetA%2FABNu%2B3y03C0rodA0pgaYoByOkAylWpaSicLz3mqmgm833TwbmIIQft42hK0pO40Ex2c2oWTfetItTwQfNPZfwB5E6p7YVHOFgUBi0%2F2Ciopz1xlKSI5qzuj0YfM6xT8%2B2yqJZtDX58uA%2FieFTFXkNOKPGHQgNCNeQIkkTm3xIDJHFjA61jnB5p3bGQ9pH9Ecv99bNCKjfz7SgPpvlbVkAHyaOvbDXIwqx%2BANVsHdfOOT69aB9bwymeeInQ6CgoU3q3hgdUiQzoO%2F%2BHyvQEgROiTFL0ws1kIcNn0IFYIM1PRoMhrkfbdqTZJfkLFNDQ64WkEd4yVYcVlEKEp74uUWBXq6xxjCnjHkBtSHuqDR78NbYTt%2FQi4EaETU2clHBYziyPjmjM6PynHI69wcwNI%2F2dvyehmz1PjvWVv61wYpk%2FFJJeZSiNjyEzj8BYvIvMMrdv0r3YmqBZ%2Bo9mUZjJtbfxwH0ruzhaByY0ABlVdqJKHXCsXPqZIvwxLTEkViSWguqvYtwbaqy725SwwxujGzwY6pgEDDmM7OCwhqoKjuTPZRTPp7ISVlOUfwSjVezawPvAijAn9mi3g7BsU7%2BX%2FwSR9fGIUxHc3DcP%2B0VWP%2Bjkfwm3vTg5MtG5g8ttcfVM5e4fLUUiDKHrxX%2FXQBGUk%2BNIVhyskpMQWBM6myTlzbe0PLWFM%2FFGUnI%2Bc26I4Wdgi2UV6cRBYYDI3Y8JM5dgDdxw%2B3uudtSGYW3PC6%2BQEDmea9KBQu6ZW6PsE&X-Amz-Signature=3ddde54955d65541902d299f83f35207f1b568ac4f0b36282d1c87048a150696&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4WHFIHE%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQCiGE6BKZY8CN1NjF4iOxkk5nyWG1A%2F9U8%2B4h%2FVH1i%2FBgIhAJEqpxjx5ft1KdbT%2Bt8iyIbGRdd6k4i1ypdRDtbm838BKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxpBse0v2Rk%2B04QFGcq3AMP4Akj4eOv5m3SJAcCyopCYm55ptSZklmaoQFLt%2BQxLo5iucewuC%2BBISLS5SF1DUCkuxsrIQLep5kQ0g9qPhEZ0Px9kZmGNO%2FrdrKw3Fuogqj6jFYDd0QwYqtk2NikZ9wXk0m4WdcM%2Btoc6OUe9qrDbBe66W4TC4xY6Z%2F0Gqq%2FRLy9N4MuBzGgKDZ48EhV7ZTjUPlvEHkmWq7%2FD64xO7tZDYqjPcyivxogNVtpnhqTtPVo%2BAFCrOh5xx9hlu4eq80uMkg8826DXKhHrQ0HO%2Fc2qnZ9RfV1li6wgGWgToEIhjmDt25nEyRKIdzLdiIekJRtTdGI%2FlcGJkU3GGemsRLMC009u1jyUa9b%2BG3Pmk5M1JS%2Bd5lDjUJ%2FnuOc85hDE4KBBoj2YgKpXoGssTzwOlnkJvzaPMNixYox5asbDHJHxxWjJgwP6jmIyluNSqXStE%2B1B4%2Fy2AVf7oB38%2FGHl1SIIPhy5G1ngSF%2BhtAUAj9qUiqBd9PDnRiWrMtfZzmDg8BLL96NYFKa46i8pCsLUOoN7zyfdGfPDCisys9UOoygcWYIm1uOg%2B%2BeTpXXqQCq7WnUuHYK0SU%2FVq%2FljXWWE6TsLJkF060HQV9PmhxeuDvrZN3UB65%2B60zpe5JKzTCE6sbPBjqkASkIsSEdoC5rZqh08YROuXd7fJuSz6U5%2BG%2BIYQf5ZJHEtfcXV%2Fv2qD7KupJU320rC7EtzMajp9ClJ6Fek7KJgVnNZ1DoGxWVLu8BJasw8VtyIY45cq61eM3ZWqPsnAs8kzkHkqgd9ha5ubkabUXIIARkyqiejePEJLBPRUnYaP0jfLaYBdn%2FIZmjU1N3facDFGiLZf4XytLktELKoODxCod4MISG&X-Amz-Signature=77c8ca365c048b9b7423c522ef2119c6ec8d052161b44cb58c3e5eae99fb7854&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ5G3FGL%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQCLieAnVTDtfPbe5Qtyjd6zowygK55zHp7X8Hf9XP2E1QIhAKgqyagqUSB5eCMxllhz57hqhchrwoWVqKEP8xcMxOQRKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyft4sHfRKhPRtkhtMq3AO5%2BLWPMVMOOlmSP5DrHi2mtUSNDUJyQdlZzlGRXCNjlr3sQYDzNndmTIDi%2BZCMXqQdexbAW9dnvhiSyPzVQE3sFzpWr%2BCNsi6Vevoq2KZlCyEYNfP72KrS7KXMxptgWzOzDO63sSLPT2XWCt8v5pZ3DlIxTNWBXt4cAhTdtj94nQYM27e%2FUgDufODN5Gt7KIihNsIFHuVndvJDxq2V5c7vVIw9dVpabfuknAyVd1N0Fy04hbYIi955yTwo3XsAcC5sId3HM8%2FsAgRj83xecupQWQZtPnjZGi%2FkQwy8XSaqKz0Opoj2SXRWb%2B2KmfXZX%2BCTPRikGkGJo1EqgplC4Pck%2B4ayFiVOOUQJiXI%2Bc1qA78ZSkc6r9JOVF%2BQKQcyIbdIycmSgWfc%2BCXMv6AWmdpTpPYHMr%2Fz9aVReBIiRnBwRQsdT3OOyx%2FkzEnONJ1t06wI1JaXzp2lgrv%2FcDy5JawnJG0qM6kQgwKvPfB2Dm8Hw1WALh4REGmseGPRpvsWFkUytrug%2F101McoV1S6WmLxIaUrbNk82xqJsbrWtBQ3iKNHoq8yt9qP3zh5uiwgFSfELTIa9qmdc8A82TrUXv%2BDHe9P18FF6VoNnJBUC00WNIYlyBM%2B6VSjhYu0o32DDw6MbPBjqkAfbPjpNPJ9xSlRPcLp9j1YLKIfLhlV%2BNwpSEtELxknO7Rokk2z86gJaE95WUUD6YA%2B6ef%2FmR%2BpFY75kzzjTYEtjSM4nqKH%2BTmDrDcVdync4KHWPD702YN%2BRmMsJCP1hSd4g1CQ62WNi1l4anYfIRIiE%2FmpURLy6HPrzR43FLnKiTMlPmmIt5n6GXwEVJGb4t%2BTrlCAO52wzJd7ZxyEBH8sVhTSVw&X-Amz-Signature=e7e32d02beab6a04c3912f0fe12bc69855c29d1c2274ec281fdf46ce124cdb36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675DZKUGZ%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQCG1fLdL7qAtjWC3O30GngLpXrQigmrfAKfsk0bLuviEQIhAIhU875LuuOTLm9VY80s%2FbRjagxC3ANVM%2FjJwi9isiAGKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxPeuhhj2QqWxrnhwoq3AM7ckcA3Y6sfx7LNb3dzI%2BlugwWECYVeTKrM4w%2BVqO7IdYBOiF6%2FA%2FmjjPiiHhl4Foo17mLGXC5S71rjkH6ZOFPOmgjx3Drf%2BbJItOl5wrDKxZvK6lQzSglMcWZZXZcga5B%2BVTfLNf%2F6W9HQOPts6c0RTCIKwSTHZWCmvyPfeF8hWK4Bwc5qRvCGnIqJXqrlSQU5V57juuX74IgEVqfR8X3HYLhKI4ygYvbrvMte8G6mqrO1FS%2FG4l7oUOLoQ4Ka9EU0Tjtf7ANfKNdlgRyYnFPTUyvadEbt22AxucNB5bWd7iOTs15eVv8LtxHNO2NjJWshGY9wYiGEimbfUHFwrTVOFOy7iC%2BOZwdo1WnRG3%2FjhyKlHkQE67NvDwfDneE6KKh1KWLuIog4ZGQ4FMxKtEGSWFzdHT63%2FTei%2F2A47%2BtxFg6RWI7OPo5D%2BsLiHr%2FH26eZCDTnmjSqy0ycaYQP6AmnQJJIrmKIu4eyF1EaxGD8kWSfLmLY1qLdxe0qf%2FGgrKGqrxkGP9biRtcRUKTLjXUqPqNrr1rVvDNsm7c6yVWVgPlRuGiLvQF8hFM%2BiATIJLAX03FqH3lj4aqm2i0TARwagkQ%2Fc%2BQDDezS1rO9v%2FUCOElilovgxx6TN%2FQeTDZ6cbPBjqkAcvSPBuPxTixnuwQV5cCXUF8Z2Le87uO71k%2BnJ3ThlU8VLur8vJj%2BxB4f0397CftOwschFxW7c45pFxCtB%2BS1m8ALb%2BDpSdqq1lQJE6Gqc%2FGdmoJbovZqEgArsl56JCfnZpFPQCLia%2FMqfIYUYyYjAgs%2FvJ9ocUOAJvmt4xe1vDOoEVG6xo2zLX3pb1JVkPcEGLdbbheDIHDzkOFCkCyXo6%2Bqdjj&X-Amz-Signature=141edd167e795e77d33c195fef1d93013a3d4514511c548bd5a66d3deccde153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FPN7CTY%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIGBoxds9bG2OvghKWQqebuDho2TZxzz1%2Bz%2FAn8SQ3YMOAiBVd7tQDTR6%2B586JrMTApTwnATbvOpi7SxdYoWy5eZ1gyqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcD4g7QSkW%2Fp4ZXMeKtwDbRsbkhhlz58i8BR9R7ptz%2FGXgGxPqpK5%2BqHjn0TAXw4ZwxalGaRaBCbCCW%2BI0BRLE7dupct7DAdKu59nRgksGAZN%2BzBxtmeAkpeTtDpvBuCveKwaTMmrDRMsxS%2Bzwq8VYEFk5fIlSADwnQt1I3S4LXAUE9nuxaKsc2Fk4MT%2BwmL1zIvN0Fk99xtzBgza1rqd0dswW2kcPvbYuj8fAK8zo754P3TIdEmnJp147%2B2%2BmQB3ptf4YDn5XkieDenh15%2BaNRutxG6cdqGiiHMBmDVxuz39PiCV9f4ecFIz%2F%2Fyi2gNyhehACTdboyu9quUwr4rtqOedS95nyUGZY%2BlRTQbxJDiOneMKZFzoqNpXIc0K3zn%2F6GMDepzdomtx4vpLfGikFHUXgKK2XAgo%2BpNdS1gPrENfuPxHBuuKiWoc1p%2B%2FnmCPUxaWtzRpfh2ZmPS24m3c6OseTRg4hd9BlDYoKeQwWdIgxQyvC0mVyi9TNkC7Q0FNgE3W39CeQhc3Mcyklom%2F4jUSGC3RS2s5Kn%2BYpwRpla3aWFee3a57PgMOj7JDnpNwf4%2BeQKbN6uzli4k5lIWvZIGy%2FJ%2BUrVB9hiCwcKkRkfW80lpVsmXn7njPM1tSpY%2BUsCstyIA3GFExX8owu%2BjGzwY6pgFLhuAW0YLu698Ncm9DCiRMoJxNp%2B5VQsWl1n6MCudEqtN6Prd30KRB%2FL0TAKKTpP4QoSaUz4PIUvxM8%2BmpmZtKcuItG7B2hSizXeWv89EDHiuLjcFWYvQcWMgc0lGLNzBWsL2SW%2BPAm8lKW5Bcxa7IMCP0HKkkeUhsU4WNL3VY8oxfg4I0RilApwyBNa4pzbiT8bQcp4av3wh1GfBBJYEtft1HNC68&X-Amz-Signature=80265aadee8b7d90f3a16cf9eb298716be9946849f66dff27e60b898657d1ea8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FPN7CTY%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIGBoxds9bG2OvghKWQqebuDho2TZxzz1%2Bz%2FAn8SQ3YMOAiBVd7tQDTR6%2B586JrMTApTwnATbvOpi7SxdYoWy5eZ1gyqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcD4g7QSkW%2Fp4ZXMeKtwDbRsbkhhlz58i8BR9R7ptz%2FGXgGxPqpK5%2BqHjn0TAXw4ZwxalGaRaBCbCCW%2BI0BRLE7dupct7DAdKu59nRgksGAZN%2BzBxtmeAkpeTtDpvBuCveKwaTMmrDRMsxS%2Bzwq8VYEFk5fIlSADwnQt1I3S4LXAUE9nuxaKsc2Fk4MT%2BwmL1zIvN0Fk99xtzBgza1rqd0dswW2kcPvbYuj8fAK8zo754P3TIdEmnJp147%2B2%2BmQB3ptf4YDn5XkieDenh15%2BaNRutxG6cdqGiiHMBmDVxuz39PiCV9f4ecFIz%2F%2Fyi2gNyhehACTdboyu9quUwr4rtqOedS95nyUGZY%2BlRTQbxJDiOneMKZFzoqNpXIc0K3zn%2F6GMDepzdomtx4vpLfGikFHUXgKK2XAgo%2BpNdS1gPrENfuPxHBuuKiWoc1p%2B%2FnmCPUxaWtzRpfh2ZmPS24m3c6OseTRg4hd9BlDYoKeQwWdIgxQyvC0mVyi9TNkC7Q0FNgE3W39CeQhc3Mcyklom%2F4jUSGC3RS2s5Kn%2BYpwRpla3aWFee3a57PgMOj7JDnpNwf4%2BeQKbN6uzli4k5lIWvZIGy%2FJ%2BUrVB9hiCwcKkRkfW80lpVsmXn7njPM1tSpY%2BUsCstyIA3GFExX8owu%2BjGzwY6pgFLhuAW0YLu698Ncm9DCiRMoJxNp%2B5VQsWl1n6MCudEqtN6Prd30KRB%2FL0TAKKTpP4QoSaUz4PIUvxM8%2BmpmZtKcuItG7B2hSizXeWv89EDHiuLjcFWYvQcWMgc0lGLNzBWsL2SW%2BPAm8lKW5Bcxa7IMCP0HKkkeUhsU4WNL3VY8oxfg4I0RilApwyBNa4pzbiT8bQcp4av3wh1GfBBJYEtft1HNC68&X-Amz-Signature=b9077acbe629a7a0973bec04d74a1526162494f884e671b36f5ae693c11bf8f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QL4CZNV3%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDh2lDT6GtxdWaBNCF7pddZ%2BsH6F5JBlHJ8BKFad1iBwAIhAL%2Fsn5%2FWgfxCePV9LK6TFeNuH%2BfMEiAj9SmV7IZuGqiyKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx7zWs9uAtW9IbDoskq3APEQpNjqAk4pAOHtAMLmArtK%2BSJVSdThb%2Bbea2vSd8cayJfh8%2Fsc8sLpRsfRokvUY7Kv%2BGohxrLiXyYneocWlDZDO0UrttkDiVfmlYs%2F%2BtJ2Qq6W%2FfRkwMwom%2FJl2dmoX5UW5kA%2BJNAFmtelJPE5I9oe7%2FWId0c5q%2Bhzo5%2FMYMwNJYyHydYIuVBAjupVCec31MJbGAJAelB5a2GOn8AydQwNXpPi3d%2FGZws2qei9%2B2JQCI40CEymNXp6pOEr7mIpiIm4%2BMYQsdwFpofrQAKhau3q5tMW75KpxsB1EH0IMHbU2O7psBRm57lkHAywKwGz%2FUg5wZ0%2FLrolnb83GwdfuTExxn7pxnuFbPvzXUr6RSHsW1tDqWigyfsGdigfRikTnC7e8NH0ELnFtK6aKx%2BHXI32XBUtD5qJ%2Ft2%2Bpfjdj9PWZ0F2u%2BnM7Hb9slXg2tcXTROYwD8SGTmqHWCvNPmUnmGjmxP%2FjCuQ4GfgUo1NjlQdNJvlNh4JdM9MpbUsomG88RobmgokVccZ9CoEpGptg5rvh4%2BME%2F1qO7UtMJPwNBwWt7HPCNTI%2F91Y6iubZ%2Fb3DR16k1ar3Q15rBX%2FTrV1uUOOpQEIh%2FhLE3w9ek80tuCwjOoaYZdBZuSfvUSKTDu6MbPBjqkAe5ilzJzsm9cLpNk82zi%2B4bwBEHmFEQopatkA4rIZvf16bz65afbbmTgCefwP%2BhTlcI9UWrUdXfBEyx9fyTJsJbcyyaorKz4RyL9I1Kdyq%2F4CTUwPXBjJJIpFHVMlR2rwT9dEERaP7qgBbwHCwdm%2BMywdSeWo8kMNMd7o9WFiiLXWahdAF%2Ftn5yoM9yePnOk1vwHaEQWNmOnxqBHT2AgFBFDeABb&X-Amz-Signature=220f1fe96019e510e441514e5f002fc0014fb2cacabecf6f9094eef79aeef1fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RN5MSACE%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDYSURRoalKtVdeTpDZWeWZ66kIXI3ix%2BSdGRGnWbABqgIhANezQ3cvUKL%2BdAyFuWUXiYsSlWAb%2BAJl%2FzpIMvNC4Px0KogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1131woFmNSGxp6pIq3ANwQrQtQsxdj3rk1BQndWMUx8zRYp1LrDpjmI4Tc2DLYcg1UmEFjyILmI3Nhv2lhbHyFE3X6XTqS99APRQpqETUxHvBJPwSZnz5AKwnorVHX66ayyUSI9HCdBGeYBRESS1ILaocb%2Bo0LW7kd6eGvVmq%2Bo0SeBfkEYME6Kawa5vSUjZdGy5JkzoNuFv%2Fp1ChoHj%2BzhVv1AjYH%2FtdRn4MzuVujKV1oNv%2FOn4fz7UVF%2BuvAh9%2Beg1o8sX2mZUA2bYvN0iR8lc9ZewBOV35WqorclDUicsJrcCU7s8yNicEk4ovm0oWJBOn6NmtBIVsw2q%2BONXou5c%2B%2FJCTtf0r46A1PTjpc4R29vwou5jjD6JdzXq1cepWGUw05e87QPUMwVeyrzFqky9E5qaCUOBw1%2FUrc72AXBN3mofLTJIVVFPvdn41%2Fz7Ji0Kp9MEt7yD5%2B7seolwI2a8lHljpg%2BdYRftRvZvkxfwm0cmGREkhB1GCTHo1B%2Bqj%2Br7ZLiKGNlGBvwt9y7VSRVs9z%2FJ9u1ICvaTdiJa72AUlh0siF7fIA0GRco9kQZDKxaeAHpndHNgZ9Mb84yM2h7ovq3iQQOxk0pLQoRBxOS1RT1e%2FkmNzioWmagTSwYo9lcQnyjGTAeo1%2FDCG6sbPBjqkAZ%2B%2BBkGYrhAgARvYxSFrBGlknEt3wqHIYGoDuFFPLO5oXUVUtMORhEs4xDmgeTObExbG4AFCsVuc7ka06sFwItGCU%2FEr3TLQLVjgI7x35ZomYzsqJqs74TxXeqdja2NVEmrAwoKKzvbVI521zJaDEQ4m1Y7RyPy1bUqd4Bacg2K891t5QbDL%2B%2F1A5k7w5Qi38G4WTdBYNpBpuPHYxML28Jch%2FVgN&X-Amz-Signature=2384dd7daa514a8faa7ec9b78ebf1da919869897e22dc323341ff374253048d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RN5MSACE%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDYSURRoalKtVdeTpDZWeWZ66kIXI3ix%2BSdGRGnWbABqgIhANezQ3cvUKL%2BdAyFuWUXiYsSlWAb%2BAJl%2FzpIMvNC4Px0KogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1131woFmNSGxp6pIq3ANwQrQtQsxdj3rk1BQndWMUx8zRYp1LrDpjmI4Tc2DLYcg1UmEFjyILmI3Nhv2lhbHyFE3X6XTqS99APRQpqETUxHvBJPwSZnz5AKwnorVHX66ayyUSI9HCdBGeYBRESS1ILaocb%2Bo0LW7kd6eGvVmq%2Bo0SeBfkEYME6Kawa5vSUjZdGy5JkzoNuFv%2Fp1ChoHj%2BzhVv1AjYH%2FtdRn4MzuVujKV1oNv%2FOn4fz7UVF%2BuvAh9%2Beg1o8sX2mZUA2bYvN0iR8lc9ZewBOV35WqorclDUicsJrcCU7s8yNicEk4ovm0oWJBOn6NmtBIVsw2q%2BONXou5c%2B%2FJCTtf0r46A1PTjpc4R29vwou5jjD6JdzXq1cepWGUw05e87QPUMwVeyrzFqky9E5qaCUOBw1%2FUrc72AXBN3mofLTJIVVFPvdn41%2Fz7Ji0Kp9MEt7yD5%2B7seolwI2a8lHljpg%2BdYRftRvZvkxfwm0cmGREkhB1GCTHo1B%2Bqj%2Br7ZLiKGNlGBvwt9y7VSRVs9z%2FJ9u1ICvaTdiJa72AUlh0siF7fIA0GRco9kQZDKxaeAHpndHNgZ9Mb84yM2h7ovq3iQQOxk0pLQoRBxOS1RT1e%2FkmNzioWmagTSwYo9lcQnyjGTAeo1%2FDCG6sbPBjqkAZ%2B%2BBkGYrhAgARvYxSFrBGlknEt3wqHIYGoDuFFPLO5oXUVUtMORhEs4xDmgeTObExbG4AFCsVuc7ka06sFwItGCU%2FEr3TLQLVjgI7x35ZomYzsqJqs74TxXeqdja2NVEmrAwoKKzvbVI521zJaDEQ4m1Y7RyPy1bUqd4Bacg2K891t5QbDL%2B%2F1A5k7w5Qi38G4WTdBYNpBpuPHYxML28Jch%2FVgN&X-Amz-Signature=2384dd7daa514a8faa7ec9b78ebf1da919869897e22dc323341ff374253048d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SXRQYOZ%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T075303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIASPqpNIG%2BRXvyfSqPb20bmYtCxuGLU0wALVfdvi1hlwAiBw9fseV4a8z891rzGX5I4iwoIgTRk40f4Jf5WuOeW8gyqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMmZSN6yZ4M%2BEQwi8KtwD%2B7yMHrmYqaugDTHfkJyPeaGp0GIqAoendxCVLpfPmPi%2Fw0KuSyWsLpm5Bwr1Z4561TaUUhwUVnq0YiCgkQs6OxKD1zX%2BFcl7pECqPuYy%2B62KIFtFk9M0bCBiuPAb0TvV8oq8Q1zT69OQu2jdJ8fudFn1ioQFBEQfWXvvdQVWKvyHoCjFcbQTVK0aI19rvBnePX6lFQvNNdLR01uj4AOS1eaGCoqyRK5Gb572eA4PNAdGtYe2LFPOtDaWGBJRwhl1E0Qtlcdm88Rzn9MenwAY14TUKBuMqBMtPwKULNkvXCyEjwlttm%2BM7w9k2u6Yqhtp0rmgAF44hHeg%2F7%2F%2BV%2FdUaVHimsLoPHZSuKVSQfrCXgY44IUdVvGqvmKjOmWSeO657geSBpTkX5Wp2WqUBl3qGJfbRKWqAI3RvCyAYVPSAhIUjUoTaVGLXoVeeHrASqKS%2BrgcvYLZ4K%2FldiBeaEFTLERovgNSIDkkFyiy8zshvVu7NprpoD%2FJkJEcDs8mvqz5xChpIJbu%2FFsHV%2B2UybOZXPLOPdgGNe09tRlkJyxul9QSeHELbB0b2jimMu%2BiEzG2VjFgBKiIKr0sWDT%2BKlSjV2rI1qjGYWIaugg5%2FiH%2BA8SQz9ckY8zLbSdVCPIw%2B%2BrGzwY6pgFasNfafsFmG4E57wfM1fb6Y12SNsdtt5LzZLbcjIwUyejDE%2B4%2Bar2Qi4eslgEpEPCj8BbiuyyC99Aici1JZmuWPSpbl2INylFAGzFs7rfu4iP5GTM4oOWNWqX8Ltn6P%2FmSzBETEy9aLrXFHdf0s4%2Fpz9sgtbo3FxDVb%2BAxwVgauhE8QR6C3CM54wghR8GWh1Em6L4KjL6tATdKiP9RwkF%2BJqG%2BVHTB&X-Amz-Signature=c6941f6cf61f2e173c9710d0cb8246a14c8c0c14d66a67a03769461b5b20c67d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

