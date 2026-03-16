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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623FYUDKN%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIEfyHZ5JBGlCkSTa9KCwuGjh5lLGf%2FpzklBc27V%2B3zAoAiEA%2B3KGH%2BXY3jIt5a4WvVNR7SWp7OIIZKwUibNjbQUTfrAqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKDp35NouEtFAuydjSrcAwfj8Gtakuiha8fkgKrRUYX%2BTr9ivCmI%2F6J0nhW9ZJx2rjxvT2z67op4jyfFdQr99lZIWD1Nif98%2BMJtGbcakU%2B3lur0XhR3TklZZ9EEwS3pnsbl4%2F50KT9frtdHJ%2Fg5gj8EvHSLvZIrjLA7Lc9uWInJamWq8UWPjKTQnaSptLWHINv7LdR1bS6NXsh4LPjcnh8Oog7s%2BXvHQ%2FdRgaJdJYhNynW2JViQiKf0VcL3xrcifDAQTU4Eulg3YtJqHg3UuteFkVzqjDUzxRo2F3B7LwvWiWewfHzx%2BKrKKD0iHBCtiV%2B7NBbe4zGxpOLisXApw4W8HEQc7%2FfMxjB%2BfOMBY9NJKHgfsQbtSLmF%2BJ0E6xGbwZ38xVtp%2FgHefdlJdYPzkeC5MqwGE5K%2FeZQ55kdEYZC7vuq4ajjjiMTXwQatdwBhqpo0Mmt38RxfhkqN9KXsAShVVVrSP5OkPIUgBJDnhieiBFudwvrCT3HssLzKeM7EZI9ysLrqt52oy11oa%2B1121S6kjz%2Fn5LJ32nZrQ2yY7jQmo%2BtmepnU1taKzi%2FtkkCtsyt0Pi57956RpqFD5U%2FgWKQRrdS7hpR80n6WA%2Fea8KlejHiD5Sw4CEUd9qbZSu0j75yMPRpSR6LLhE3MP3v4M0GOqUBTgnd5Wi0m8gHlVIxz87MkmnVMuUqvftw3cbQwf1Nvx0w8NOzTtM4%2Bh8kcubfh4x5NfH5ySluXS6FsF7GFnsc9akpZ01CuEi64QRPSRSb%2FmO5kpmuaEELJ62Pon1vH3P0CJ%2FP7n3FvwQWjLi5YS%2F%2BANwDoPdjk%2Bx9G80lOdvsyHKd%2BCycEQJl1kFwbHDh7%2F9%2B6l3n5kkNrvFjbpls6lj8vFajPfc0&X-Amz-Signature=5ded457273fbe9ba22632f08ea60ac80b4e2a881535a71f1a831916c91e7850b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623FYUDKN%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIEfyHZ5JBGlCkSTa9KCwuGjh5lLGf%2FpzklBc27V%2B3zAoAiEA%2B3KGH%2BXY3jIt5a4WvVNR7SWp7OIIZKwUibNjbQUTfrAqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKDp35NouEtFAuydjSrcAwfj8Gtakuiha8fkgKrRUYX%2BTr9ivCmI%2F6J0nhW9ZJx2rjxvT2z67op4jyfFdQr99lZIWD1Nif98%2BMJtGbcakU%2B3lur0XhR3TklZZ9EEwS3pnsbl4%2F50KT9frtdHJ%2Fg5gj8EvHSLvZIrjLA7Lc9uWInJamWq8UWPjKTQnaSptLWHINv7LdR1bS6NXsh4LPjcnh8Oog7s%2BXvHQ%2FdRgaJdJYhNynW2JViQiKf0VcL3xrcifDAQTU4Eulg3YtJqHg3UuteFkVzqjDUzxRo2F3B7LwvWiWewfHzx%2BKrKKD0iHBCtiV%2B7NBbe4zGxpOLisXApw4W8HEQc7%2FfMxjB%2BfOMBY9NJKHgfsQbtSLmF%2BJ0E6xGbwZ38xVtp%2FgHefdlJdYPzkeC5MqwGE5K%2FeZQ55kdEYZC7vuq4ajjjiMTXwQatdwBhqpo0Mmt38RxfhkqN9KXsAShVVVrSP5OkPIUgBJDnhieiBFudwvrCT3HssLzKeM7EZI9ysLrqt52oy11oa%2B1121S6kjz%2Fn5LJ32nZrQ2yY7jQmo%2BtmepnU1taKzi%2FtkkCtsyt0Pi57956RpqFD5U%2FgWKQRrdS7hpR80n6WA%2Fea8KlejHiD5Sw4CEUd9qbZSu0j75yMPRpSR6LLhE3MP3v4M0GOqUBTgnd5Wi0m8gHlVIxz87MkmnVMuUqvftw3cbQwf1Nvx0w8NOzTtM4%2Bh8kcubfh4x5NfH5ySluXS6FsF7GFnsc9akpZ01CuEi64QRPSRSb%2FmO5kpmuaEELJ62Pon1vH3P0CJ%2FP7n3FvwQWjLi5YS%2F%2BANwDoPdjk%2Bx9G80lOdvsyHKd%2BCycEQJl1kFwbHDh7%2F9%2B6l3n5kkNrvFjbpls6lj8vFajPfc0&X-Amz-Signature=5ded457273fbe9ba22632f08ea60ac80b4e2a881535a71f1a831916c91e7850b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OHNF5WC%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCICzFdkYB%2Fz4WzWbJg7F6LHU6GTcM6Zyj8BUhwGACWQKOAiEAgCIUfsbgoU8NiJ%2BgvAhpfLycrUTWNV1Q%2F2umIWLynFEqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH1Uk08fK7eZexkUsircA0Q3vi8FugGiT08neA5DKOgls5AeridqBL6A%2BWP6jd5ZzkIyDCp1TSU40aYqSlQYOz%2BtwgPMuItXLpFEEY2WfqhpNhclf2lkGMHrGGhPQob7G7AAHFlMMn1MvHtxTwLc7pmIZES%2FvRAD1Se6QIAS5pcFbiEkFtxIIpvFNkUToGLsdxr2I9grTn0HXsXmEiG2OwQNf%2FlwKWcMeumiR98z0jEInTI3NSXsYweObQbSqNu4u1Y%2FihPmL0HFJaxihEXZdMYleVxuXSRGJaURzN952zee5roRS7nTzLKAL2Zbw72iMlYATU7Sjenmu%2Bh%2BXi6SbXg3M2oF%2BoGgnHiHhiJN3sHqIDtsz6sdIFRDCYapZBbe7b504YDhWnHqC%2FJlg5jCYTR3iOM4cKpaQ2ZYVcqL8zvRzU3NkQ690hlvRkXSON%2BDQfGBHfFhgK5LTpZayJwWDscsGIWCs%2B%2Fh%2Bf%2BME%2B710K9xkzqS1%2BTrQ2O%2B7MS2sTgGEgxfbT6HK%2BxhAK90UxuaXxXBRNR0ZWeS9X%2Bys%2FHsFKe6Jj%2BQFXEMZ5weTPeIEVrzJAxla4Z8j2vJ0H5rBQeKFYIebajGmKrTu8QrGA4B1HQxnfu4%2FM03yVe3kiqeli8MLF2aJGLYysUQ9qm%2BMN7x4M0GOqUB1WPnQspQuD7dPBNEtzKP%2F%2BexnNl7Yzhgi3VnHb3L8nQJgtdFzVHtkn6epp9DURzaTXx3bGWdGr7z30aQyNzWfn5rh%2F%2F4gSsfxIpSsirT3ZYBfFuelMdtlwQN9c%2FF38XeQo3AQtTiOEIOSNr%2FFVEwSoALkp%2Bp3w9PFCR9o%2BS2xAHqcZ%2FqrDneMDzvEGXm8A6Lv14UCwGjm%2BXUfTKIlNhbb7X28%2Fqu&X-Amz-Signature=b503dc21b6808193b2c34b95cb97328175fea6ce2cabd9d198e913c39b11c19e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5KJCHBX%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDL8EBHCSj%2FZtBt6fQBBgLU1NuOd3rOWgYwN5xrAXJ2MgIhANxMSLBpqg8cX%2F5IYADRfo4%2Fuh7Pj4TGH7csyUJ6%2FvIGKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwKhl0AGMECsFrCE7cq3AN1gImh94cDIvfeQl6WCDnriDmJWdBcjLcoeHtOmsMHzT2DBthjxgKZvuGzmDwKjU0lplCvrIptWrkZ6%2Ffbk2UdNuqbx8XpkjjQmnJbTE4g2LOwgDTMJZ7tdAh2aix1BUNZ40ZIVt52XXCGCsD%2F2LjPbt5Ocy7cOv8TgdMhsxWklvB55SotoGMHqvFARElhDveNQ%2Fczpe2PVZqUHv%2FGHKsxA%2B47URNtLxEkMZMtbz3CUj3v08JlCTPfY7vx%2BQSza2WnFsurnfl1q1ZtKvogOZxAEPiP4Ee7x%2Fje7gGTZGvTFUZ3thRXV71y3gkCQAfvkrHiA5uF7de9su%2B0k9zTKpSmtW1wLgNQ92BqHNmy%2FTLBpogFufZ0AnvlT8mUkPjBxgGoM5Zn5%2B2wrn0fpGHru9R0Rwn8tYapdR77Th2bxL5gStpXvVSsWWDzi49MSTRMvwSmeIqbZbbWobXXt%2Bx296z2qXIwX6JJnyigl3r%2FiHL%2FmIiKuoUlgR6VX%2BMAROL5%2BMPObZWMFM8DMmA%2F%2B9NCySv%2Fo2Fs74XlVt9Zglkanxf86jLIV4T9Zw60DDdeh9ywwGHEmy8XuVIQhrxzwmA7MhnYjTrmcvRWhFcqwE42tqvuzTT1h6DoJ%2Fn8BPVAwjDG8ODNBjqkAaHiIXTw%2B8keqGXsPkvd7D1cHN85EUrsjFlLzbpaLt3MhnSYaO%2FZxYScMD43Nw8zpR1sNRq%2BqxSDCR5UkQ0SyVz0Wu8SX3PyL5%2Fp5blah7nEW4QH2cfvlMccnyCmYhEAxryfQ0jMzPKWU%2FxY8nvF8AtT0LKrn9ngNMykqKHW96eGBvga6fN0E%2BtzxJq1Z1KGXwSfjotc0zXuGPO9Z8IQqOeuymoJ&X-Amz-Signature=5ee4e5fe96243768c6563ad52bd9cd137bc4f6332849bd22df6bb8b45242c4a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5KJCHBX%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDL8EBHCSj%2FZtBt6fQBBgLU1NuOd3rOWgYwN5xrAXJ2MgIhANxMSLBpqg8cX%2F5IYADRfo4%2Fuh7Pj4TGH7csyUJ6%2FvIGKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwKhl0AGMECsFrCE7cq3AN1gImh94cDIvfeQl6WCDnriDmJWdBcjLcoeHtOmsMHzT2DBthjxgKZvuGzmDwKjU0lplCvrIptWrkZ6%2Ffbk2UdNuqbx8XpkjjQmnJbTE4g2LOwgDTMJZ7tdAh2aix1BUNZ40ZIVt52XXCGCsD%2F2LjPbt5Ocy7cOv8TgdMhsxWklvB55SotoGMHqvFARElhDveNQ%2Fczpe2PVZqUHv%2FGHKsxA%2B47URNtLxEkMZMtbz3CUj3v08JlCTPfY7vx%2BQSza2WnFsurnfl1q1ZtKvogOZxAEPiP4Ee7x%2Fje7gGTZGvTFUZ3thRXV71y3gkCQAfvkrHiA5uF7de9su%2B0k9zTKpSmtW1wLgNQ92BqHNmy%2FTLBpogFufZ0AnvlT8mUkPjBxgGoM5Zn5%2B2wrn0fpGHru9R0Rwn8tYapdR77Th2bxL5gStpXvVSsWWDzi49MSTRMvwSmeIqbZbbWobXXt%2Bx296z2qXIwX6JJnyigl3r%2FiHL%2FmIiKuoUlgR6VX%2BMAROL5%2BMPObZWMFM8DMmA%2F%2B9NCySv%2Fo2Fs74XlVt9Zglkanxf86jLIV4T9Zw60DDdeh9ywwGHEmy8XuVIQhrxzwmA7MhnYjTrmcvRWhFcqwE42tqvuzTT1h6DoJ%2Fn8BPVAwjDG8ODNBjqkAaHiIXTw%2B8keqGXsPkvd7D1cHN85EUrsjFlLzbpaLt3MhnSYaO%2FZxYScMD43Nw8zpR1sNRq%2BqxSDCR5UkQ0SyVz0Wu8SX3PyL5%2Fp5blah7nEW4QH2cfvlMccnyCmYhEAxryfQ0jMzPKWU%2FxY8nvF8AtT0LKrn9ngNMykqKHW96eGBvga6fN0E%2BtzxJq1Z1KGXwSfjotc0zXuGPO9Z8IQqOeuymoJ&X-Amz-Signature=d817649690ad3303ad43535156b6b536f36dd3bffd1b331ed84033c1f392db48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMVZM4LV%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDKvgxHPJRQKKrb%2FuDcUP1XX9JqIGP0JMEP8DFcpi2ijQIgfsMkCynk0lfzzLq45iZJiqckRaURecFs4g7U5jbirIoqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMcrMr1wC71jjkLu6ircA6Yf9%2BMdFib8rbdUSmhjOnYDxnrEZkYflezTz%2FR9bVM7T3zv4GJKEI5C79wr3KqR11CNhvsfir%2BcF%2BVe0yQl2IjP%2F1vHZbQLwVlpoX77f5MxF7HhM4VC1VJTTdYdkymBSI9lecktq%2FjhEfBmkeCEUtEPjmX41xouPf3AApxLKN14wpiNDveH%2F7QK7gW%2BdmF2H7TJRamaieESdM869JJe7l49anRrruPJ8244i1Yxknn4ckMB%2BkiwhOg8KaIz7e2cuRTIQVfxJNpdPOqYxTdO%2BgaVF2p0t29fwdA6%2FwcI%2BGihdVAYZAchkZOQ9u2QPuza8Q3qYsFkB3xmp8LSF2pdpSIvNSsvati%2B%2FbIZSxjEktT3%2FcQ9r0ZdwL7roBWbb6ldt5p3GXGnFeuJs%2BwaH9HMfUFYA40jZbjTBMVJ%2BeZ36A4W82dIjs8bN4MWST6JEehtBchLkxhdlwvcCEaJve4RPVYRW%2FQubyUQUb79yhSZG74Dy22gj5gedHSUESkmcZM7PRzi0Pm1s9%2FRL9c2aqJA5hdAsiIaI63dG%2BJkkxSSO2drdisZr7FHo%2B4A6RiaS0jA1uWGCfghpKPKwLXv8MZI%2BGYr1JtAo8bNxeP8fIPVOMcIf4bLm5c%2BUcehsfzSMOjw4M0GOqUBnpIXujeObqWHWp6YApRBlC9n8Bu3xHMHUr8QZlpypNnqOA7z9BsnTXirqf3%2B2Kjvwe1E3IkQgCVp3m%2FhEd1ATfnw25%2FOdArSer%2BZgNzONjeL%2BF%2BldqICxjuTWqoKEinmBRd3IU2xoLcF4XdbvZ3GzIFlyLUgZO2bHw%2FT5E00sPd9oEk%2BAQy3NkeLof42mxUZVROVQR90yBGJSMf%2BBPQ1uSt%2B82K5&X-Amz-Signature=4cd4880d9be5d0f70df1d721becbd16754be24f6287331c2027e09dc36acdc45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBIUY7PI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCID0U7a21dFzeKb3JcvI8EkEkcVrUPFMPw5kfXJofqczfAiAKUa6SIfn6f%2F4%2F3erKfPMFvV39g0qBfz%2BZ50ijNlB4zyqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUD8JoESJC6UnQKlYKtwDhujRSy0A8TPfvdB5i9Zulte9UFXKBQF4E1%2BhMXI8POzv1%2BbDzApKTpBoFPcnro3kidL6%2ByJY1fxFtPORchFu2nedRS1V0wXZJrSSrIk1%2FXwH0Azj6rOl4uPQn522TcggSae26u4vwIh3s9g6GsVmb2MmmyAEkzAYbz%2FOQlkTwRmCbUZuj%2FsNdooyZwDWF56%2BGcIZB%2Fob98w9oxQIxvgUZRtXGvaqyj9w%2BggXJhMH98sdq8%2Fmh%2FhPivlVoaidHuqOvBURuIWFwvsdy4gxWRtffPA2M0wgGEtL0FDLRdG6sBU%2Fwg6BgCyCQ8bxMFZ5jy%2BaQZRq3kSzaXJC3hR4K1NQU3rRv%2F6aFtCZt5zQvY%2FGPZoWn0eT0VslaygESqjyve137f4WFtbIXjfVavVx52n9fJbrk27H92xsQy8cdDQZQ2RNZL5Tg3HFEODkpFPDXRKzyAEiy7LqVVkq8IfxII6LVuKXydxoCkfjKYEX6XbBdC9sMogj7dEhC5VPOeQeK35HunzhTXF0qH5kse8%2FJ8zNrv3XwGBcT4dpDsdAP0csNfThWI7ZUM1VlWrPRfzNGP7d9oB%2BeiHOX9qyFU4WHfwcV%2FGIngVwEt7y2ihJKN6cZZ3Q4xdHJokoKOAp%2Bckwm%2FLgzQY6pgEY3NwjwojRFLPTPaMXmvGtGxGgBpT0mmwvXPCasFnavzYzuLJ20l2FZRnDhslVRJPGqaltrwQlswFrHgMz1ImCdTLCc%2BGfkRriY27YvcmcG8o%2F79s1Ou073di9ijO7gxEtE72ACLSywsRuGmZwHU8xZGaohAOAprNc20AhO1V%2BKE9H%2FvVuXXRi3lcF0QAYD1Idbd%2BxPVsKfpdIhY35CCWcTO1qCtze&X-Amz-Signature=39697708a2a6b09596f1b8f3694c4dbdef6ec0ac1e344462e06981be43eceaef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUHCTME2%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQCDDOu25obbVPEVt77NeFr2wrVhJKflhrXu2rXCukz0FwIhAIWfx0ofT%2B5DHBTCn7NqrvRd5wb9Apw3dtJt%2BJcZLQ8RKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyF7RL5BtD9KL9hyJkq3AOjQCbOCF82qRHDrcyHP3HSmEMxNjrtNKSUK2bmqDTOXpYU8W%2FbIXifEXASUW081quVbN5EJxzRQjuPDVnel4kJRS58xqXwjcok1XrZjGMpLy8dI8dLonlgCuLzTtVUsBUFRU%2B383lmeMybmLXe1%2BZM%2Fx7Q9%2BYQRpAXMvyy%2BejOksYEKZLdIid2CprgB9f8iPTVUPOc6hXa0ezHj0fv5cpdMoUXX%2FDSATs%2BTb%2FqQW0hXBZrHsaj6D%2FeNybbQLFMaeBnPwMmPtZP2uvbCwzvLgWfiWYG94CtVp2FeEW6u45av0zhQdjMTbHEprrEO3vAxUVmKcJxTpWSYicueNvdrcArf12sHiv9e2hf6xC%2BoOX%2FZq%2FvXf%2BR%2F%2B9vJlkaIxuMHdNCXi3OamIc9CArgC3%2BQzCBwut8cuUKboFNl0eIX0AFTjZ39x1j9fI2%2BiY2cB6UEL8mj5bR3lo58CqD3ZCkaefMcoiEXPKHDVaKNTPNUGPNwpH%2BJfFpuWChEynhV%2B%2FkgzQ4HwGeLGtDbJ%2FbSeVPYyywH5Lhv34pHwYXi3Cy4S%2FHS8e6ra6xtI6w92ExGVSzXgTooz033aRCoMdyX%2BKR7OqoEiaqd7iCo71nFKNE0GKS7lA7qzl%2BQZFQwn517DCM8ODNBjqkAbIGSVXHPh33jJJIt50BnHuBxVXMKIvHr9vclrK7eJW5CmeT%2BuLahvWdmnzvrmcGZEbUEWQzqAXmDJqnzp2GDFmrAXqN51YejRzLjGXX5q1iuSq9ENJMBAs304g62TWY5BUvcVqn5BZu8F1cYcTwSZ%2FcP6VmWXjhry82XOlGjtMx4GSFqoP4AX0iv6yC6cABly23U3qpchgVed9Q0JclentOZ1eB&X-Amz-Signature=b35e752f7e7a3a6c1c991212c45aa73beeecd0b5b3d79df960441105d9404b75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664W7OSAGU%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIAZ2f8BgLqvVJqR2c5R8LcvP1hhqFZ%2FC2neeP4jukQ8OAiEA0Pj6pZ4%2FEXO%2B9%2FmfokvXhpsy4bUbc6a4rEsfIJ5F%2FNcqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCKisryP7niH710K7SrcA8TqhWyDpjRYZMf9ixokGY2L%2FKrNtRos0va1wpQ77Imm%2Bn%2FczLboVzr1DvZwXRLMaViQQhkFCDvhe5MHI9rP25ro6yq84t%2FriGlL44LcrEIDlsfYGYhpreAle3rByLjJxgcUVo4LelWR6d%2FLrNQGjan7V%2BJU5DZcENHcV5Bj9IpMeE8y0HGQr9J5EwQBKUQZxnDTkz7UREIfMeFxxaTkZ0b0LmVYVrjrzHYSBO%2FgDXTfUnRRYwoUBHT5fAlMOOIi10pvt8A4uP%2FlBew7HqG69ZfhXDk7JS%2B2eulwo9rxLi4dq2Dz2z11mYus0H7C0JNOGIAKT8dpJE5YwzOqxwCCS%2BMNXS%2FQd1zCKKIqMANi5flosOgkZB%2B%2BDkfTMboWBjdFSbdthObrzIUQajqQpa0St9S55T5BixrZn5oRvrPYRQQllMv%2BkE0MS962zQkE%2FoUSepdZLALqQIiulrWDvikqmgyzhIPNPiAPa31F3O2ZFAwdV91Lx9IHxk6rF4k0VnOA6ZNbmLnuMpRKYKFfwuAGZSv87y7rlTWSIt1huhI9uxZrTQxZ5NXrnyqIODaRrSTDjKNy4LcAzgO%2B9YRGz2sSj3g3jPstH%2BHE3dzEPgJ8nDOdQnE16vAYa6t7EY26MNXw4M0GOqUBI2UhJ3MGTb%2BEAg6z%2BI%2BOrx%2FXxRojKAxceBEN%2B7sGbB%2B1NoKT%2F4%2BiimbpDdsw5XvtZZjYM4xqGYNEQs8rbYyje32OC0AZqPZU%2FC0Vt6zAjj5a02uHUAmbW5PFtN66Ks5%2FZNU8xZ99N8aqzpfHFOc3vUee%2FRguIgUpIBHY%2FCz8NqNOUgvUumvjwrAlv8abelfskoXklcgP7BYOoAzTASNmasV9t%2BrE&X-Amz-Signature=dc762d24a9f32e44ab0e0161518cd7f607a14cea910a7b06001eee068f9ef0f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664W7OSAGU%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIAZ2f8BgLqvVJqR2c5R8LcvP1hhqFZ%2FC2neeP4jukQ8OAiEA0Pj6pZ4%2FEXO%2B9%2FmfokvXhpsy4bUbc6a4rEsfIJ5F%2FNcqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCKisryP7niH710K7SrcA8TqhWyDpjRYZMf9ixokGY2L%2FKrNtRos0va1wpQ77Imm%2Bn%2FczLboVzr1DvZwXRLMaViQQhkFCDvhe5MHI9rP25ro6yq84t%2FriGlL44LcrEIDlsfYGYhpreAle3rByLjJxgcUVo4LelWR6d%2FLrNQGjan7V%2BJU5DZcENHcV5Bj9IpMeE8y0HGQr9J5EwQBKUQZxnDTkz7UREIfMeFxxaTkZ0b0LmVYVrjrzHYSBO%2FgDXTfUnRRYwoUBHT5fAlMOOIi10pvt8A4uP%2FlBew7HqG69ZfhXDk7JS%2B2eulwo9rxLi4dq2Dz2z11mYus0H7C0JNOGIAKT8dpJE5YwzOqxwCCS%2BMNXS%2FQd1zCKKIqMANi5flosOgkZB%2B%2BDkfTMboWBjdFSbdthObrzIUQajqQpa0St9S55T5BixrZn5oRvrPYRQQllMv%2BkE0MS962zQkE%2FoUSepdZLALqQIiulrWDvikqmgyzhIPNPiAPa31F3O2ZFAwdV91Lx9IHxk6rF4k0VnOA6ZNbmLnuMpRKYKFfwuAGZSv87y7rlTWSIt1huhI9uxZrTQxZ5NXrnyqIODaRrSTDjKNy4LcAzgO%2B9YRGz2sSj3g3jPstH%2BHE3dzEPgJ8nDOdQnE16vAYa6t7EY26MNXw4M0GOqUBI2UhJ3MGTb%2BEAg6z%2BI%2BOrx%2FXxRojKAxceBEN%2B7sGbB%2B1NoKT%2F4%2BiimbpDdsw5XvtZZjYM4xqGYNEQs8rbYyje32OC0AZqPZU%2FC0Vt6zAjj5a02uHUAmbW5PFtN66Ks5%2FZNU8xZ99N8aqzpfHFOc3vUee%2FRguIgUpIBHY%2FCz8NqNOUgvUumvjwrAlv8abelfskoXklcgP7BYOoAzTASNmasV9t%2BrE&X-Amz-Signature=c2f247ebc714ad80d3dc5a1970e3892e4c4e6ae06681c3a804cc73ca55a6a25d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L5MFOYR%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIBO%2FA%2BJh1idB7jNeU%2BC3N%2BjCk23M3b18Zr7m9Y54qFXUAiA0jWYy7C0tVC2HLKiAPckH9MGYZYN5V3bxlelL93u58CqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4cYwKU%2BWniOpTd6xKtwDEnQ%2FMT4Zz%2BufdICp%2B0%2BVQRVcmxfhaeeP%2Bt237KdTDCuOKkWdid3sRxrokL7QHGVmlCYnNJ6Ro1ESuIIsYt%2BhGUgxMkVMuJRJ%2Fp0fzRv%2BJ5t%2FNgWX9kiR1pNeztWC4w1CRZuqwK%2Bet2AIpEyrwq5oOS4FhaX29V1aeS%2BkUggg4tRYs4tLNd8Ij6gdGHnIjUYvwEnljYBL0891sE1xQRvqNFLLCXEzcFnLjz%2FexfRtLTTVIKh4qOFiKB%2Frlx67xghOUlC6tEsFu%2B6ZpF8GrFOnAVU3scWYLMOoERJQEhVkq6mYix4qICb%2F7fnyyrEoHesVrwvu%2FkAWFMy%2BLmtqmKWhMbfJ2xUrAaE4aOxb9vIcL7Zsy88Go2xAkaz3k9iktFxTHS2hUyBmmpUTqZePBdejdGo6PIZRMOpwXVKkl8AKmfm64N1UGQUIaihQPIE9%2FNslhK0tvPv9A6SlJIM2vA0WBwkWvLY3npGVDoWpwJGmbDhbE024gIKcAUOn%2FW6Llhg2Te280gJLQ6%2BEJ1uIwKq3TwNl2p3rZ9yiJ2gpJn0UnvEXk63%2Fd%2FTePzpfdVXI5fMjxOjJr8A6d%2BmIsrGKOCjNxqi28UNLYcAFHNOzw6uyWFrHwq2KURt%2B4M39bmkw6e%2FgzQY6pgE9ySMZWRqOnZx%2FMYS%2F7GjZPL5HVqE3v0xBWy2QM0Sdzk2w457%2FbYaqJUDHcKIOM0vERRc7y%2BQHVRM1xPspne8imLzMkGz26tjMRobLld0NTTCnBy7qfv41Irk%2FBnyQ4jJAAResdnVV8o19lwXhjk4%2FWT8gOrBzw8ppJ6GyZwJcaubxtOzkLqeqJgz0%2FJhz5LInNKslU6vsduDmVdO%2B3xJsMUHJZzXN&X-Amz-Signature=060718c515e9ef34e829debcb42d4a7c6b60adaa1bfc40213502774a41cabf6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYAAMCCK%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICJ7ggmHLye%2FitjgbeIj9Cayc1b%2Fk87c7j%2BV13%2Fn0rjkAiB6W5oZR5nCBGs%2F5n%2FTBN8AZ55eKLWtXQfWHAZUeXYn6CqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM382lQMYCYoauKUonKtwDJFDFbwpPP7b4oYjM0eqFixsIUWhhKrwWcnkHDZEiRLSIWy%2BzOcneMHbKml59ykzu5mV5imy7lUC7rvCP0U4pJWmjVkA%2B0kUBVqnhbx7bIEgdqT1NBy40HkOhTetWaq2drouxliLnTba%2Bsxg5hcdA2tGeKQyQp%2B7tTGH%2BlpHotsfb7zwKscQIx79lA3fhAgOmFRC1JoDblXxNKw24WVC%2B8PDILb%2FsTXG%2FmC7L9ansDwbLlAbFEfN0bHAO5pTKNyAoKyCAF%2BPvJ5kMKYBBbmdK%2FSmEYzrOaP0z%2FhNnR4U8Pa4UL0R0wa4vbj1n6m3aqZFQIMFhtOme%2BEbDn5LskA5JHURixVSiNUtJsldLR5BW8qB%2Bk3SOJwZgIztZX69trTsXm03gHu1GeKDTz18nGXh4efKBa2QUgrVM62zPnEcFwte5jKpnv3sUUc724ird3w8qBeS%2BegrOyOzeHJVe5oRvCXC%2FL9aqpReSI%2FMlGLbt8Gy2Bzm2x%2FuYlkKGOQMHzoZBDyv%2Blzq9R2vdat1QPaKue4i8dESj1s%2FckQzNVh2LzACUbp55DMhezmnfbP17uZD3DkPjQHPYuQVMZWjAKS%2Bl12gY7P0hLxst3RyWxdhnrCjX2qjYCqnY9o%2F9%2FoYw5vDgzQY6pgHqxYp1qhUHKhagwmZcB%2Fi6RlmLtX4Wy%2F8kxmJaekQAIb%2BPq3H%2B%2Fi5qnA3z63%2FuKI8XAVXcQDhRc7yoj4%2BRL0BL5naiOLiMry9UXwP7uyd7SNOEOkceOeFoq0Vj3bqFGII5mChl9rqQmwOywI8lMJNvUYihPS0J1094xT43qNmrVgXIzuUb%2FTBx0sDUN7Q3Nu4ol85dFMnmYdvA6fQLMr4qn9vmuLe7&X-Amz-Signature=c7b4618804ce49375e2ddc8da8f63db0c828d3758e630855dce39afb6fc40ecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYAAMCCK%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICJ7ggmHLye%2FitjgbeIj9Cayc1b%2Fk87c7j%2BV13%2Fn0rjkAiB6W5oZR5nCBGs%2F5n%2FTBN8AZ55eKLWtXQfWHAZUeXYn6CqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM382lQMYCYoauKUonKtwDJFDFbwpPP7b4oYjM0eqFixsIUWhhKrwWcnkHDZEiRLSIWy%2BzOcneMHbKml59ykzu5mV5imy7lUC7rvCP0U4pJWmjVkA%2B0kUBVqnhbx7bIEgdqT1NBy40HkOhTetWaq2drouxliLnTba%2Bsxg5hcdA2tGeKQyQp%2B7tTGH%2BlpHotsfb7zwKscQIx79lA3fhAgOmFRC1JoDblXxNKw24WVC%2B8PDILb%2FsTXG%2FmC7L9ansDwbLlAbFEfN0bHAO5pTKNyAoKyCAF%2BPvJ5kMKYBBbmdK%2FSmEYzrOaP0z%2FhNnR4U8Pa4UL0R0wa4vbj1n6m3aqZFQIMFhtOme%2BEbDn5LskA5JHURixVSiNUtJsldLR5BW8qB%2Bk3SOJwZgIztZX69trTsXm03gHu1GeKDTz18nGXh4efKBa2QUgrVM62zPnEcFwte5jKpnv3sUUc724ird3w8qBeS%2BegrOyOzeHJVe5oRvCXC%2FL9aqpReSI%2FMlGLbt8Gy2Bzm2x%2FuYlkKGOQMHzoZBDyv%2Blzq9R2vdat1QPaKue4i8dESj1s%2FckQzNVh2LzACUbp55DMhezmnfbP17uZD3DkPjQHPYuQVMZWjAKS%2Bl12gY7P0hLxst3RyWxdhnrCjX2qjYCqnY9o%2F9%2FoYw5vDgzQY6pgHqxYp1qhUHKhagwmZcB%2Fi6RlmLtX4Wy%2F8kxmJaekQAIb%2BPq3H%2B%2Fi5qnA3z63%2FuKI8XAVXcQDhRc7yoj4%2BRL0BL5naiOLiMry9UXwP7uyd7SNOEOkceOeFoq0Vj3bqFGII5mChl9rqQmwOywI8lMJNvUYihPS0J1094xT43qNmrVgXIzuUb%2FTBx0sDUN7Q3Nu4ol85dFMnmYdvA6fQLMr4qn9vmuLe7&X-Amz-Signature=c7b4618804ce49375e2ddc8da8f63db0c828d3758e630855dce39afb6fc40ecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKYXQSFV%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T202415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQCn6OUWioSJMtWTlDFB7%2FkJ6vo8h9guQCTgDRkTdgimWAIgOnbr4T8oUldEnNiW1%2BFZG4etwe4NFUtKNp7y01tZQXIqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMFefgTLEbsZX57DOSrcA1eoY3YbLIA915ygAHe2PNdb7%2B%2BaYjWhZKax%2F35GU5ThW2w0JLlThstnICUuZkuFEG12nxxTWKn80RlitqQQ6p10cV4CPzaf2VJo74TNVMVGqjxKxYKj3p8IiRE4oGyerLvNDi7OCbdc5IBdqG3p5icYlxBjiLBVLjbrH43Qrmft65xkK1uWl%2F0pjnmJViBziozkfxAPlU4PFsvkk26HFfwzfxxEzNFxCjb3dUmtQfWKHF1NmFbyEmyIAOy5oJ1O6boesF6%2FCHaT2%2FG7UV032OzUFwwnD%2BQL1AivrszL06TMb3F9F6B2oY50NC03b73fYrXoCUP%2FCYxmney2jIAwo1LCiN6xH7c%2F5vDnNlOb2ZcBuuer1VJ%2BDHcS14oTt%2Bj1gFjwJsXIlgx1OK2zV7BXqnyxlklj1XjFxg1dyzTl284JbnYG1Y4X1YtuRRHely51WlQC6ElCfr96S%2FgNnqcvxsB9cYgs8Dz3Z%2BIFf3ZtsUUc8hYVY3Ua17xko374DtECLTTPd%2F3pKXndqnAGfSrDliYJEVDcFoSwj7Gue4vD7%2FL5Cz%2Fapb%2BZAG829AroQBD3SA1Rq8exC997nNmASecbJFY7P4sxysSmUdGvrA3ISDIRqfz9NrMiAbKfuH0ZMNHx4M0GOqUBJV4Db0X1XIt%2B50W55AnV72AqG5LEp6fpyKBuSeXc3HmXTyy5yogyqe5%2FcjepHE6WgdfvQ4TBdyf0W4AK455ZTH3P6UgrdPUZ5kWlh21SX7VC76KV1Whv0TaLMgTw96ZiElKccULMshlFGgjk78c3b6Oj%2B%2BGyMeFpkGLpNWiivo8i2JBncTpYLBwLrPBTAmIx5WFsauFlHuL4SViDtYXPCWOr8i5c&X-Amz-Signature=72e8ccc8211b32e38f745c768dd9d245d1980c1942a25eb0799c2b96c32b30f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

