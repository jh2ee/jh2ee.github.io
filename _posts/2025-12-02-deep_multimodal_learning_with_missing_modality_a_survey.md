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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OPFZ55T%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDZJ8s1IUzR1smE7%2FfrA%2FHhSSpBdjUQxCA%2FD%2BJcaHo14wIhAL2xeN4Z5kMQz0EjMdAvMKo3AZui2HnsRJT%2FK56l1eImKv8DCCkQABoMNjM3NDIzMTgzODA1Igx4BaaRAZaToZs56MQq3ANABk4a9BSScOX3rqRNbSeuq9IuR1V0eeZFogmfmWaoYcahGBym8ypRC8JFCkkLgNePWByfXCiYPXWyjZ4npl0GbJze%2Frx3vi2LkQJYSrYxwXnYDCy72E1Zwh9ujpSs%2FL3XOgXfWqB4hgRggYZO1G%2BGMht%2FG%2B9Q5PgFBU1WLDdp5l4koeNtn8w8UrOME77CEqZNuopC2BwHz0UQCOcceJGX7Smakg3zuxKpUe65FRHlHDCVCYZ%2BX%2FFfuHcWrEPdoYsYhTZpCz%2FZwS8NNXtSzmMuHug7fyxRVQwXLNVhUhqiFxq0PCecbNprdwgUy33Dvm5CyqlhbSPAqGhBMyXhbAn%2BSuyy53KTNInH22oiKQYqvPul0RLojUSW%2F%2FlxET6CBnX0VyLi9PuQiMdlqxxz5G2HdwWptn7gdr%2BwDpWt%2BlSiPImeRYHUxdP%2Fid7ZIN54Xm427TMnU%2B4aMABWAL%2FunMxjkkaUyJB17oznBa2oJSeLHxWN79tSofTkrJOZypXz5ei1IIvQ2%2FN4ZoY4MGGPn90FrVsR3tPmDGW9avsSlFOyd0XpnHRDnKmFbluf2uPH51Al3nrRdt%2FrW24GL%2F%2FNcEIxXJKCWDNM2WQuc5wP6Y2DBOpJRSP53x%2BrKyPktzD34b%2FJBjqkAfeUaxCTjuwouvsOXYI8Pr9UepuxIbC7sQm8uPm5rDR1LPcKGkhgHYDrHIXKdIG1%2FLmD%2F2IMqZ%2FdNHyv9j2ajDpsAo54TmL5pK07Q5Kxg2XzVrGASWIpkFahRR3MH8soTYc0q8ZFToFz9l4EFidwz%2Fxbhr%2BbhJ8q3uk2mBeg%2BHhTRqglBNkgjyYUmh%2F0L%2Fg64hzdkNlgnxVYoWK1pRZep3NZsYt9&X-Amz-Signature=617fc9696438a010f6830053d274a6516718106d1c2ead34cd553b0c517b5582&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OPFZ55T%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDZJ8s1IUzR1smE7%2FfrA%2FHhSSpBdjUQxCA%2FD%2BJcaHo14wIhAL2xeN4Z5kMQz0EjMdAvMKo3AZui2HnsRJT%2FK56l1eImKv8DCCkQABoMNjM3NDIzMTgzODA1Igx4BaaRAZaToZs56MQq3ANABk4a9BSScOX3rqRNbSeuq9IuR1V0eeZFogmfmWaoYcahGBym8ypRC8JFCkkLgNePWByfXCiYPXWyjZ4npl0GbJze%2Frx3vi2LkQJYSrYxwXnYDCy72E1Zwh9ujpSs%2FL3XOgXfWqB4hgRggYZO1G%2BGMht%2FG%2B9Q5PgFBU1WLDdp5l4koeNtn8w8UrOME77CEqZNuopC2BwHz0UQCOcceJGX7Smakg3zuxKpUe65FRHlHDCVCYZ%2BX%2FFfuHcWrEPdoYsYhTZpCz%2FZwS8NNXtSzmMuHug7fyxRVQwXLNVhUhqiFxq0PCecbNprdwgUy33Dvm5CyqlhbSPAqGhBMyXhbAn%2BSuyy53KTNInH22oiKQYqvPul0RLojUSW%2F%2FlxET6CBnX0VyLi9PuQiMdlqxxz5G2HdwWptn7gdr%2BwDpWt%2BlSiPImeRYHUxdP%2Fid7ZIN54Xm427TMnU%2B4aMABWAL%2FunMxjkkaUyJB17oznBa2oJSeLHxWN79tSofTkrJOZypXz5ei1IIvQ2%2FN4ZoY4MGGPn90FrVsR3tPmDGW9avsSlFOyd0XpnHRDnKmFbluf2uPH51Al3nrRdt%2FrW24GL%2F%2FNcEIxXJKCWDNM2WQuc5wP6Y2DBOpJRSP53x%2BrKyPktzD34b%2FJBjqkAfeUaxCTjuwouvsOXYI8Pr9UepuxIbC7sQm8uPm5rDR1LPcKGkhgHYDrHIXKdIG1%2FLmD%2F2IMqZ%2FdNHyv9j2ajDpsAo54TmL5pK07Q5Kxg2XzVrGASWIpkFahRR3MH8soTYc0q8ZFToFz9l4EFidwz%2Fxbhr%2BbhJ8q3uk2mBeg%2BHhTRqglBNkgjyYUmh%2F0L%2Fg64hzdkNlgnxVYoWK1pRZep3NZsYt9&X-Amz-Signature=617fc9696438a010f6830053d274a6516718106d1c2ead34cd553b0c517b5582&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBXUJZGH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGyJwJoKzjP%2FaChLtta0LTJAlOQD3seFwr3VcQjkWysrAiB4eOZePFeMcYmkqC%2FSFTjn4kcDBq3KpfNVLzxsigD7YSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM%2FLAWyoyox8vq7DunKtwD%2FpE%2By2nsBig93yTaIZ61Rn2bG2%2FXq%2FKaeM6EeCT%2BTB1lU3iQLuYL08dVTV%2FaECMqLfz0HO9exJycBfyq1nXVzskXbQg5Uya2jiUGvgpK6Ha6%2BJJ5YmK9Rzi6alRj%2F8WGDrLYkHrnDzY7%2FvEeQx2cS5DjAM9E8CiQEUqHTVoqv7spf958py9lXANkmBTwvcMhzgkm7JqaFRK1X0%2FOxVsv7xPDC31kR8ewtEqCh4CVfYHFFD7jfNrxuCo6Tevu9jkw2K9Sz%2F%2FxUhflcNr1sWtHBGFMK6s5W1nVBr%2FNf7OHotEnYj1p9I4LRWxfCXfavnQHuDKr6x9VsqLEgJk%2BCdH43VacwIi3ZKcyqhlqQUwBEVLaa%2B%2BOSN5lMaeIKJtxNkqDsjlfEj%2F8viMVvN6MeAqvj4m7e%2BL0A53vkrbha0lz%2F7kf1Jct6i3KSSFwUoLWCdCx6e4L1ygA1uA%2Fx0V8AMef8cADdSGORMPWWgtsbbfWn3Qcnvol6t4hS6M69js860zKdc%2FfjTTyaaRfaMNg%2FPQ%2FcY%2BgfCSIqMhloir1ZFOa7%2F6%2F3hQbzcdHmM876w7PQaEOm0a0bUUsAAOPK9F1wzx0lUZSA4FSubIxwuUQEcwJZzZNJSShxtyiTzXKUcEw1%2BK%2FyQY6pgEOJpvH1bCFmFCqOnzVQkpJtxTFbdTcoEH1yws1osevq0I2vlVMwxd1Ww0tr%2FFpByS88Q7%2FGyRnJCg3Lby5ckIcn2SDmwfzJYGF%2Bce3BWAicJlNBhplfiHwzuLleerMO2qPcw7YpfsOosYhE93YiO3J1hgxavnVOTyMwGrWmzKSEs9V%2FGeBbDEoQy8lq7IVojzLAL5MOc%2B014pUTK1H1IQS5AQ7yfm0&X-Amz-Signature=e2b79de000b226b7f14253b9adf77b7db3b6d0f231d64720f1abe55b66642b5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBXUJZGH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIGyJwJoKzjP%2FaChLtta0LTJAlOQD3seFwr3VcQjkWysrAiB4eOZePFeMcYmkqC%2FSFTjn4kcDBq3KpfNVLzxsigD7YSr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM%2FLAWyoyox8vq7DunKtwD%2FpE%2By2nsBig93yTaIZ61Rn2bG2%2FXq%2FKaeM6EeCT%2BTB1lU3iQLuYL08dVTV%2FaECMqLfz0HO9exJycBfyq1nXVzskXbQg5Uya2jiUGvgpK6Ha6%2BJJ5YmK9Rzi6alRj%2F8WGDrLYkHrnDzY7%2FvEeQx2cS5DjAM9E8CiQEUqHTVoqv7spf958py9lXANkmBTwvcMhzgkm7JqaFRK1X0%2FOxVsv7xPDC31kR8ewtEqCh4CVfYHFFD7jfNrxuCo6Tevu9jkw2K9Sz%2F%2FxUhflcNr1sWtHBGFMK6s5W1nVBr%2FNf7OHotEnYj1p9I4LRWxfCXfavnQHuDKr6x9VsqLEgJk%2BCdH43VacwIi3ZKcyqhlqQUwBEVLaa%2B%2BOSN5lMaeIKJtxNkqDsjlfEj%2F8viMVvN6MeAqvj4m7e%2BL0A53vkrbha0lz%2F7kf1Jct6i3KSSFwUoLWCdCx6e4L1ygA1uA%2Fx0V8AMef8cADdSGORMPWWgtsbbfWn3Qcnvol6t4hS6M69js860zKdc%2FfjTTyaaRfaMNg%2FPQ%2FcY%2BgfCSIqMhloir1ZFOa7%2F6%2F3hQbzcdHmM876w7PQaEOm0a0bUUsAAOPK9F1wzx0lUZSA4FSubIxwuUQEcwJZzZNJSShxtyiTzXKUcEw1%2BK%2FyQY6pgEOJpvH1bCFmFCqOnzVQkpJtxTFbdTcoEH1yws1osevq0I2vlVMwxd1Ww0tr%2FFpByS88Q7%2FGyRnJCg3Lby5ckIcn2SDmwfzJYGF%2Bce3BWAicJlNBhplfiHwzuLleerMO2qPcw7YpfsOosYhE93YiO3J1hgxavnVOTyMwGrWmzKSEs9V%2FGeBbDEoQy8lq7IVojzLAL5MOc%2B014pUTK1H1IQS5AQ7yfm0&X-Amz-Signature=e2b79de000b226b7f14253b9adf77b7db3b6d0f231d64720f1abe55b66642b5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666R7PYSS%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIFYhrSq6IqwTdgzTDVgcYjiSkTRScRj8KVXwqmYEJt0HAiBXjxpK8EiuWB8tvqkHRR2caG2cb93Hl2ZU3QRVGvWAaCr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIM1RO1plGUSjD5D9VzKtwDI%2BNuojjGGsUkiUSRiayPg5GmcAnGPWGrwL196Kz39jjjEYIKfw9HJ4DTsC8ei6uguhTPuxsTJ6NYql03P6NxdpXPi990QswKocjTHmvw6QXwCwZeyChH39fisHg8bdM3gYZhYtzQ1Muu%2B9msDzIJlIMsSBk%2FHqku4DI0akVcxBkZDJueVKsTxB1tRaYvnAdpphmlVvf6A3IkoeWINWrkQIPIKNdZrrmp8nAdtBGqBV%2Fm5px%2BRTaU2FWx8Vk%2BryYIm7z2fpInOa9YfAaeT4lVha9V%2Bd2FOPxZf%2B1pBNQ7j1xcn4i3QgugPiMjG6jbxbulj5Jz95XoRJXjBS%2Bd8iE27zEbtTJjZcTlEdL9Bt0MLpST6i51l9bh%2FjsGiwTRaNZI0Y7jBUPNFMZ9dv7HjCP4xaCgNrQ1PIAOKMF%2BxQg9UVwvF22UzQC6JmJ5FTydnjfkkq8W5phbIQzmTskleXcu9sK%2Bd24scm8KLfasqHzEqWjSZnd%2FSOhYN35QvxgufYg17kQF68IDaPTu4KPuX9zsxZI3VHrfTZTzdIMpCnn6JeuYUQ%2FWgumDmB293vbvxfZoyvEkQy64aAxIbMXp4mk0lajl9OuMTQKR0m0afR%2FCUADQIKC7NR1VbSSF%2FpcwxeC%2FyQY6pgGyhwBnbkXgptjb9WBsHBnYy7IlTRBC1u2IU6UXex2lpypnEtCU9Voppr8Gc5TpYfIYGBBW1wMOxi7CIgBSJE06ENeDaVub3wdGuYG4PXMZlwu9LHxnaA9tMzaKOEhd%2FIGaPCx7cZ5TDOBw8ljSXNF0iTBCVruh28%2FkgGuGC0hkzgveNU5fKvTiOwnuwlj4lKA6IfnvbO0a1mf5VM8%2BuL%2BfTBOcj1v8&X-Amz-Signature=1120c7ecc8a2c5e28fdb9255b845e005d307ccb4bdee1f67ff4dbf22846130cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH22CR2N%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQCvqa3BwWQwrY08aXK%2FkRfLvGrTZb3bwCxThgh97CI5kgIhAJMSAmMY2fx8xDWW63SkC3PnZxf1lYoUkD41%2BFlmht9yKv8DCCkQABoMNjM3NDIzMTgzODA1IgydaFNsVLt2fxFMNAYq3ANSqr0KMOe7CmQSN9gE%2BBGy%2FIrZ0as2fEb%2BiV5HgoQcBjxtDo68S8RHGO1kysUE%2FhLDL7a4dHvyyhN727XiczzZE6YB49GmhNuJvAvPeTSPDZchNJWEE7s6RgDLzqB8KKx7S4raA%2F4T87w8nCMMADtJoo3xp6iqFq81Njz%2FlYhkHOKTg9xlIY7D%2BU9ZPYEoVJ5WNtUpgknaHkyPy7L2qrST2lXtX9ScdCXR%2BVxJ1hUEmuNfnoIVXQYTc0fUJlET9JmjHYE1tLcAbH3LteqD2jOfpl60shgf7bWgVIdsfxh3AB6S8QJKNY8v7SLm5voBfqG%2FdpYiBL8PHRHIn8pDFks%2F2YPdd%2Ft%2FdSz3X3IsFq86wFXBba0UiIKUv0jjeba7LioLn0W0YrgmNVEtLouUUTkrzLw7E8QMNwg21jYIXiiSGCBa1ypxULPwhaq73M4pjyQmX%2Bh2tUR62QFyBRTXeUSnfTYYrNtYn1XR6MaEYAiIWaYvdtCaaYp68uNOE05bfb8lYmvuYET%2Fzce9Hi5QW78L1MkOAY%2FuQPZ%2FIHBflVt6kuWoA%2FkwSHWck9paypOx3j71rEBT97zGuQ%2BnTmUsMxU0U2FBcoHEMoCVDVRebmamfR22c9IGXkh%2BRmDWmzCm4L%2FJBjqkAcrn7aCGgyDYEijZS%2FD%2BLvZvncbbWZRhUjmuEJK4ALiXI0iCUDHLQN2eQAKIsvIYvyF2SbZQR38GfKYTWcIJyiV1B3Lz%2FO2yGMPXv22nvIjnB5cUzcNFTLvvsh0Q%2FykYQNC7IGdUR9zHiQRIymBjjQY3IYIqJSscfzvzJVAFnVIJ8muF9e5K5d%2FPcXvtZOSMYKVEcFQ%2B3RO%2FUJjta0iS4tqOf1h%2B&X-Amz-Signature=bcdbcc2ef0a49709d068cefcfc0961def9c7cd467a755bc33a8b5d7c2d164493&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH22CR2N%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T091347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQCvqa3BwWQwrY08aXK%2FkRfLvGrTZb3bwCxThgh97CI5kgIhAJMSAmMY2fx8xDWW63SkC3PnZxf1lYoUkD41%2BFlmht9yKv8DCCkQABoMNjM3NDIzMTgzODA1IgydaFNsVLt2fxFMNAYq3ANSqr0KMOe7CmQSN9gE%2BBGy%2FIrZ0as2fEb%2BiV5HgoQcBjxtDo68S8RHGO1kysUE%2FhLDL7a4dHvyyhN727XiczzZE6YB49GmhNuJvAvPeTSPDZchNJWEE7s6RgDLzqB8KKx7S4raA%2F4T87w8nCMMADtJoo3xp6iqFq81Njz%2FlYhkHOKTg9xlIY7D%2BU9ZPYEoVJ5WNtUpgknaHkyPy7L2qrST2lXtX9ScdCXR%2BVxJ1hUEmuNfnoIVXQYTc0fUJlET9JmjHYE1tLcAbH3LteqD2jOfpl60shgf7bWgVIdsfxh3AB6S8QJKNY8v7SLm5voBfqG%2FdpYiBL8PHRHIn8pDFks%2F2YPdd%2Ft%2FdSz3X3IsFq86wFXBba0UiIKUv0jjeba7LioLn0W0YrgmNVEtLouUUTkrzLw7E8QMNwg21jYIXiiSGCBa1ypxULPwhaq73M4pjyQmX%2Bh2tUR62QFyBRTXeUSnfTYYrNtYn1XR6MaEYAiIWaYvdtCaaYp68uNOE05bfb8lYmvuYET%2Fzce9Hi5QW78L1MkOAY%2FuQPZ%2FIHBflVt6kuWoA%2FkwSHWck9paypOx3j71rEBT97zGuQ%2BnTmUsMxU0U2FBcoHEMoCVDVRebmamfR22c9IGXkh%2BRmDWmzCm4L%2FJBjqkAcrn7aCGgyDYEijZS%2FD%2BLvZvncbbWZRhUjmuEJK4ALiXI0iCUDHLQN2eQAKIsvIYvyF2SbZQR38GfKYTWcIJyiV1B3Lz%2FO2yGMPXv22nvIjnB5cUzcNFTLvvsh0Q%2FykYQNC7IGdUR9zHiQRIymBjjQY3IYIqJSscfzvzJVAFnVIJ8muF9e5K5d%2FPcXvtZOSMYKVEcFQ%2B3RO%2FUJjta0iS4tqOf1h%2B&X-Amz-Signature=bcdbcc2ef0a49709d068cefcfc0961def9c7cd467a755bc33a8b5d7c2d164493&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

