---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIFTUKKW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCICNmalpTFxBY1x6S136Upc0BywKash2un%2FWLxcMNiOduAiAjvQxJsyeltYh1GtlYXqaR9Uxmn%2Ba%2FWeRSFXLclJMXQir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMQoeFXCXHHSU0XdVyKtwDhy%2FwvEbtXfhuTDqKkbL6otdoVoclfy5RjEowbLkW7YOEBJYbqFRkxXk%2BBUMOFavOhNRvfFx5qf5Ex%2FyiHMoSLugBLx1o361Zd989dz%2F8OvWq4Vrcb9JchxzfS5bEW1RdvHM5FFGD6ulaBWRJYlgVN1zQilEG3iQ%2FCJAT9Fs1DCBW1yEE4%2Bh%2FlIlGktT267PWi775W7paiwznMGwuc0UBN1xa2uPmQ5%2FPbVMrJ9OpJlTpRiqgrrLsoJoJqxUTELjeh%2FNoYW9AGZsXw6R51dcHv%2B5cYY3P4oX8crOOuC%2FRapOOuPiWSne%2BE4U2OImzX4XJgwzdS4SXIooMkPu1hiM6EnXjQk%2Boc3%2BU8nMNe%2FoeNC5txFyIarWXOTCi51viYdxzGrGXnK5LBurzU%2BHA0WZke8mHWiBpAP%2BGs9XcLpE0aZ67wldrB9hcZR%2BYQgR70sbrQ5QIjiR04yogQRHyszM2Ic0VJZzbIpkfCPIXM4y2NF59eqdV%2FHwXGq0wlujYXKqrXzbU9172gkIJS%2B%2B11UfR463oiqXgmlh3%2B0wJFoucwrmG%2BtIecMetN48xHnrkEQp%2Ff3kXXMEQQMhT5IAZjoA6lzLhZKNqgUV7EGGMjLCieYX4zFskWaKgFKyh4%2BUwnYPCyQY6pgEtVWEMOKYOZhSv6uFTeh0IMvNAU2ICV6ni9G4KZVb2g6VTby5okhf%2BTOdcD%2B%2FPFH6KUs5lpTExzzgI3MPmNYEMl4sXTZx2UP3vRYssCDtM8PRpVYgkclKrsJbJl0zftcCzf1edCJE%2BaAbjGZyJQ0VFVL8JqLQQEIYY8ffT%2BiD%2B9uYMOGoCUcSoWP2kktgvu5Ykm4wAIRmXPyt6PMti78Iyng%2Fh%2Bbg1&X-Amz-Signature=c99d3dc4bf669a319180a71d1b1342ff56c1798d7531d8430f116c4089cb6b22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIFTUKKW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCICNmalpTFxBY1x6S136Upc0BywKash2un%2FWLxcMNiOduAiAjvQxJsyeltYh1GtlYXqaR9Uxmn%2Ba%2FWeRSFXLclJMXQir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMQoeFXCXHHSU0XdVyKtwDhy%2FwvEbtXfhuTDqKkbL6otdoVoclfy5RjEowbLkW7YOEBJYbqFRkxXk%2BBUMOFavOhNRvfFx5qf5Ex%2FyiHMoSLugBLx1o361Zd989dz%2F8OvWq4Vrcb9JchxzfS5bEW1RdvHM5FFGD6ulaBWRJYlgVN1zQilEG3iQ%2FCJAT9Fs1DCBW1yEE4%2Bh%2FlIlGktT267PWi775W7paiwznMGwuc0UBN1xa2uPmQ5%2FPbVMrJ9OpJlTpRiqgrrLsoJoJqxUTELjeh%2FNoYW9AGZsXw6R51dcHv%2B5cYY3P4oX8crOOuC%2FRapOOuPiWSne%2BE4U2OImzX4XJgwzdS4SXIooMkPu1hiM6EnXjQk%2Boc3%2BU8nMNe%2FoeNC5txFyIarWXOTCi51viYdxzGrGXnK5LBurzU%2BHA0WZke8mHWiBpAP%2BGs9XcLpE0aZ67wldrB9hcZR%2BYQgR70sbrQ5QIjiR04yogQRHyszM2Ic0VJZzbIpkfCPIXM4y2NF59eqdV%2FHwXGq0wlujYXKqrXzbU9172gkIJS%2B%2B11UfR463oiqXgmlh3%2B0wJFoucwrmG%2BtIecMetN48xHnrkEQp%2Ff3kXXMEQQMhT5IAZjoA6lzLhZKNqgUV7EGGMjLCieYX4zFskWaKgFKyh4%2BUwnYPCyQY6pgEtVWEMOKYOZhSv6uFTeh0IMvNAU2ICV6ni9G4KZVb2g6VTby5okhf%2BTOdcD%2B%2FPFH6KUs5lpTExzzgI3MPmNYEMl4sXTZx2UP3vRYssCDtM8PRpVYgkclKrsJbJl0zftcCzf1edCJE%2BaAbjGZyJQ0VFVL8JqLQQEIYY8ffT%2BiD%2B9uYMOGoCUcSoWP2kktgvu5Ykm4wAIRmXPyt6PMti78Iyng%2Fh%2Bbg1&X-Amz-Signature=c99d3dc4bf669a319180a71d1b1342ff56c1798d7531d8430f116c4089cb6b22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7A6K6QP%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCxwf0em5hvLCtKOioxEwiVHipKfBVg3KCVgQ1TsV4cwgIhAMnsIBDObXbXj2hg5Q8M62Os14kcMMBeB1u%2FFtg1NiR1Kv8DCDQQABoMNjM3NDIzMTgzODA1IgxJ2vzEO9vNSRcrMyEq3AMKvp%2BJeU2sXLkGiYXq414vG3CMD%2F0Z%2BtfmvXvhsKtU0Jx6c8iHsCXthVGgCBFn%2F1naU8mJQe9SllMB8BqokMSPvfiz6%2Bb%2BLLrv8eA7NNbOKEap4xFG1MIU%2B46pvp%2Btj%2F3rnAgDT8wTGyll0%2Fg9HSN4epvJxJ2yrTnMc2lul1MFj%2BXvwvmHLFt2F6JTB6VTrxp3v%2BEtARNejHxG5fmsw96vfPI1uBYq1WbxcQwtU9Kne9dzKIzFOm6YAlHvEJsCWHwVc8SSrXI0HIUXb7nh9Wl%2FDOaAAz9D8TDEyipB9a6HfwxV0Sp1GhmHriauRTFF1PqkFkqtpcdW5nF%2FEXAUlSWxiQOyYQeo1WFN73mwAgTutJopLqeoTPBZQ7fsf%2B4I1aKCc%2FuIQpiyNtWmtDwI4tLktw%2F82iVymj77WqY7HJYMnXz%2FYDiraYJr3IKnmatoliYnp%2BBn%2BSZRTLz5juzmRvzSpZpMoJqerEO6Fx96k%2FmDmNQNVSfmiMxn%2Fh6bsBH209yPbBqb9jIRBmjFIGBcHMMhX5DzgXjHAyNFyBTN%2B2uBdYVk9O4OGRNtGKqUSAO0l8hP6pU2Teox2nGxYBR%2FvrkX%2BtxMHTNE5NQT61w%2BUSYQu4LCfzoc1b0XCsImfDDkgsLJBjqkAZK%2FooY3oQtk11MAnoB760pDaImOmw7i%2F20TwUI7uSUP8JPE2JfIc274j4wy5L3nZOCHFN1mUKtA4Gwg0ca2W2yIQC7fk86AOnAbqEbv3xY6UG%2BZkC0yOb7q11Cpj78VCvoTCzubBsnlp%2F0Dx%2BNjB%2FMbk%2BC75aUt%2BZcYVN9Wx%2B88VJ%2FUWclZRrd101%2Bwq97j00dzfS%2BnhqYyVcYnBK4Di6%2FSzxb9&X-Amz-Signature=cb262edda4544b07c814f7edc0383962ca72aa042eb188f4a82bb123acc54a31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7A6K6QP%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCxwf0em5hvLCtKOioxEwiVHipKfBVg3KCVgQ1TsV4cwgIhAMnsIBDObXbXj2hg5Q8M62Os14kcMMBeB1u%2FFtg1NiR1Kv8DCDQQABoMNjM3NDIzMTgzODA1IgxJ2vzEO9vNSRcrMyEq3AMKvp%2BJeU2sXLkGiYXq414vG3CMD%2F0Z%2BtfmvXvhsKtU0Jx6c8iHsCXthVGgCBFn%2F1naU8mJQe9SllMB8BqokMSPvfiz6%2Bb%2BLLrv8eA7NNbOKEap4xFG1MIU%2B46pvp%2Btj%2F3rnAgDT8wTGyll0%2Fg9HSN4epvJxJ2yrTnMc2lul1MFj%2BXvwvmHLFt2F6JTB6VTrxp3v%2BEtARNejHxG5fmsw96vfPI1uBYq1WbxcQwtU9Kne9dzKIzFOm6YAlHvEJsCWHwVc8SSrXI0HIUXb7nh9Wl%2FDOaAAz9D8TDEyipB9a6HfwxV0Sp1GhmHriauRTFF1PqkFkqtpcdW5nF%2FEXAUlSWxiQOyYQeo1WFN73mwAgTutJopLqeoTPBZQ7fsf%2B4I1aKCc%2FuIQpiyNtWmtDwI4tLktw%2F82iVymj77WqY7HJYMnXz%2FYDiraYJr3IKnmatoliYnp%2BBn%2BSZRTLz5juzmRvzSpZpMoJqerEO6Fx96k%2FmDmNQNVSfmiMxn%2Fh6bsBH209yPbBqb9jIRBmjFIGBcHMMhX5DzgXjHAyNFyBTN%2B2uBdYVk9O4OGRNtGKqUSAO0l8hP6pU2Teox2nGxYBR%2FvrkX%2BtxMHTNE5NQT61w%2BUSYQu4LCfzoc1b0XCsImfDDkgsLJBjqkAZK%2FooY3oQtk11MAnoB760pDaImOmw7i%2F20TwUI7uSUP8JPE2JfIc274j4wy5L3nZOCHFN1mUKtA4Gwg0ca2W2yIQC7fk86AOnAbqEbv3xY6UG%2BZkC0yOb7q11Cpj78VCvoTCzubBsnlp%2F0Dx%2BNjB%2FMbk%2BC75aUt%2BZcYVN9Wx%2B88VJ%2FUWclZRrd101%2Bwq97j00dzfS%2BnhqYyVcYnBK4Di6%2FSzxb9&X-Amz-Signature=cb262edda4544b07c814f7edc0383962ca72aa042eb188f4a82bb123acc54a31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGAFVYBB%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCICiNle26KwpqUYuzg6fdcQ4eA%2FNpQWuTV8BtLAvmNmg1AiEAsSFlHQ8IZI4%2BdEDjbciwk4bKvjtOd3DsIxQu3COwAjgq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDF6UxRyZ5NGq2HwZHCrcA98923tu4e56yDSEpCGbg5%2B8%2BGN4zGTIaM6BUiKdF8K9Kmzl8npnNW98vLYnuNnLjgF4cWUt2JNkKRiJ8psV15XlZ3EYbZASnaRIO69hLDQLQquYRXyrPyYQjgbYcyzXeltQNDb4WN8xbQPgdPwbj%2FVExz0%2FNAJzhjTgw9s0JsL2OeHDoy8iqUhRVkNShMb1TFz%2BBGJvh5swn42M1kxJ430xCRQ91h%2Bfbkt60JwNdLXVBOy%2FBfuE20ZfihcgEZAvf%2BR4CDbw%2Bxui%2BVievAn0SN2VsAr6V%2BSucvZvRz038fCZRZ3N10B0aYlojHMuNnLi1RbwwkFNr0YXeOSqmYoBz5%2BL8EK919fThfTc0FhDtFgcJdbYryfR5j6tzsiic5SY3SaGITWvzuMWfNEXUvVxqbLdQFW1B4EnjiDMfb96Z2oX81wwHIQjP2TywItS2hobyQYqq7rSSApCa8ywwB3X0NcCzSMbsZY24d%2FD%2BghGMwwCC1%2B5KaTpmJ6MuxGUHeUE%2B2fLYFJRjrCXbAFSi4XAUbNzw3JUJb8B%2F6gn3%2BgfBw8TGRXHCWxDi1vw8Jc5E9IHbubuTc0ptCUZupCd3lvIoPE8BT%2BItpgs4gK1mMUlRgj0u5%2Fw0ihzE9%2BEugsDMOeCwskGOqUB70IgKgfBOng2T1bJ1cHLnpw0xd%2B2D%2BcTo%2Bu8JDWwIm9cVwuqWuIwL%2FGW5uKrblQyRu%2BLW5V1fAXDXjbK6yi8XmFtXtazm4iwNxQIjukd6Kz3v8qoZe7L%2BFV4cXIBK81SD1QBMldXny6KvmGJ%2BPZj%2BKrw%2FeJJv5J9SERywdgEcdtqInofznnPR79oqZ%2BnzxKXoySHYqYASR2LYPUPY6f%2BFgJeTc6i&X-Amz-Signature=3dfb5a60d2bfd95d0825b3523eac44df06e70506115db38393e352aacc1ae2b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NH5FLSK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIH3%2FLgP%2BxSNPA7XNq9JETUfAX7aeLY9CYPu9M2AW%2Bz7QAiEAxTAW3n6kX2E3hHbezw9wUGXSh1drwAAScPFWl9LutyEq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDPEL9wnU6ehGb0YueircA8S5xN9%2FAQw4AOXKYwbpcMaBUNS%2BN1XJlD%2FTGDxxU89IBVX0NRe6B4IXn11675napt5OSAvfoXYUWfnCQyEf4kp390U7sO54Ielgtxz1%2F2PaZyPBOuAl2ack%2FlumO39538D3cmXzVdlWLT%2BIAP68PcasAG%2FQJv6J5bvWKqAM33hSduk1mQ2sXZikympx5yV1q4oh4QgQGFeQ0kyn2GZG0O7305IHRmiC755X9%2FdE8beuhNhmmoKGMKiS0cIDeaY%2FIqhmFzkEFSQGlQqw13uyjiDrT67q2rUhYZy8EiJSJHq4CfxYREX8wB2M%2Bi%2FjXDPe%2BkdBN1%2BhAPQZ3g9%2FKMHJ6UnLtv%2FEWyb54vXUXf9TZ0W773RfdmihKDl2p80U4FwSJviQCDIlysZBX7r5uvMfhl8IzQDu%2BGJNaynWXWeZ0rq0tePtbbNc%2FIgP5lXQKZUCqNwnuAzXW8fcgUcdBhslGMA6dyZla7WyOsGP2nE%2FGa2MH9eRG%2FyrqXWgYZhLkCTbWlc90QSb4f9262B6kNCKHH6dxMGOv1OlzImmHTnJw7Uo3wVLBTbbSZZAHlkUm0Nx1WYkVHJJqav2%2F5pAoKqlNgY1TgcWPeYLRanO2d13NMCipXDhTN3X2VXMZSLmMOSCwskGOqUBZwdISIEVOi6aSh8OtLbhKvE5DWH9dgja43HcBJSZ1NotzBKx5hIp7%2F8dqoOsN5F%2FK%2FKKIgzqLSlv2qwvQZBS5JNoChMnR3yGoahsMR%2FmDQiSmcRSnhUadrjj8b35Xj2fAorKQsTMXAlOBKtg9dzmtGRG0usz%2B12e4o7lL86dg7JFJonZ6U%2FgbBX808hI1M0LCXs7P4SQ3ESJZxKSuaS9U0BG1jr%2B&X-Amz-Signature=489f42ee3ef2f93bf64c11ba79df2ed4e714da77d538d0692fb64fa15ac7e0aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NH5FLSK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T190833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIH3%2FLgP%2BxSNPA7XNq9JETUfAX7aeLY9CYPu9M2AW%2Bz7QAiEAxTAW3n6kX2E3hHbezw9wUGXSh1drwAAScPFWl9LutyEq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDPEL9wnU6ehGb0YueircA8S5xN9%2FAQw4AOXKYwbpcMaBUNS%2BN1XJlD%2FTGDxxU89IBVX0NRe6B4IXn11675napt5OSAvfoXYUWfnCQyEf4kp390U7sO54Ielgtxz1%2F2PaZyPBOuAl2ack%2FlumO39538D3cmXzVdlWLT%2BIAP68PcasAG%2FQJv6J5bvWKqAM33hSduk1mQ2sXZikympx5yV1q4oh4QgQGFeQ0kyn2GZG0O7305IHRmiC755X9%2FdE8beuhNhmmoKGMKiS0cIDeaY%2FIqhmFzkEFSQGlQqw13uyjiDrT67q2rUhYZy8EiJSJHq4CfxYREX8wB2M%2Bi%2FjXDPe%2BkdBN1%2BhAPQZ3g9%2FKMHJ6UnLtv%2FEWyb54vXUXf9TZ0W773RfdmihKDl2p80U4FwSJviQCDIlysZBX7r5uvMfhl8IzQDu%2BGJNaynWXWeZ0rq0tePtbbNc%2FIgP5lXQKZUCqNwnuAzXW8fcgUcdBhslGMA6dyZla7WyOsGP2nE%2FGa2MH9eRG%2FyrqXWgYZhLkCTbWlc90QSb4f9262B6kNCKHH6dxMGOv1OlzImmHTnJw7Uo3wVLBTbbSZZAHlkUm0Nx1WYkVHJJqav2%2F5pAoKqlNgY1TgcWPeYLRanO2d13NMCipXDhTN3X2VXMZSLmMOSCwskGOqUBZwdISIEVOi6aSh8OtLbhKvE5DWH9dgja43HcBJSZ1NotzBKx5hIp7%2F8dqoOsN5F%2FK%2FKKIgzqLSlv2qwvQZBS5JNoChMnR3yGoahsMR%2FmDQiSmcRSnhUadrjj8b35Xj2fAorKQsTMXAlOBKtg9dzmtGRG0usz%2B12e4o7lL86dg7JFJonZ6U%2FgbBX808hI1M0LCXs7P4SQ3ESJZxKSuaS9U0BG1jr%2B&X-Amz-Signature=489f42ee3ef2f93bf64c11ba79df2ed4e714da77d538d0692fb64fa15ac7e0aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

